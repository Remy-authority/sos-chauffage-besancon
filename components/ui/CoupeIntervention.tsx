import type { SVGProps } from 'react'
import { COUPE_VB_LARGE, COUPE_VB_SERRE, ETAPES } from './intervention-etapes'

/**
 * Dessin du bloc 3 : la maison en coupe, la chaudière murale, le radiateur et le
 * circuit, et ce qui se passe à chaque temps du dépannage. Cadre fixe, étapes qui
 * apparaissent une à une, traits jaune miel (#R66).
 *
 * Pilotage : `data-etape` sur le <svg> (posé par SequenceIntervention) ; chaque
 * élément porte `data-de` (apparaît à partir de ce temps) et parfois `data-a`
 * (disparaît après ce temps). Sans script ou avec « réduire les animations », le
 * dessin reste à ETAT_FIXE : tout est visible.
 */
export const MIEL = '#FCD680'
const BORD = '#26221F'
const MUR = '#E9E2D6'
const SOL = '#B9ADA0'
const FER = '#6E675F'
const EAU = '#7FA6B8'
const FEU = '#E8863B'
export const ETAT_FIXE = ETAPES.length - 1

/** Visible du temps `de` au temps `a` inclus (ou jusqu'à la fin), avec un fondu court. */
function visible(etape: number, de: number, a?: number) {
  const vu = etape >= de && (a === undefined || etape <= a)
  return { 'data-de': de, style: { opacity: vu ? 1 : 0, transition: 'opacity .3s ease-out' } }
}

function Etiquette({ etape, k, x, y, texte, vers }: { etape: number; k: number; x: number; y: number; texte: string; vers: [number, number] }) {
  const gauche = vers[0] < x
  return (
    <g className="cf-miel" data-k={k} {...visible(etape, k, k)}>
      <path d={`M${vers[0]} ${vers[1]} L${x} ${y}`} stroke={MIEL} strokeWidth="3" strokeLinecap="round" />
      <circle cx={vers[0]} cy={vers[1]} r="6" fill={MIEL} />
      <text x={x} y={y - 12} fill={BORD} fontSize="26" fontWeight="600" textAnchor={gauche ? 'start' : 'end'} fontFamily="var(--police-texte), system-ui, sans-serif">
        {texte}
      </text>
    </g>
  )
}

