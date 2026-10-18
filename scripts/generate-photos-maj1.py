#!/usr/bin/env python3
"""
generate-photos-maj1.py : les 13 photos de la mise à jour n°1 (GO Rémy « ok go », 18/10/2026).

  python3 scripts/generate-photos-maj1.py bloc1            # 1 photo, fal-ai/nano-banana-pro 2K (0,15 $)
  python3 scripts/generate-photos-maj1.py zones [slug,...]  # 12 couvertures, Seedream 4 (~0,03 $ pièce)

Clé FAL_KEY lue dans l'environnement, sinon dans ../.ops.env. Le brut va dans le scratchpad
(variable PHOTOS_BRUT), le journal dans docs/data/photos-18-10/journal.tsv.
Les couvertures de commune sortent en public/zones/<slug>.jpg, 1600 x 1000, <= 400 Ko.
Règle (kickoff ligne 50) : la PRESTATION finie, propre, 2020+, jamais une maison vue de dehors,
un paysage ni un chantier en cours. Prompts en anglais, formulés en positif, scènes sans personne.
"""
from __future__ import annotations
import io, json, os, sys, time, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BRUT = Path(os.environ.get("PHOTOS_BRUT", ROOT / "docs/data/photos-18-10/brut"))
JOURNAL = ROOT / "docs/data/photos-18-10/journal.tsv"

def cle() -> str:
    v = os.environ.get("FAL_KEY")
    if v:
        return v
    for l in (ROOT.parent / ".ops.env").read_text().splitlines():
        if l.startswith("FAL_KEY="):
            return l.split("=", 1)[1].strip()
    raise SystemExit("FAL_KEY absente")

def fal(modele: str, corps: dict) -> bytes:
    req = urllib.request.Request("https://fal.run/" + modele, data=json.dumps(corps).encode(), method="POST",
                                 headers={"Authorization": f"Key {cle()}", "Content-Type": "application/json"})
    rep = json.load(urllib.request.urlopen(req, timeout=600))
    url = rep["images"][0]["url"]
    with urllib.request.urlopen(url, timeout=300) as f:
        return f.read()

def journal(ligne: str) -> None:
    JOURNAL.parent.mkdir(parents=True, exist_ok=True)
    with JOURNAL.open("a") as f:
        f.write(time.strftime("%Y-%m-%d %H:%M") + "\t" + ligne + "\n")

STYLE = ("Contemporary interior photography, high definition, soft natural daylight, sharp focus, magazine finish. "
         "Credible renovated home in the Doubs, Franche-Comté, France: pale limestone, oak, light render, everything recent, "
         "clean and perfectly finished, pipes straight and aligned, plain blank surfaces, smooth single-colour paintwork. "
         "Still-life scene of the finished installation, empty of people. Muted warm palette with deep green and copper accents.")

BLOC1 = ("Interior photograph of a bright contemporary kitchen in a renovated stone house in Besançon, France. "
         "A tall slim white wall-hung gas condensing boiler, about twice as tall as it is wide, with a small dark display "
         "panel, is mounted on the wall slightly right of the centre of the frame between the upper cabinets, two neat copper "
         "pipes running straight down from it to the worktop. The left third of the frame shows a window with daylight, "
         "pale oak upper cabinets with visible wood grain and a light stone tile splashback, rich in texture. The right third "
         "shows more oak cabinets and a plain pale wall. Eye-level camera, straight-on view, wide shot, everything new, clean "
         "and finished, plain surfaces. " + STYLE)

