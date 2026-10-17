#!/usr/bin/env python3
"""
generate-carte-grand-besancon.py, fond de carte des communes du site (mise à jour n°1, 18/10/2026).

Le bloc « communes » de l'accueil est une CARTE DESSINÉE (règle #R60 du portefeuille), jamais une
grille de photos : Besançon et les 12 communes du site, chacune cliquable vers sa page. Un contour
tracé à vue serait faux ; il vient donc du registre officiel, commune par commune, et ce script
le refait à l'identique si la liste change.

SOURCE
    https://geo.api.gouv.fr/communes/<code INSEE>?fields=nom,code,centre,contour&format=json&geometry=contour
    Un appel par commune, 13 appels. `contour` = limite administrative (IGN), `centre` = point du libellé.

PROJECTION  équirectangulaire, abscisse multipliée par cos(latitude moyenne) (47,25° nord).
SIMPLIFICATION  Douglas-Peucker itératif après projection, coordonnées entières, îlots écartés.
GARDE-FOUS (bloquants)  libellé du registre = libellé affiché ; slugs = fiches content/zones/ ;
    fichier < 40 Ko.

Usage : python3 scripts/generate-carte-grand-besancon.py
Écrit components/ui/graphiques/grand-besancon-geo.ts
"""

from __future__ import annotations

import json
import math
import urllib.request
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / "components" / "ui" / "graphiques" / "grand-besancon-geo.ts"
FICHES = RACINE / "content" / "zones"

REGISTRE = "https://geo.api.gouv.fr/communes/{code}?fields=nom,code,centre,contour&format=json&geometry=contour"

# (code INSEE, libellé officiel, slug de content/zones/). Codes relevés le 18/10/2026 sur le registre.
COMMUNES: list[tuple[str, str, str]] = [
    ("25036", "Avanne-Aveney", "avanne-aveney"),
    ("25056", "Besançon", "besancon"),
    ("25133", "Châtillon-le-Duc", "chatillon-le-duc"),
    ("25212", "École-Valentin", "ecole-valentin"),
    ("25258", "Franois", "franois"),
    ("25364", "Mamirolle", "mamirolle"),
    ("25368", "Marchaux-Chaudefontaine", "marchaux-chaudefontaine"),
    ("25381", "Miserey-Salines", "miserey-salines"),
    ("25454", "Pirey", "pirey"),
    ("25495", "Roche-lez-Beaupré", "roche-lez-beaupre"),
    ("25527", "Saint-Vit", "saint-vit"),
    ("25542", "Serre-les-Sapins", "serre-les-sapins"),
    ("25560", "Thise", "thise"),
]

HAUTEUR = 800.0
MARGE = 12.0
TOLERANCE = 1.15
AIRE_MINI = 0.00003
POIDS_MAXI = 40_000


def registre(code: str) -> dict:
    with urllib.request.urlopen(REGISTRE.format(code=code), timeout=45) as reponse:
        return json.load(reponse)


def anneaux(geometrie: dict) -> list[list[tuple[float, float]]]:
    if geometrie["type"] == "Polygon":
        return [[(p[0], p[1]) for p in geometrie["coordinates"][0]]]
    return [[(p[0], p[1]) for p in bloc[0]] for bloc in geometrie["coordinates"]]


def aire(anneau: list[tuple[float, float]]) -> float:
    total = 0.0
    for i in range(len(anneau)):
        x1, y1 = anneau[i]
        x2, y2 = anneau[(i + 1) % len(anneau)]
        total += x1 * y2 - x2 * y1
    return abs(total) / 2


def douglas_peucker(points: list[tuple[float, float]], seuil: float) -> list[tuple[float, float]]:
    if len(points) > 2 and points[0] == points[-1]:
        points = points[:-1]
    if len(points) < 3:
        return points
    garder = [False] * len(points)
    garder[0] = garder[-1] = True
    pile = [(0, len(points) - 1)]
    while pile:
        a, b = pile.pop()
        if b <= a + 1:
            continue
        ax, ay = points[a]
        bx, by = points[b]
        dx, dy = bx - ax, by - ay
        norme = math.hypot(dx, dy) or 1e-12
        pire, indice = -1.0, a
        for i in range(a + 1, b):
            px, py = points[i]
            ecart = abs(dy * px - dx * py + bx * ay - by * ax) / norme
            if ecart > pire:
                pire, indice = ecart, i
        if pire > seuil:
            garder[indice] = True
            pile += [(a, indice), (indice, b)]
    return [p for p, k in zip(points, garder) if k]


def nombre(valeur: float) -> str:
    return str(int(round(valeur)))


def sans_doublons(points: list[tuple[int, int]]) -> list[tuple[int, int]]:
    net: list[tuple[int, int]] = []
    for point in points:
        if not net or point != net[-1]:
            net.append(point)
    if len(net) > 1 and net[0] == net[-1]:
        net.pop()
    return net


