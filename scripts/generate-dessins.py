#!/usr/bin/env python3
"""
Dessins du corps des pages de prestation et de commune (mise à jour n°1, 18/10/2026).

Génère public/dessins/*.svg : un schéma du métier par prestation (9) et une carte du
Grand Besançon par commune (13), la commune en jaune miel. Zéro photo payante, zéro texte
porteur de SEO dans l'image (le texte reste dans la page). Rejouable : python3 scripts/generate-dessins.py
"""
import re
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / 'public' / 'dessins'
SORTIE.mkdir(parents=True, exist_ok=True)

MIEL = '#FCD680'
BORD = '#26221F'
MUR = '#F3EEE4'
FOND = '#FAF7F1'
ISOLANT = '#E9E2D6'
SOL = '#B9ADA0'
FER = '#6E675F'
ACIER = '#CFC7BC'
EAU = '#7FA6B8'
CHAUD = '#F0A86B'
FEU = '#E8863B'
GAZ = '#E3BE72'
CUIVRE = '#C9902B'
BOUE = '#8B6B4A'
VERT = '#5D9377'
GIVRE = '#DCEBF2'

W, H = 1200, 800
POLICE = "font-family='ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'"


def svg(label, corps, sol=True):
    out = [f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {W} {H}' role='img' aria-label=\"{label}\">",
           f"<rect width='{W}' height='{H}' fill='{FOND}'/>"]
    if sol:
        out.append(f"<rect x='0' y='700' width='{W}' height='100' fill='{SOL}' opacity='.32'/>")
        out.append(f"<path d='M0 700H{W}' stroke='{BORD}' stroke-width='5'/>")
    out.append(corps)
    out.append('</svg>')
    return '\n'.join(out)


def marque(n, x, y):
    return (f"<circle cx='{x}' cy='{y}' r='24' fill='{MIEL}' stroke='{BORD}' stroke-width='4'/>"
            f"<text x='{x}' y='{y + 10}' text-anchor='middle' font-size='28' font-weight='700' fill='{BORD}' {POLICE}>{n}</text>")


def repere(x1, y1, x2, y2):
    return f"<path d='M{x1} {y1}L{x2} {y2}' stroke='{MIEL}' stroke-width='5' stroke-linecap='round'/>"


def rect(x, y, w, h, fill, rx=10, sw=5, stroke=BORD, extra=''):
    return f"<rect x='{x}' y='{y}' width='{w}' height='{h}' rx='{rx}' fill='{fill}' stroke='{stroke}' stroke-width='{sw}' {extra}/>"


def trait(d, stroke=BORD, sw=5, fill='none', extra=''):
    return f"<path d='{d}' fill='{fill}' stroke='{stroke}' stroke-width='{sw}' stroke-linecap='round' stroke-linejoin='round' {extra}/>"


def flamme(x, y, taille=1.0):
    s = taille
    return (f"<path d='M{x} {y} c{-14*s} {-22*s} {-6*s} {-40*s} {8*s} {-54*s} c{2*s} {18*s} {10*s} {22*s} {12*s} {36*s} "
            f"c{6*s} {-8*s} {6*s} {-16*s} {4*s} {-26*s} c{14*s} {14*s} {12*s} {36*s} {-24*s} {44*s}Z' fill='{FEU}' stroke='{BORD}' stroke-width='3'/>"
            f"<path d='M{x+2*s} {y-6*s} c{-5*s} {-10*s} {-1*s} {-18*s} {5*s} {-24*s} c{1*s} {8*s} {6*s} {12*s} {4*s} {20*s}Z' fill='{MIEL}'/>")