ZONES = {
    "avanne-aveney": ("A new white wall-hung gas condensing boiler installed in a tidy utility room of a stone village house, exposed "
                      "pale limestone wall, copper pipes aligned, a small window with river light.",
                      "Chaudière gaz murale blanche neuve posée dans la buanderie d’une maison en pierre, tuyaux cuivre alignés"),
    "chatillon-le-duc": ("The outdoor unit of an air-to-water heat pump installed on a concrete plinth against the light rendered wall "
                         "of a recent house, trimmed hedge, wooded hillside behind, late afternoon light.",
                         "Unité extérieure de pompe à chaleur installée sur son socle contre le mur d’une maison récente, coteau boisé derrière"),
    "ecole-valentin": ("A new vertical electric water heater installed in the corner of a renovated bathroom, white tiles, chrome fittings, "
                       "a towel radiator beside it, rainy daylight through a frosted window.",
                       "Chauffe-eau électrique neuf installé dans l’angle d’une salle de bains rénovée, sèche-serviettes à côté"),
    "franois": ("A new steel column radiator with a thermostatic valve installed under the deep window of a renovated Comtois farmhouse "
                "living room, thick stone walls, oak floor, warm winter light.",
                "Radiateur à colonnes neuf installé sous la fenêtre d’une ferme comtoise rénovée, murs épais en pierre, parquet"),
    "mamirolle": ("A new floor-standing oil condensing boiler in a clean, well-lit boiler room of a plateau farmhouse, flue and pipes "
                  "neatly fitted, snowy field seen through a small window.",
                  "Chaudière fioul au sol neuve dans une chaufferie propre et éclairée, champ enneigé par la petite fenêtre"),
    "marchaux-chaudefontaine": ("A gas condensing boiler with a neat underfloor-heating manifold of copper and brass installed in a "
                                "vaulted stone cellar, straight pipework, LED light.",
                                "Chaudière gaz et collecteur de plancher chauffant en cuivre et laiton installés dans une cave voûtée en pierre"),
    "miserey-salines": ("A new wall thermostat and a white panel radiator installed in a bright modern living room of a recent house with "
                        "light render, large window onto the garden, oak floor.",
                        "Thermostat mural et radiateur à panneau neufs dans le séjour lumineux d’une maison récente"),
    "pirey": ("A compact white gas boiler installed inside an open tall kitchen cabinet, perfectly integrated, modern kitchen with pale "
              "fronts, window with a view of the hills above Besançon on a frosty morning.",
              "Chaudière gaz compacte intégrée dans un meuble haut de cuisine ouvert, collines de Besançon par la fenêtre"),
    "roche-lez-beaupre": ("Two new horizontal white panel radiators installed in a bright bedroom with oak parquet and pale walls, "
                          "morning light from the Doubs valley through the window.",
                          "Deux radiateurs à panneaux neufs posés dans une chambre claire au parquet de chêne"),
    "saint-vit": ("A new thermodynamic hot water tank installed in a laundry room of a village house, white cylinder, neat ducting "
                  "and pipes, stone wall, window onto fields.",
                  "Chauffe-eau neuf posé au mur dans la buanderie d’une maison de village, tuyaux cuivre alignés"),
    "serre-les-sapins": ("A slim white wall-hung indoor hydraulic module of an air-to-water heat pump, shaped like a wall "
                         "boiler, installed on the wall of a clean bright garage above a green insulated buffer cylinder, "
                         "insulated pipes running straight between them, snow-dusted fir trees seen through the garage window.",
                         "Module intérieur de pompe à chaleur posé au mur au-dessus du ballon tampon, dans un garage propre, sapins enneigés par la fenêtre"),
    "thise": ("A new heated towel rail and a compact gas water heater installed in a renovated bathroom with light stone tiles, "
              "misty riverside light through the window.",
              "Sèche-serviettes et chauffe-eau gaz compact neufs dans une salle de bains rénovée, lumière de bord de rivière"),
}

def ecrire_jpeg(octets: bytes, dest: Path, largeur=1600, hauteur=1000, max_ko=400) -> int:
    im = Image.open(io.BytesIO(octets)).convert("RGB")
    w, h = im.size
    cible = largeur / hauteur
    if w / h > cible:
        nw = int(h * cible); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / cible); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    im = im.resize((largeur, hauteur), Image.LANCZOS)
    for q in (82, 76, 70, 64):
        buf = io.BytesIO(); im.save(buf, "JPEG", quality=q, optimize=True, progressive=True)
        if buf.tell() <= max_ko * 1024:
            break
    dest.write_bytes(buf.getvalue())
    return buf.tell()

def main() -> None:
    BRUT.mkdir(parents=True, exist_ok=True)
    quoi = sys.argv[1] if len(sys.argv) > 1 else ""
    if quoi == "bloc1":
        octets = fal("fal-ai/nano-banana-pro", {"prompt": BLOC1, "num_images": 1, "aspect_ratio": "16:9",
                                                "output_format": "png", "resolution": "2K"})
        dest = BRUT / "bloc1-brut.png"; dest.write_bytes(octets)
        im = Image.open(dest); print("bloc1", im.size, round(len(octets) / 1024), "Ko ->", dest)
        journal(f"bloc1\tfal-ai/nano-banana-pro 2K 16:9\t0,15 $\t{im.size[0]}x{im.size[1]}")
    elif quoi == "zones":
        voulus = sys.argv[2].split(",") if len(sys.argv) > 2 else list(ZONES)
        for slug in voulus:
            prompt, alt = ZONES[slug]
            octets = fal("fal-ai/bytedance/seedream/v4/text-to-image",
                         {"prompt": prompt + " " + STYLE, "image_size": {"width": 2048, "height": 1280}, "num_images": 1})
            (BRUT / f"{slug}-brut.jpg").write_bytes(octets)
            ko = ecrire_jpeg(octets, ROOT / "public/zones" / f"{slug}.jpg")
            f = ROOT / "content/zones" / f"{slug}.json"
            d = json.loads(f.read_text()); d["imageAlt"] = alt
            f.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n")
            print(f"{slug}: {round(ko / 1024)} Ko, alt mis à jour")
            journal(f"zone {slug}\tfal-ai/bytedance/seedream/v4 2048x1280\t~0,03 $\t{round(ko / 1024)} Ko")
    else:
        raise SystemExit(__doc__)

if __name__ == "__main__":
    main()