def main() -> None:
    codes = [c for c, _, _ in COMMUNES]
    if len(set(codes)) != len(COMMUNES):
        raise SystemExit("ABANDON : codes INSEE en double.")
    fiches = {f.stem for f in FICHES.glob("*.json")}
    prevus = {slug for _, _, slug in COMMUNES}
    if fiches != prevus:
        raise SystemExit(
            "ABANDON : la table ne correspond pas aux fiches de content/zones/.\n"
            f"  dans la table, absent des fiches : {sorted(prevus - fiches)}\n"
            f"  dans les fiches, absent de la table : {sorted(fiches - prevus)}"
        )
    print(f"  {len(prevus)} slugs = {len(fiches)} fiches de content/zones/")

    releve = []
    for code, nom, slug in COMMUNES:
        donnee = registre(code)
        if donnee["nom"] != nom:
            raise SystemExit(f"ABANDON : le registre appelle {code} « {donnee['nom']} », pas « {nom} ».")
        releve.append((code, nom, slug, donnee["contour"], donnee["centre"]["coordinates"]))
        print(f"  {code}  {nom}")

    tous = [p for _, _, _, contour, _ in releve for anneau in anneaux(contour) for p in anneau]
    latitudes = [p[1] for p in tous]
    facteur = math.cos(math.radians((min(latitudes) + max(latitudes)) / 2))

    def projeter(lon: float, lat: float) -> tuple[float, float]:
        return (lon * facteur, -lat)

    projetes = [projeter(*p) for p in tous]
    xmin, xmax = min(p[0] for p in projetes), max(p[0] for p in projetes)
    ymin, ymax = min(p[1] for p in projetes), max(p[1] for p in projetes)
    echelle = (HAUTEUR - 2 * MARGE) / (ymax - ymin)
    largeur = (xmax - xmin) * echelle + 2 * MARGE

    def poser(lon: float, lat: float) -> tuple[float, float]:
        x, y = projeter(lon, lat)
        return ((x - xmin) * echelle + MARGE, (y - ymin) * echelle + MARGE)

    sorties, total_points = [], 0
    for code, nom, slug, contour, centre in releve:
        morceaux, retenus, ecartes = [], 0, 0
        for anneau in anneaux(contour):
            en_plan = [projeter(*p) for p in anneau]
            if aire(en_plan) < AIRE_MINI:
                ecartes += 1
                continue
            dans_le_cadre = [poser(*p) for p in anneau]
            simplifie = douglas_peucker(dans_le_cadre, TOLERANCE)
            points = sans_doublons([(int(round(x)), int(round(y))) for x, y in simplifie])
            if len(points) < 3:
                ecartes += 1
                continue
            morceaux.append("M" + "L".join(f"{x} {y}" for x, y in points) + "Z")
            retenus += len(points)
        if not morceaux:
            raise SystemExit(f"ABANDON : plus aucun anneau retenu pour {nom} ({code}).")
        total_points += retenus
        cx, cy = poser(centre[0], centre[1])
        sorties.append((slug, code, nom, "".join(morceaux), cx, cy))
        print(f"  {nom:<24} {retenus:>4} points" + (f", {ecartes} îlot(s) écarté(s)" if ecartes else ""))

    lignes = "\n".join(
        f"  {{ slug: '{slug}', insee: '{code}', nom: '{nom}', cx: {nombre(cx)}, cy: {nombre(cy)}, d: '{trace}' }},"
        for slug, code, nom, trace, cx, cy in sorties
    )

    contenu = f"""/**
 * Fond de carte du site : Besançon et les 12 communes de content/zones/, chacune séparément,
 * plus son centre pour poser le libellé.
 *
 * FICHIER GÉNÉRÉ par scripts/generate-carte-grand-besancon.py, ne pas éditer à la main.
 * Contours et centres relevés le 18/10/2026 sur geo.api.gouv.fr (référentiel IGN).
 * Projection équirectangulaire corrigée par cos(latitude moyenne), Douglas-Peucker
 * (tolérance {TOLERANCE}), coordonnées entières.
 */

export const CARTE_VIEWBOX = '0 0 {nombre(largeur)} {nombre(HAUTEUR)}'
export const CARTE_LARGEUR = {nombre(largeur)}
export const CARTE_HAUTEUR = {nombre(HAUTEUR)}

export interface CommuneTracee {{
  slug: string
  insee: string
  nom: string
  cx: number
  cy: number
  d: string
}}

export const COMMUNES_TRACEES: readonly CommuneTracee[] = [
{lignes}
]
"""
    SORTIE.write_text(contenu, encoding="utf-8")
    poids = SORTIE.stat().st_size
    print(f"\n  cadre {nombre(largeur)} x {nombre(HAUTEUR)}, {total_points} points")
    print(f"  écrit {SORTIE.relative_to(RACINE)} ({poids} octets)")
    if poids > POIDS_MAXI:
        raise SystemExit(f"ABANDON : {poids} octets > {POIDS_MAXI}.")


if __name__ == "__main__":
    main()
