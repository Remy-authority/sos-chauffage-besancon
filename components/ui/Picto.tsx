import type { CSSProperties } from 'react'

/**
 * Pictos DESSINÉS du métier (mise à jour n°1, 18/10/2026, #R53, #R67, #R71).
 *
 * Jamais une icône de bibliothèque sur l'accueil : chaque picto est tracé pour le
 * chauffage et S'ANIME à l'apparition (le cadre `.trait` se dessine une fois), puis
 * rejoue un geste en boucle (flamme qui respire, aiguille qui tourne, devis qui
 * s'écrit…). Les classes d'animation et leur arrêt hors écran sont dans
 * app/globals.css ; `components/ui/Apparitions.tsx` pose `data-anim` et `data-hors`.
 * Grille 24 x 24, trait 1,5, `currentColor`.
 */
export type PictoNom =
  | 'flamme'
  | 'radiateur'
  | 'goutte'
  | 'ecran'
  | 'manometre'
  | 'onde'
  | 'alerte'
  | 'telephone'
  | 'cle'
  | 'camion'
  | 'devis'
  | 'horloge'
  | 'ventilateur'
  | 'ballon'
  | 'chaudiere'
  | 'fioul'
  | 'eclair'
  | 'desembouage'
  | 'entretien'
  | 'remplacement'
  | 'climatisation'
  | 'local'
  | 'loupe'

type Props = {
  nom: PictoNom
  className?: string
  /** Décalage du tracé initial, « 0.3s » par exemple. */
  delai?: string
}

const centre: CSSProperties = { transformOrigin: '50% 50%' }
const bas: CSSProperties = { transformOrigin: '50% 100%' }

function i(n: number): CSSProperties {
  return { ['--i' as string]: n }
}

