"""Secteur de Chauffage David (Rémy 18/11/2026) : communes à 30 km au plus de Besançon.

Lit geo.api.gouv.fr (centre de chaque commune du Doubs, du Jura et de la Haute-Saône),
écrit public/zone-30km.json : { "<code postal>": ["Nom", ...] } des communes DANS le secteur.
Relancer : python3 scripts/zone-30km.py
"""
import json, math, urllib.request

RAYON_KM = 30


def lire(url):
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)


def km(a, b):
    (lo1, la1), (lo2, la2) = a, b
    p = math.pi / 180
    h = math.sin((la2 - la1) * p / 2) ** 2 + math.cos(la1 * p) * math.cos(la2 * p) * math.sin((lo2 - lo1) * p / 2) ** 2
    return 2 * 6371 * math.asin(math.sqrt(h))


centre = lire('https://geo.api.gouv.fr/communes/25056?fields=centre')['centre']['coordinates']
zone = {}
for dep in ('25', '39', '70'):
    for c in lire(f'https://geo.api.gouv.fr/departements/{dep}/communes?fields=nom,codesPostaux,centre'):
        if not c.get('centre') or km(centre, c['centre']['coordinates']) > RAYON_KM:
            continue
        for cp in c['codesPostaux']:
            zone.setdefault(cp, []).append(c['nom'])
zone = {cp: sorted(set(n)) for cp, n in sorted(zone.items())}
json.dump(zone, open('public/zone-30km.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print(f'OK : {sum(len(v) for v in zone.values())} communes, {len(zone)} codes postaux dans {RAYON_KM} km')
