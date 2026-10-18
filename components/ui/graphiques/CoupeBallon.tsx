import type { SVGProps } from 'react'

/**
 * Schéma de la page « Dépannage ballon d'eau chaude » (mise à jour n°1, 18/10/2026, #R52) :
 * un chauffe-eau vertical en coupe, dessiné, jamais une photo. Cuve émaillée, isolant,
 * eau chaude en haut et froide en bas, résistance prise dans le tartre, anode de magnésium
 * à moitié consommée, sonde du thermostat, groupe de sécurité qui goutte sur l'arrivée
 * d'eau froide. Les étiquettes apparaissent en cascade quand le dessin entre à l'écran
 * (`.vivant` + `.entree`, app/globals.css) ; sans script ou avec « réduire les animations »,
 * tout est visible d'emblée. Traits de repère jaune miel (#R66).
 */
const MIEL = '#FCD680'
const BORD = '#26221F'
const ACIER = '#CFC7BC'
const ISOLANT = '#E9E2D6'
const FER = '#6E675F'
const EAU = '#7FA6B8'
const CHAUD = '#F0A86B'
const FEU = '#E8863B'
const TARTRE = '#D8D1C4'

type Etiquette = { texte: string; x: number; y: number; ancre: 'start' | 'end'; vers: [number, number] }

const ETIQUETTES: Etiquette[] = [
  { texte: 'Eau chaude, tirée en haut', x: 600, y: 96, ancre: 'start', vers: [585, 32] },
  { texte: 'Isolant', x: 290, y: 150, ancre: 'end', vers: [341, 150] },
  { texte: 'Cuve émaillée', x: 620, y: 222, ancre: 'start', vers: [549, 222] },
  { texte: 'Sonde du thermostat', x: 620, y: 352, ancre: 'start', vers: [484, 346] },
  { texte: 'Anode de magnésium', x: 290, y: 400, ancre: 'end', vers: [396, 400] },
  { texte: 'Résistance', x: 620, y: 470, ancre: 'start', vers: [466, 470] },
  { texte: 'Tartre au fond', x: 290, y: 530, ancre: 'end', vers: [380, 552] },
  { texte: 'Groupe de sécurité', x: 290, y: 630, ancre: 'end', vers: [340, 662] },
  { texte: 'Thermostat', x: 620, y: 644, ancre: 'start', vers: [481, 632] },
  { texte: 'Arrivée d’eau froide', x: 110, y: 722, ancre: 'start', vers: [170, 672] },
]