const DESSINS: Record<PictoNom, JSX.Element> = {
  flamme: (
    <>
      <path className="trait" d="M12 2.5c1 3.2 4.6 5.6 4.6 10a4.6 4.6 0 0 1-9.2 0c0-2 .8-3.6 1.7-4.7.3 1.3 1 2.3 1.9 2.7C11.3 8 11.6 5.2 12 2.5Z" />
      <path className="respire" style={bas} d="M12 12.8c.9 1.1 1.9 2 1.9 3.4a1.9 1.9 0 0 1-3.8 0c0-1.4 1-2.3 1.9-3.4Z" />
      <path className="trait" d="M7 21.5h10" />
    </>
  ),
  radiateur: (
    <>
      <path className="trait" d="M3.5 9.5h17v9h-17zM6.5 9.5v9M10.2 9.5v9M13.8 9.5v9M17.5 9.5v9M6 18.5v2M18 18.5v2" />
      <path className="apparait" d="M8 6.5c0-1 .8-1 .8-2M12 6.5c0-1 .8-1 .8-2M16 6.5c0-1 .8-1 .8-2" />
    </>
  ),
  goutte: (
    <>
      <path className="trait" d="M2.5 6.5h19M9 4.5v4M15 4.5v4M12 6.5v2.5" />
      <path className="descend" d="M12 11.5c-1.6 2.4-3 3.9-3 5.8a3 3 0 0 0 6 0c0-1.9-1.4-3.4-3-5.8Z" />
    </>
  ),
  ecran: (
    <>
      <path className="trait" d="M5.5 2.5h13a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-17a1 1 0 0 1 1-1ZM7.5 5.5h9v5h-9zM8 14h3M8 17h5" />
      <path className="clignote" d="M9.5 7h2M9.5 9h1.5M13.5 7h1.5v2h-1.5" />
    </>
  ),
  manometre: (
    <>
      <path className="trait" d="M12 3.5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17ZM12 6v1.5M6 12h1.5M16.5 12H18M7.8 7.8l1 1M16.2 7.8l-1 1" />
      <path className="serre" style={bas} d="M12 12L15.6 8.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <path className="trait" d="M9 21.5h6" />
    </>
  ),
  onde: (
    <>
      <path className="trait" d="M4.5 9.5h4l4-3v11l-4-3h-4z" />
      <path className="apparait" d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10" />
    </>
  ),
  alerte: (
    <>
      <path className="trait" d="M12 3.5 2.8 19.5h18.4L12 3.5Z" />
      <path className="clignote" d="M12 9.5v4.5M12 16.5v.5" strokeWidth="2" />
    </>
  ),
  telephone: (
    <>
      <path className="trait" d="M5.2 3.5h3l1.6 4-2 1.5a10 10 0 0 0 5.2 5.2l1.5-2 4 1.6v3a2 2 0 0 1-2 2A15 15 0 0 1 3.2 5.5a2 2 0 0 1 2-2Z" />
      <path className="apparait" d="M15 4.5a5 5 0 0 1 4.5 4.5M15.5 1.5a8 8 0 0 1 7 7" />
    </>
  ),
  cle: (
    <>
      <g className="serre" style={centre}>
        <path className="trait" d="M14.5 9.5 20 4a4.5 4.5 0 0 1-5.5 5.5L6 18a2 2 0 1 1-2.8-2.8L11.7 6.7A4.5 4.5 0 0 1 17 1.3l-4 4 1.5 3.4Z" />
      </g>
      <path className="trait" d="M4 21.5h16" />
    </>
  ),
  camion: (
    <>
      <g className="glisse-court">
        <path className="trait" d="M2.5 7.5h11v9h-11zM13.5 10.5h4.5l3.5 3.5v2.5h-8zM4.5 9.5h4v3h-4z" />
        <circle className="trait" cx="6.5" cy="17.5" r="1.8" />
        <circle className="trait" cx="17.5" cy="17.5" r="1.8" />
      </g>
      <path className="trait" d="M2 20.5h20" />
    </>
  ),
  devis: (
    <>
      <path className="trait" d="M6.5 2.5h8l4 4v15h-12zM14.5 2.5v4h4" />
      <path className="ecrit" style={i(0)} d="M9 10.5h6" />
      <path className="ecrit" style={i(1)} d="M9 13.5h6" />
      <path className="ecrit" style={i(2)} d="M9 16.5h4" />
      <path className="ecrit" style={i(3)} d="M15.5 17.5c.3-.6.3-.9 0-1.2" />
    </>
  ),
  horloge: (
    <>
      <path className="trait" d="M12 3a9 9 0 1 1 0 18a9 9 0 0 1 0-18ZM12 5v1.5M19 12h-1.5M12 19v-1.5M5 12h1.5" />
      <path className="tourne" d="M12 12V7" strokeWidth="1.8" />
      <path d="M12 12l3 2" strokeWidth="1.8" />
      <circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  ventilateur: (
    <>
      <path className="trait" d="M3.5 5.5h17v13h-17zM3.5 15.5h17" />
      <g className="tourne" style={centre}>
        <path d="M12 10.5c0-2-1.2-3-2.2-3 .3 1.6 1 2.6 2.2 3ZM12 10.5c2 0 3-1.2 3-2.2-1.6.3-2.6 1-3 2.2ZM12 10.5c0 2 1.2 3 2.2 3-.3-1.6-1-2.6-2.2-3ZM12 10.5c-2 0-3 1.2-3 2.2 1.6-.3 2.6-1 3-2.2Z" />
      </g>
      <circle cx="12" cy="10.5" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  ballon: (
    <>
      <path className="trait" d="M7.5 3.5h9a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1ZM6.5 8.5h11M6.5 15.5h11M9.5 20.5v1.5M14.5 20.5v1.5" />
      <path className="respire" style={bas} d="M12 10.5c.7.9 1.4 1.6 1.4 2.6a1.4 1.4 0 0 1-2.8 0c0-1 .7-1.7 1.4-2.6Z" />
    </>
  ),
  chaudiere: (
    <>
      <path className="trait" d="M6.5 2.5h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1ZM8 5.5h8v3H8zM9 20.5v1.5M15 20.5v1.5" />
      <path className="respire" style={bas} d="M12 11c1 1.3 2.1 2.3 2.1 3.8a2.1 2.1 0 0 1-4.2 0C9.9 13.3 11 12.3 12 11Z" />
    </>
  ),
  fioul: (
    <>
      <path className="trait" d="M4.5 8.5h15a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2ZM9 8.5V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5M19.5 12h-3" />
      <path className="descend" d="M6.5 11.3c-.8 1.2-1.4 1.9-1.4 2.8a1.4 1.4 0 0 0 2.8 0c0-.9-.6-1.6-1.4-2.8Z" />
      <path className="trait" d="M6 20.5h12" />
    </>
  ),
  eclair: (
    <>
      <path className="trait" d="M13.5 2.5 6 13.5h5l-1 8 7.5-11h-5l1-8Z" />
      <path className="apparait" d="M18.5 5.5l1.5-1.5M19.5 9h2M4 9H2M4.5 5.5 3 4" />
    </>
  ),
  desembouage: (
    <>
      <path className="trait" d="M2.5 8.5h19M2.5 15.5h19M5 8.5v7M19 8.5v7" />
      <g className="glisse">
        <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11.2" r=".8" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="12.8" r=".9" fill="currentColor" stroke="none" />
      </g>
    </>
  ),
  entretien: (
    <>
      <path className="trait" d="M12 2.5 4.5 5.5v6c0 4.5 3.2 7.8 7.5 9.5 4.3-1.7 7.5-5 7.5-9.5v-6L12 2.5Z" />
      <path className="ecrit" style={i(0)} d="M8.5 12 11 14.5l4.5-5" strokeWidth="1.8" />
    </>
  ),
  remplacement: (
    <>
      <g className="tourne" style={centre}>
        <path className="trait" d="M19 12a7 7 0 0 1-12 5M5 12a7 7 0 0 1 12-5" />
        <path className="trait" d="M17 4v3.5h-3.5M7 20v-3.5h3.5" />
      </g>
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  climatisation: (
    <>
      <path className="trait" d="M2.5 5.5h19a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1ZM5 10.5h14M16.5 8h2.5" />
      <path className="descend" d="M7 16.5c1 1.2 1 2.3 0 3.5M12 16.5c1 1.2 1 2.3 0 3.5M17 16.5c1 1.2 1 2.3 0 3.5" />
    </>
  ),
  local: (
    <>
      <path className="trait" d="M2.5 21.5h19M4 21.5v-7l3-2v9M9 21.5V9l4-2.5v15M15 21.5V12l5-1.5v11" />
      <path className="rebond" d="M8 2a3 3 0 0 1 3 3c0 2-3 5-3 5S5 7 5 5a3 3 0 0 1 3-3Z" />
    </>
  ),
  loupe: (
    <>
      <path className="trait" d="M10.5 3.5a7 7 0 1 1 0 14a7 7 0 0 1 0-14ZM15.5 15.5 21 21" />
      <g className="balaie">
        <path d="M7.5 10.5a3 3 0 0 1 3-3" />
      </g>
    </>
  ),
}

export function Picto({ nom, className = 'h-7 w-7', delai }: Props) {
  const style: CSSProperties | undefined = delai ? ({ ['--d' as string]: delai } as CSSProperties) : undefined
  return (
    <svg
      className={`picto shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
    >
      {DESSINS[nom]}
    </svg>
  )
}

export default Picto