def radiateur(x, y, w=260, h=180, fill='#F6F3EC', boue_h=0):
    out = [rect(x, y, w, h, fill, rx=14)]
    if boue_h:
        out.append(f"<path d='M{x+8} {y+h-boue_h} q{w/4} -18 {w/2} 0 t{w/2-16} 0 V{y+h-8} q-6 6 -12 6 H{x+20} q-8 0 -12 -8Z' fill='{BOUE}'/>")
    n = int(w // 36)
    for i in range(1, n):
        out.append(f"<path d='M{x + i*36} {y+14}V{y+h-14}' stroke='{BORD}' stroke-width='3' opacity='.55'/>")
    out.append(trait(f"M{x+30} {y+h}v34M{x+w-30} {y+h}v34", sw=6))
    return ''.join(out)


def chaudiere_murale(x, y, w=300, h=420, ouverte=True):
    """Chaudière gaz murale en coupe : échangeur, brûleur, pompe, vase, afficheur."""
    out = [rect(x, y, w, h, '#F7F4EE', rx=22, sw=6)]
    # conduit de fumée
    out.append(rect(x + w/2 - 34, y - 90, 68, 92, ACIER, rx=8))
    out.append(trait(f"M{x+w/2-18} {y-60}h36M{x+w/2-18} {y-36}h36", sw=3, stroke=FER))
    if ouverte:
        # échangeur (serpentin)
        ex, ey = x + 48, y + 44
        out.append(rect(ex, ey, w - 96, 120, ISOLANT, rx=12, sw=4))
        for i in range(5):
            yy = ey + 20 + i * 20
            out.append(trait(f"M{ex+14} {yy} H{ex+w-110}", stroke=CUIVRE, sw=8))
        # brûleur et flammes
        bx, by = x + 60, y + 236
        out.append(rect(bx, by, w - 120, 26, FER, rx=6, sw=4))
        for i in range(5):
            out.append(flamme(bx + 26 + i * 40, by + 4, 0.8))
        # pompe
        out.append(f"<circle cx='{x+86}' cy='{y+330}' r='40' fill='{ACIER}' stroke='{BORD}' stroke-width='5'/>")
        out.append(f"<circle cx='{x+86}' cy='{y+330}' r='16' fill='{FER}' stroke='{BORD}' stroke-width='4'/>")
        # vase d'expansion
        out.append(f"<ellipse cx='{x+w-80}' cy='{y+330}' rx='52' ry='40' fill='{ACIER}' stroke='{BORD}' stroke-width='5'/>")
        out.append(f"<path d='M{x+w-132} {y+330}h104' stroke='{BORD}' stroke-width='3' stroke-dasharray='8 8'/>")
        # afficheur
        out.append(rect(x + w/2 - 50, y + h - 56, 100, 34, BORD, rx=6, sw=3))
        out.append(f"<rect x='{x+w/2-40}' y='{y+h-48}' width='30' height='18' rx='3' fill='{MIEL}'/>")
        out.append(f"<rect x='{x+w/2-4}' y='{y+h-48}' width='12' height='18' rx='3' fill='{MIEL}' opacity='.6'/>")
        out.append(f"<rect x='{x+w/2+14}' y='{y+h-48}' width='22' height='18' rx='3' fill='{MIEL}' opacity='.35'/>")
    # tuyaux dessous : gaz (jaune), départ (chaud), retour (froid), eau
    bas = y + h
    out.append(trait(f"M{x+60} {bas}V700", stroke=CHAUD, sw=10))
    out.append(trait(f"M{x+110} {bas}V700", stroke=EAU, sw=10))
    out.append(trait(f"M{x+w-110} {bas}V700", stroke=GAZ, sw=10))
    out.append(trait(f"M{x+w-60} {bas}V700", stroke=CUIVRE, sw=10))
    return ''.join(out)


DESSINS = {}

# 1. Chaudière gaz : les quatre pannes
DESSINS['depannage-chaudiere-gaz'] = (
    "Dessin d’une chaudière gaz murale ouverte : échangeur, brûleur, pompe, vase d’expansion et afficheur, les pièces en panne repérées en jaune",
    rect(380, 0, 440, 700, MUR, rx=0, sw=0)
    + chaudiere_murale(450, 150)
    + repere(498, 194, 300, 150) + marque(1, 270, 150)
    + repere(520, 386, 300, 420) + marque(2, 270, 420)
    + repere(536, 480, 300, 560) + marque(3, 270, 560)
    + repere(670, 480, 900, 420) + marque(4, 930, 420)
    + repere(600, 540, 900, 600) + marque(5, 930, 600),
)

# 2. Chaudière fioul : cuve, filtre, gicleur, brûleur
cuve = (rect(90, 300, 360, 300, ACIER, rx=28, sw=6)
        + f"<path d='M110 470 q60 -16 120 0 t120 0 t100 0 V580 q-10 10 -20 10 H120 q-10 0 -10 -10Z' fill='{GAZ}' opacity='.85'/>"
        + rect(230, 262, 80, 44, FER, rx=8)
        + trait("M450 560 H640 V500", stroke=CUIVRE, sw=10)
        + f"<rect x='490' y='532' width='60' height='56' rx='8' fill='{MIEL}' stroke='{BORD}' stroke-width='5'/>"
        + trait("M504 546v28M520 546v28M536 546v28", sw=3)
        + rect(700, 300, 380, 400, '#F7F4EE', rx=22, sw=6)
        + rect(820, 180, 80, 124, ACIER, rx=8)
        + rect(560, 440, 140, 60, FER, rx=10, sw=5)
        + f"<path d='M700 470 l40 0' stroke='{BORD}' stroke-width='6'/>"
        + f"<path d='M740 470 l-10 -8 v16Z' fill='{MIEL}' stroke='{BORD}' stroke-width='3'/>"
        + flamme(790, 500, 1.1) + flamme(830, 505, 1.3) + flamme(870, 500, 1.0)
        + rect(760, 340, 260, 110, ISOLANT, rx=12, sw=4)
        + trait("M780 360H1000M780 384H1000M780 408H1000M780 432H1000", stroke=CUIVRE, sw=8))
DESSINS['depannage-chaudiere-fioul'] = (
    "Dessin d’une chaufferie fioul : cuve de stockage, conduite, filtre repéré en jaune, brûleur avec gicleur et flamme dans la chaudière",
    cuve
    + repere(150, 470, 150, 230) + marque(1, 150, 200)
    + repere(520, 532, 520, 400) + marque(2, 520, 370)
    + repere(735, 470, 640, 640) + marque(3, 610, 650)
    + repere(830, 505, 1000, 600) + marque(4, 1030, 600),
)

# 3. Pompe à chaleur : unité extérieure givrée, module intérieur, liaison
ext = (rect(120, 380, 340, 320, '#F7F4EE', rx=18, sw=6)
       + f"<circle cx='290' cy='540' r='110' fill='{ISOLANT}' stroke='{BORD}' stroke-width='5'/>"
       + ''.join(f"<path d='M290 540 l{int(100*__import__('math').cos(a))} {int(100*__import__('math').sin(a))}' stroke='{BORD}' stroke-width='4'/>" for a in [i*0.785 for i in range(8)])
       + f"<circle cx='290' cy='540' r='28' fill='{FER}' stroke='{BORD}' stroke-width='4'/>"
       + ''.join(f"<circle cx='{x}' cy='{y}' r='{r}' fill='{GIVRE}' stroke='{EAU}' stroke-width='2'/>" for x, y, r in
                 [(150, 410, 10), (178, 398, 7), (430, 420, 9), (445, 450, 6), (140, 460, 6), (420, 690, 8), (160, 680, 7)])
       + rect(120, 700, 340, 24, SOL, rx=4, sw=4))
mur = f"<rect x='560' y='0' width='40' height='700' fill='{ISOLANT}' stroke='{BORD}' stroke-width='5'/>"
inter = (rect(720, 220, 300, 400, '#F7F4EE', rx=22, sw=6)
         + f"<circle cx='800' cy='340' r='40' fill='{ACIER}' stroke='{BORD}' stroke-width='5'/>"
         + f"<circle cx='800' cy='340' r='14' fill='{FER}'/>"
         + rect(880, 290, 100, 100, ISOLANT, rx=12, sw=4)
         + trait("M896 310H964M896 334H964M896 358H964", stroke=CUIVRE, sw=7)
         + rect(820, 540, 100, 34, BORD, rx=6, sw=3)
         + f"<rect x='832' y='548' width='40' height='18' rx='3' fill='{MIEL}'/>"
         + rect(760, 430, 220, 70, ISOLANT, rx=10, sw=4)
         + trait("M780 465 H960", stroke=FEU, sw=8)
         + trait("M870 620V700M900 620V700", stroke=CHAUD, sw=10))
liaison = (trait("M460 600 H560", stroke=CUIVRE, sw=10) + trait("M460 640 H560", stroke=CUIVRE, sw=10)
           + trait("M600 600 H720", stroke=CUIVRE, sw=10) + trait("M600 640 H720", stroke=CUIVRE, sw=10))
DESSINS['depannage-pompe-chaleur'] = (
    "Dessin d’une pompe à chaleur : unité extérieure avec son ventilateur et du givre, liaison en cuivre à travers le mur, module intérieur avec compresseur, échangeur, appoint et afficheur",
    ext + mur + inter + liaison
    + repere(170, 420, 170, 300) + marque(1, 170, 270)
    + repere(290, 540, 290, 300) + marque(2, 290, 270)
    + repere(870, 465, 1080, 400) + marque(3, 1110, 400)
    + repere(870, 557, 1080, 560) + marque(4, 1110, 560),
)

# 4. Climatisation réversible : split intérieur et unité extérieure, été et hiver
split = (rect(640, 120, 440, 130, '#F7F4EE', rx=26, sw=6)
         + trait("M680 220H1040", sw=4, stroke=FER)
         + f"<rect x='960' y='150' width='60' height='22' rx='4' fill='{BORD}'/>"
         + f"<rect x='968' y='156' width='22' height='10' rx='2' fill='{MIEL}'/>"
         + ''.join(trait(f"M{x} 262 q-10 50 -30 90", stroke=EAU, sw=7, extra="opacity='.9'") for x in (700, 760, 820))
         + ''.join(trait(f"M{x} 262 q10 50 30 90", stroke=FEU, sw=7, extra="opacity='.9'") for x in (900, 960, 1020))
         + f"<text x='760' y='400' text-anchor='middle' font-size='34' font-weight='700' fill='{EAU}' {POLICE}>été</text>"
         + f"<text x='990' y='400' text-anchor='middle' font-size='34' font-weight='700' fill='{FEU}' {POLICE}>hiver</text>")
ext2 = (rect(120, 420, 300, 280, '#F7F4EE', rx=18, sw=6)
        + f"<circle cx='270' cy='560' r='96' fill='{ISOLANT}' stroke='{BORD}' stroke-width='5'/>"
        + ''.join(f"<path d='M270 560 l{int(86*__import__('math').cos(a))} {int(86*__import__('math').sin(a))}' stroke='{BORD}' stroke-width='4'/>" for a in [i*0.785 + 0.39 for i in range(8)])
        + f"<circle cx='270' cy='560' r='24' fill='{FER}' stroke='{BORD}' stroke-width='4'/>")
mur2 = f"<rect x='520' y='0' width='40' height='700' fill='{ISOLANT}' stroke='{BORD}' stroke-width='5'/>"
liaison2 = (trait("M420 500 H520", stroke=CUIVRE, sw=10) + trait("M560 500 H600 V250 H640", stroke=CUIVRE, sw=10)
            + trait("M420 540 H520", stroke=CUIVRE, sw=10) + trait("M560 540 H616 V236 H640", stroke=CUIVRE, sw=10)
            + trait("M700 250 V700", stroke=EAU, sw=5, extra="stroke-dasharray='10 12'"))
DESSINS['climatisation-reversible'] = (
    "Dessin d’une climatisation réversible : unité murale intérieure qui souffle du froid l’été et du chaud l’hiver, liaison en cuivre vers l’unité extérieure, évacuation des condensats",
    split + ext2 + mur2 + liaison2
    + repere(270, 560, 270, 330) + marque(1, 270, 300)
    + repere(1000, 160, 1120, 300) + marque(2, 1130, 330)
    + repere(700, 500, 820, 560) + marque(3, 850, 560),
)

# 5. Chauffage électrique : tableau, disjoncteur, fil pilote, radiateur
tableau = (rect(120, 160, 320, 380, '#F7F4EE', rx=16, sw=6)
           + ''.join(rect(150 + (i % 4) * 68, 220 + (i // 4) * 110, 54, 84, ISOLANT if i != 6 else MIEL, rx=6, sw=4) for i in range(12))
           + ''.join(f"<rect x='{166 + (i % 4) * 68}' y='{236 + (i // 4) * 110 + (28 if i == 6 else 0)}' width='22' height='30' rx='4' fill='{BORD if i != 6 else FEU}'/>" for i in range(12))
           + trait("M150 190H410", stroke=FER, sw=4))
fil = (trait("M440 380 H560 Q600 380 600 420 V620 H660", stroke=BORD, sw=5)
       + trait("M440 400 H560 Q580 400 580 430 V640 H660", stroke=FER, sw=5, extra="stroke-dasharray='14 10'"))
radia = (radiateur(660, 500, 380, 200, fill='#F6F3EC')
         + rect(1000, 440, 70, 60, BORD, rx=8, sw=3)
         + f"<rect x='1012' y='452' width='46' height='22' rx='3' fill='{MIEL}'/>"
         + f"<circle cx='1035' cy='488' r='6' fill='{VERT}'/>")
DESSINS['depannage-chauffage-electrique'] = (
    "Dessin d’un chauffage électrique : tableau avec un disjoncteur déclenché repéré en jaune, ligne et fil pilote jusqu’au radiateur et son thermostat",
    tableau + fil + radia
    + repere(583, 372, 583, 200) + marque(1, 583, 170)
    + repere(680, 540, 760, 400) + marque(2, 790, 380)
    + repere(1035, 440, 1120, 300) + marque(3, 1130, 270),
)

# 6. Désembouage : radiateur plein de boues, pompe, flexibles
pompe = (rect(760, 480, 260, 220, '#F7F4EE', rx=18, sw=6)
         + f"<circle cx='890' cy='590' r='64' fill='{ACIER}' stroke='{BORD}' stroke-width='5'/>"
         + f"<path d='M890 590 l0 -44 M890 590 l38 22 M890 590 l-38 22' stroke='{BORD}' stroke-width='5' stroke-linecap='round'/>"
         + rect(1000, 520, 80, 180, ISOLANT, rx=10, sw=5)
         + f"<path d='M1012 650 q30 -14 60 0 V690 H1012Z' fill='{BOUE}'/>")
flex = (trait("M190 660 V692 H720 V600 H760", stroke=EAU, sw=10)
        + trait("M510 660 V676 H736 V640 H760", stroke=BOUE, sw=10)
        + ''.join(f"<path d='M{x} 692 l-14 -10 v20Z' fill='{EAU}'/>" for x in (300, 440, 620))
        + ''.join(f"<path d='M{x} 676 l14 -10 v20Z' fill='{BOUE}'/>" for x in (560, 640, 700)))
DESSINS['desembouage-chauffage'] = (
    "Dessin d’un désembouage : radiateur en coupe avec les boues au fond, pompe de désembouage raccordée par deux flexibles, boues récupérées dans le bac",
    f"<rect x='0' y='0' width='{W}' height='700' fill='{MUR}' opacity='.5'/>"
    + radiateur(160, 400, 380, 260, boue_h=90)
    + f"<path d='M180 500 q30 -40 60 -4 q30 -36 60 0 q30 -40 60 -2 q30 -36 60 0 q30 -40 60 -2' fill='none' stroke='{BOUE}' stroke-width='4' opacity='.6'/>"
    + pompe + flex
    + repere(350, 620, 350, 330) + marque(1, 350, 300)
    + repere(890, 560, 890, 400) + marque(2, 890, 370)
    + repere(1040, 660, 1120, 480) + marque(3, 1130, 450),
)

# 7. Entretien annuel : chaudière ouverte et points contrôlés
DESSINS['entretien-annuel-chaudiere'] = (
    "Dessin d’un entretien de chaudière : chaudière ouverte avec les points contrôlés numérotés, analyseur de combustion sur le conduit, manomètre",
    rect(380, 0, 440, 700, MUR, rx=0, sw=0)
    + chaudiere_murale(450, 150)
    # analyseur de combustion sur le conduit
    + trait("M634 90 H760 V330", stroke=BORD, sw=5)
    + rect(730, 330, 70, 110, BORD, rx=10, sw=3)
    + f"<rect x='742' y='342' width='46' height='34' rx='4' fill='{MIEL}'/>"
    + f"<circle cx='765' cy='408' r='8' fill='{VERT}'/>"
    # manomètre
    + f"<circle cx='300' cy='560' r='54' fill='#F7F4EE' stroke='{BORD}' stroke-width='5'/>"
    + f"<path d='M300 560 l-24 -36' stroke='{FEU}' stroke-width='5' stroke-linecap='round'/>"
    + f"<path d='M262 540 a44 44 0 0 1 76 0' fill='none' stroke='{VERT}' stroke-width='8'/>"
    + trait("M354 560 H450", stroke=EAU, sw=8)
    + marque(1, 540, 70) + repere(564, 76, 584, 90)
    + marque(2, 420, 250) + repere(440, 250, 500, 260)
    + marque(3, 420, 400) + repere(440, 400, 510, 400)
    + marque(4, 300, 470)
    + marque(5, 860, 560) + repere(836, 560, 660, 560),
)

# 8. Remplacement : ancienne au sol, flèche, neuve murale
ancienne = (rect(110, 320, 300, 380, '#DDD6CB', rx=14, sw=6)
            + rect(200, 190, 110, 130, '#CFC7BC', rx=8, sw=5)
            + trait("M150 420 l40 60 l-30 50 l50 70", stroke=FER, sw=4)
            + trait("M330 380 l-30 80 l40 40", stroke=FER, sw=4)
            + f"<circle cx='300' cy='620' r='26' fill='{FER}' stroke='{BORD}' stroke-width='4'/>"
            + f"<path d='M150 380h40M170 360v40' stroke='{BOUE}' stroke-width='5' opacity='.6'/>")
fleche = (f"<path d='M470 500 H640' stroke='{BORD}' stroke-width='10' stroke-linecap='round'/>"
          + f"<path d='M620 468 L680 500 L620 532Z' fill='{MIEL}' stroke='{BORD}' stroke-width='6' stroke-linejoin='round'/>")
neuve = (rect(760, 0, 440, 700, MUR, rx=0, sw=0)
         + chaudiere_murale(830, 220, w=300, h=380, ouverte=False)
         + f"<rect x='940' y='560' width='80' height='26' rx='5' fill='{BORD}'/>"
         + f"<rect x='950' y='566' width='30' height='14' rx='3' fill='{MIEL}'/>"
         + f"<circle cx='980' cy='430' r='60' fill='none' stroke='{VERT}' stroke-width='6' stroke-dasharray='12 10'/>"
         + f"<path d='M948 430 l22 24 l44 -52' fill='none' stroke='{VERT}' stroke-width='10' stroke-linecap='round' stroke-linejoin='round'/>")
DESSINS['remplacement-chaudiere'] = (
    "Dessin d’un remplacement de chaudière : ancienne chaudière au sol à gauche, flèche, chaudière murale à condensation neuve à droite",
    ancienne + fleche + neuve
    + marque(1, 260, 130) + repere(260, 158, 260, 190)
    + marque(2, 980, 140) + repere(980, 168, 980, 220),
)

# 9. Ballon : les trois points de fuite
ballon = (rect(430, 120, 300, 480, ISOLANT, rx=70, sw=6)
          + f"<rect x='470' y='160' width='220' height='400' rx='48' fill='{ACIER}' stroke='{BORD}' stroke-width='4'/>"
          + f"<path d='M470 360 h220 v152 a48 48 0 0 1 -48 48 h-124 a48 48 0 0 1 -48 -48Z' fill='{EAU}' opacity='.8'/>"
          + f"<path d='M470 208 a48 48 0 0 1 48 -48 h124 a48 48 0 0 1 48 48 v152 h-220Z' fill='{CHAUD}' opacity='.8'/>"
          + trait("M600 600 V640", stroke=EAU, sw=10)
          + rect(560, 640, 80, 44, FER, rx=8, sw=5)
          + trait("M640 662 H760 V700", stroke=EAU, sw=10)
          + trait("M560 662 H440", stroke=CUIVRE, sw=10)
          + ''.join(f"<path d='M600 {y} q6 10 0 18 q-6 -8 0 -18Z' fill='{EAU}'/>" for y in (692, 716, 740))
          # bride latérale avec joint
          + f"<circle cx='470' cy='520' r='40' fill='{FER}' stroke='{BORD}' stroke-width='5'/>"
          + f"<circle cx='470' cy='520' r='22' fill='{ACIER}' stroke='{BORD}' stroke-width='3'/>"
          + f"<path d='M440 548 q-10 20 -4 40' stroke='{EAU}' stroke-width='6' stroke-linecap='round' fill='none'/>"
          # trace de corrosion sur la cuve
          + f"<path d='M660 420 q20 12 10 40 q-16 10 -30 -4 q-6 -22 20 -36Z' fill='{BOUE}' opacity='.75'/>"
          + f"<path d='M668 462 q4 24 -2 48' stroke='{EAU}' stroke-width='5' stroke-linecap='round' fill='none'/>")
DESSINS['depannage-ballon-eau-chaude'] = (
    "Dessin d’un ballon d’eau chaude et de ses trois points de fuite : groupe de sécurité qui goutte, joint de bride, cuve percée par la corrosion",
    f"<rect x='330' y='0' width='500' height='700' fill='{MUR}'/>"
    + ballon
    + marque(1, 860, 680) + repere(836, 680, 620, 690)
    + marque(2, 300, 560) + repere(324, 560, 436, 540)
    + marque(3, 860, 400) + repere(836, 400, 684, 440),
)

for slug, (label, corps) in DESSINS.items():
    (SORTIE / f'{slug}.svg').write_text(svg(label, corps), encoding='utf-8')

# Cartes par commune ------------------------------------------------------------------
geo = (RACINE / 'components' / 'ui' / 'graphiques' / 'grand-besancon-geo.ts').read_text(encoding='utf-8')
motif = re.compile(r"\{ slug: '([^']+)', insee: '[^']+', nom: '([^']+)', cx: (\d+), cy: (\d+), d: '([^']+)' \}")
communes = [(m.group(1), m.group(2), int(m.group(3)), int(m.group(4)), m.group(5)) for m in motif.finditer(geo)]
assert len(communes) == 13, len(communes)
vb = re.search(r"CARTE_VIEWBOX = '0 0 (\d+) (\d+)'", geo)
LARG, HAUT = int(vb.group(1)), int(vb.group(2))
dx = (W - LARG) / 2

for slug, nom, cx, cy, d in communes:
    corps = [f"<g transform='translate({dx:.0f} 0)'>"]
    for s2, n2, x2, y2, d2 in communes:
        if s2 == slug:
            continue
        fill = '#D9D5CB' if s2 == 'besancon' else ISOLANT
        corps.append(f"<path d='{d2}' fill='{fill}' stroke='#FAF7F1' stroke-width='3' stroke-linejoin='round'/>")
    corps.append(f"<path d='{d}' fill='{MIEL}' stroke='{BORD}' stroke-width='5' stroke-linejoin='round'/>")
    # épingle sur la commune
    corps.append(f"<path d='M{cx} {cy-8} c-26 -34 -26 -74 0 -92 c26 18 26 58 0 92Z' fill='{BORD}'/>")
    corps.append(f"<circle cx='{cx}' cy='{cy-64}' r='13' fill='{MIEL}'/>")
    if slug != 'besancon':
        bx, by = next((x, y) for s, n, x, y, _ in communes if s == 'besancon')
        corps.append(f"<text x='{bx}' y='{by+12}' text-anchor='middle' font-size='30' font-weight='700' fill='{FER}' {POLICE}>Besançon</text>")
    corps.append('</g>')
    label = f"Carte dessinée du Grand Besançon, {nom} en jaune miel" + ('' if slug == 'besancon' else ', Besançon au centre')
    (SORTIE / f'carte-{slug}.svg').write_text(svg(label, ''.join(corps), sol=False), encoding='utf-8')

print(f'OK : {len(DESSINS)} schémas et {len(communes)} cartes dans public/dessins/')