export default function CoupeBallon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 900 780"
      role="img"
      aria-label="Dessin en coupe d’un ballon d’eau chaude : cuve, isolant, résistance entartrée, anode, thermostat et groupe de sécurité"
      {...props}
    >
      <defs>
        <linearGradient id="cb-eau" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={CHAUD} />
          <stop offset="0.55" stopColor="#B9B49A" />
          <stop offset="1" stopColor={EAU} />
        </linearGradient>
        <clipPath id="cb-cuve">
          <rect x="352" y="92" width="196" height="476" rx="34" />
        </clipPath>
      </defs>

      {/* mur et sol */}
      <rect x="300" y="0" width="300" height="740" fill="#F3EEE4" />
      <path d="M0 740H900" stroke={BORD} strokeWidth="4" />
      <path d="M0 740H900V780H0Z" fill="#B9ADA0" opacity=".35" />

      {/* tuyau d'eau chaude, vers les robinets */}
      <path d="M520 92V30H780" fill="none" stroke={BORD} strokeWidth="16" strokeLinejoin="round" />
      <path d="M520 92V30H780" fill="none" stroke={FEU} strokeWidth="9" strokeLinejoin="round" />

      {/* arrivée d'eau froide, groupe de sécurité, siphon */}
      <path d="M110 672H370V568" fill="none" stroke={BORD} strokeWidth="16" strokeLinejoin="round" />
      <path d="M110 672H370V568" fill="none" stroke={EAU} strokeWidth="9" strokeLinejoin="round" />
      <rect x="340" y="650" width="60" height="44" rx="4" fill={FER} stroke={BORD} strokeWidth="4" />
      <path d="M400 664L432 646" stroke={BORD} strokeWidth="7" strokeLinecap="round" />
      <path d="M370 694V722" stroke={EAU} strokeWidth="6" strokeLinecap="round" />
      <path d="M356 722H384L370 740Z" fill={FER} stroke={BORD} strokeWidth="3" strokeLinejoin="round" />
      {/* la goutte qui trahit un groupe fatigué */}
      <path d="M370 702c-5 8-8 12-8 16a8 8 0 0 0 16 0c0-4-3-8-8-16Z" fill={EAU} stroke={BORD} strokeWidth="2" />

      {/* enveloppe, isolant, cuve */}
      <rect x="320" y="60" width="260" height="540" rx="56" fill={ACIER} stroke={BORD} strokeWidth="5" />
      <rect x="334" y="74" width="232" height="512" rx="46" fill={ISOLANT} />
      <rect x="352" y="92" width="196" height="476" rx="34" fill="url(#cb-eau)" stroke={BORD} strokeWidth="3" />

      <g clipPath="url(#cb-cuve)">
        {/* dépôt de tartre au fond */}
        <path d="M352 544Q400 530 450 546T548 540V568H352Z" fill={TARTRE} />
        {/* anode de magnésium, grignotée */}
        <path d="M396 330H404V398L399 408L404 418V468L398 478L404 488V568H396Z" fill="#9A948C" stroke={BORD} strokeWidth="2" />
        {/* sonde du thermostat */}
        <path d="M482 568V330" stroke={FER} strokeWidth="6" strokeLinecap="round" />
        <circle cx="482" cy="330" r="7" fill={FER} stroke={BORD} strokeWidth="2" />
        {/* résistance en épingle, et le tartre qui l'enrobe */}
        <path d="M426 568V482Q426 452 446 452Q466 452 466 482V568" fill="none" stroke={FER} strokeWidth="11" strokeLinecap="round" />
        <path d="M426 568V482Q426 452 446 452Q466 452 466 482V568" fill="none" stroke={FEU} strokeWidth="4" strokeLinecap="round" />
        <circle cx="426" cy="520" r="8" fill="#F3EEE4" stroke={BORD} strokeWidth="1.5" />
        <circle cx="466" cy="500" r="7" fill="#F3EEE4" stroke={BORD} strokeWidth="1.5" />
        <circle cx="446" cy="455" r="6" fill="#F3EEE4" stroke={BORD} strokeWidth="1.5" />
        <circle cx="430" cy="548" r="6" fill="#F3EEE4" stroke={BORD} strokeWidth="1.5" />
      </g>

      {/* bride du bas et thermostat */}
      <rect x="410" y="568" width="80" height="32" rx="4" fill={FER} stroke={BORD} strokeWidth="4" />
      <path d="M450 600V612" stroke={BORD} strokeWidth="4" />
      <rect x="420" y="612" width="60" height="40" rx="4" fill="#3A352F" stroke={BORD} strokeWidth="3" />
      <circle cx="450" cy="632" r="10" fill={MIEL} stroke={BORD} strokeWidth="2" />
      <path d="M450 632L456 625" stroke={BORD} strokeWidth="2.5" strokeLinecap="round" />

      {/* étiquettes, en cascade */}
      {ETIQUETTES.map((e, i) => (
        <g key={e.texte} className="entree" style={{ ['--decal' as string]: `${0.12 * i + 0.2}s` }}>
          <path d={`M${e.vers[0]} ${e.vers[1]} L${e.x + (e.ancre === 'start' ? -6 : 6)} ${e.y - 8}`} stroke={MIEL} strokeWidth="3" strokeLinecap="round" />
          <circle cx={e.vers[0]} cy={e.vers[1]} r="6" fill={MIEL} stroke={BORD} strokeWidth="1.5" />
          <text x={e.x} y={e.y} fill={BORD} fontSize="25" fontWeight="600" textAnchor={e.ancre} fontFamily="var(--police-texte), system-ui, sans-serif">
            {e.texte}
          </text>
        </g>
      ))}
    </svg>
  )
}