export default function CoupeIntervention({ serre = false, etape, ...props }: { serre?: boolean; etape?: number } & SVGProps<SVGSVGElement>) {
  const vb = serre ? COUPE_VB_SERRE : COUPE_VB_LARGE
  const t = etape ?? ETAT_FIXE
  const pas = (de: number, a?: number) => visible(t, de, a)
  return (
    <svg
      viewBox={`${vb.x} 0 ${vb.w} ${vb.h}`}
      data-etape={t}
      role="img"
      aria-label="Dessin en coupe d’une maison avec sa chaudière murale, son radiateur et les six temps du dépannage"
      {...props}
    >
      {/* ciel et sol */}
      <rect x="0" y="0" width="1200" height="800" fill="none" />
      <path d="M0 700H1200" stroke={BORD} strokeWidth="4" />
      <path d="M0 700H1200V800H0Z" fill={SOL} opacity=".35" />

      {/* la maison en coupe */}
      <path d="M400 250V700H1040V250" fill={MUR} stroke={BORD} strokeWidth="5" />
      <path d="M375 262L720 95L1065 262" fill="none" stroke={BORD} strokeWidth="6" strokeLinejoin="round" />
      <path d="M400 250L720 100L1040 250Z" fill="#D8CFC2" opacity=".6" />
      <path d="M400 700V250M1040 700V250" stroke={BORD} strokeWidth="5" />
      {/* fenêtre */}
      <rect x="470" y="320" width="130" height="110" fill="#CFE2EA" stroke={BORD} strokeWidth="4" />
      <path d="M535 320V430M470 375H600" stroke={BORD} strokeWidth="3" />

      {/* radiateur */}
      <g>
        <rect x="460" y="565" width="170" height="110" rx="6" fill="#F6F1E8" stroke={BORD} strokeWidth="5" />
        {[484, 508, 532, 556, 580, 604].map((x) => (
          <path key={x} d={`M${x} 575V665`} stroke={FER} strokeWidth="4" />
        ))}
        <path d="M480 675V700M610 675V700" stroke={BORD} strokeWidth="5" />
        {/* chaleur qui remonte, étape 6 */}
        <g {...pas(5)} stroke={FEU} strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M500 548c0-18 14-18 14-36" />
          <path d="M545 548c0-18 14-18 14-36" />
          <path d="M590 548c0-18 14-18 14-36" />
        </g>
      </g>

      {/* circuit : départ et retour entre chaudière et radiateur */}
      <path d="M905 470V520H640V585" fill="none" stroke={FEU} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M955 470V545H655V655" fill="none" stroke={EAU} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      {/* robinet d'eau chaude */}
      <path d="M980 470V600H1010" fill="none" stroke={EAU} strokeWidth="6" strokeLinecap="round" />
      <path d="M1000 600h20v10h-20z" fill={FER} />
      <g {...pas(5)} fill={EAU}>
        <path d="M1010 622c-5 8-9 13-9 19a9 9 0 0 0 18 0c0-6-4-11-9-19Z" />
        <path d="M1010 655c-4 6-7 10-7 15a7 7 0 0 0 14 0c0-5-3-9-7-15Z" opacity=".7" />
      </g>

      {/* chaudière murale */}
      <g>
        <rect x="860" y="300" width="130" height="170" rx="8" fill="#F8F4EC" stroke={BORD} strokeWidth="5" />
        <rect x="878" y="318" width="94" height="40" rx="4" fill="#2B2A2C" />
        {/* écran : code erreur, visible jusqu'à la réparation */}
        <text x="925" y="347" fill="#FF7A59" fontSize="24" fontWeight="700" textAnchor="middle" fontFamily="var(--police-texte), system-ui, sans-serif" {...pas(0, 3)}>
          ERR
        </text>
        <text x="925" y="347" fill="#8FD39B" fontSize="22" fontWeight="700" textAnchor="middle" fontFamily="var(--police-texte), system-ui, sans-serif" {...pas(4)}>
          OK
        </text>
        {/* façade fermée jusqu'au diagnostic */}
        <rect x="878" y="372" width="94" height="84" rx="4" fill="#EFE8DC" stroke={FER} strokeWidth="2" {...pas(0, 2)} />
        {/* intérieur visible à partir du diagnostic : brûleur, échangeur, circulateur */}
        <g {...pas(3)}>
          <rect x="878" y="372" width="94" height="84" rx="4" fill="#DED5C7" stroke={FER} strokeWidth="2" />
          <path d="M890 392h70M890 404h70M890 416h70" stroke={FER} strokeWidth="3" />
          <circle cx="950" cy="440" r="11" fill="#F8F4EC" stroke={FER} strokeWidth="3" />
          <path d="M950 433v14M943 440h14" stroke={FER} strokeWidth="2" />
          <circle cx="900" cy="440" r="11" fill="#F8F4EC" stroke={FER} strokeWidth="3" />
        </g>
        {/* pièce défectueuse, en rouge, jusqu'à la réparation */}
        <circle cx="900" cy="440" r="11" fill="#E05A4B" stroke={BORD} strokeWidth="3" {...pas(3, 3)} />
        {/* pièce neuve posée */}
        <circle cx="900" cy="440" r="11" fill={MIEL} stroke={BORD} strokeWidth="3" {...pas(4)} />
        {/* flamme rallumée */}
        <g {...pas(5)}>
          <path d="M925 428c6 6 10 11 10 17a10 10 0 0 1-20 0c0-6 4-11 10-17Z" fill={FEU} />
          <path d="M925 437c3 3 5 6 5 9a5 5 0 0 1-10 0c0-3 2-6 5-9Z" fill={MIEL} />
        </g>
      </g>

      {/* temps 1 : l'appel, bulle au centre de la pièce */}
      <g {...pas(0, 1)}>
        <rect x="660" y="330" width="150" height="110" rx="14" fill="#FFFFFF" stroke={BORD} strokeWidth="4" />
        <path d="M700 440l-14 26 36-26" fill="#FFFFFF" stroke={BORD} strokeWidth="4" strokeLinejoin="round" />
        <path d="M690 360h18l8 20-10 7a40 40 0 0 0 22 22l7-10 20 8v16a8 8 0 0 1-8 8 73 73 0 0 1-73-73 8 8 0 0 1 8-8Z" fill="none" stroke={BORD} strokeWidth="4" />
        <path d="M770 365a22 22 0 0 1 18 18M768 350a36 36 0 0 1 32 32" fill="none" stroke={MIEL} strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* temps 2 : le tarif, fiche à côté de la bulle */}
      <g {...pas(1, 1)}>
        <rect x="640" y="440" width="120" height="150" rx="6" fill="#FFFFFF" stroke={BORD} strokeWidth="4" />
        <path d="M660 470h80M660 495h80M660 520h55" stroke={FER} strokeWidth="4" strokeLinecap="round" />
        <path d="M660 560h80" stroke={MIEL} strokeWidth="6" strokeLinecap="round" />
        <text x="735" y="552" fill={BORD} fontSize="26" fontWeight="700" textAnchor="end" fontFamily="var(--police-texte), system-ui, sans-serif">€</text>
      </g>

      {/* temps 3 : le véhicule devant la maison */}
      <g {...pas(2)}>
        <rect x="170" y="600" width="130" height="80" rx="8" fill="#F8F4EC" stroke={BORD} strokeWidth="5" />
        <path d="M300 625h45l35 35v20h-80z" fill="#F8F4EC" stroke={BORD} strokeWidth="5" strokeLinejoin="round" />
        <rect x="190" y="615" width="50" height="35" rx="3" fill="#CFE2EA" stroke={BORD} strokeWidth="3" />
        <circle cx="215" cy="690" r="18" fill="#2B2A2C" stroke={BORD} strokeWidth="4" />
        <circle cx="345" cy="690" r="18" fill="#2B2A2C" stroke={BORD} strokeWidth="4" />
        {/* caisse de pièces */}
        <rect x="250" y="620" width="40" height="30" rx="3" fill={MIEL} stroke={BORD} strokeWidth="3" />
        <path d="M262 620v-8h16v8" fill="none" stroke={BORD} strokeWidth="3" />
      </g>

      {/* temps 4 : la loupe sur la chaudière */}
      <g {...pas(3, 3)}>
        <circle cx="840" cy="420" r="34" fill="rgba(255,255,255,.55)" stroke={BORD} strokeWidth="5" />
        <path d="M815 445L775 485" stroke={BORD} strokeWidth="9" strokeLinecap="round" />
      </g>

      {/* temps 5 : la clé sur la pièce */}
      <g {...pas(4, 4)}>
        <path d="M818 520l48-48" stroke={BORD} strokeWidth="12" strokeLinecap="round" />
        <path d="M866 472a18 18 0 1 0 14-14l-10 2-6 6 2 6Z" fill="#F8F4EC" stroke={BORD} strokeWidth="5" />
        <circle cx="900" cy="440" r="20" fill="none" stroke={MIEL} strokeWidth="5" strokeDasharray="10 8" />
      </g>

      {/* temps 6 : la coche */}
      <g {...pas(5)}>
        <circle cx="720" cy="300" r="40" fill={MIEL} stroke={BORD} strokeWidth="5" />
        <path d="M700 300l14 14 28-30" fill="none" stroke={BORD} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* étiquettes jaune miel, une par temps */}
      <Etiquette etape={t} k={0} x={690} y={275} texte="Le code erreur, lu au téléphone" vers={[880, 338]} />
      <Etiquette etape={t} k={1} x={560} y={530} texte="Prix annoncé avant de partir" vers={[640, 560]} />
      <Etiquette etape={t} k={2} x={330} y={540} texte="Pièces courantes à bord" vers={[270, 618]} />
      <Etiquette etape={t} k={3} x={700} y={520} texte="Pression, allumage, échangeur" vers={[840, 420]} />
      <Etiquette etape={t} k={4} x={700} y={620} texte="Pièce remplacée" vers={[900, 465]} />
      <Etiquette etape={t} k={5} x={640} y={215} texte="Chauffage et eau chaude vérifiés" vers={[720, 262]} />
    </svg>
  )
}
