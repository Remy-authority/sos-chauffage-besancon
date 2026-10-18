import { getImageProps } from 'next/image'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { Button } from '@/components/ui/Button'
import { LeadForm } from '@/components/ui/LeadForm'
import HeroChaudiereSequence from '@/components/sections/HeroChaudiereSequence'
import {
  BANDE_MOBILE,
  GRILLE_ORDI,
  PHOTO_BLOC1,
  QUALITE_BLOC1,
  TAILLES_BLOC1,
  VOILE_MOBILE,
  VOILE_ORDI,
} from '@/components/sections/chaudiere-reglages'

/**
 * Bloc 1, « la chaudière qui s'ouvre » (mise à jour n°1, 18/10/2026, plan validé par Rémy).
 *
 * ÉCRAN 1 : une seule photo, une chaudière gaz murale finie dans la cuisine d'une maison.
 * Ordinateur : la photo en fond plein cadre, le texte à gauche et le formulaire noir à étapes à
 * droite, tous deux centrés en hauteur, la chaudière entre les deux. Téléphone et tablette : la
 * photo couvre tout le premier écran (bande centrée sur la chaudière), sur-titre, titre, texte et
 * boutons posés dessus, centrés entre l'en-tête et la barre du bas, jamais de bandeau noir ; le
 * formulaire vient après. Au défilement, HeroChaudiereSequence prend le relais (avancée vers la
 * chaudière, façade qui s'ouvre, les pièces une à une). « Réduire les animations » : ce bloc tel
 * quel, puis l'écorché complet, fixe, dessous.
 */

/** GIF transparent de 1 px : la source « rien à charger » des <picture> ci-dessous. */
const RIEN = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/**
 * Photo du bloc 1 pour UN format d'écran : un <picture> dont la source pour l'autre format est
 * vide, le navigateur ne télécharge que la photo affichée.
 */
function PhotoBloc1({ mobile }: { mobile: boolean }) {
  const { props } = getImageProps({
    src: mobile ? BANDE_MOBILE.src : PHOTO_BLOC1.src,
    alt: PHOTO_BLOC1.alt,
    fill: true,
    priority: true,
    sizes: mobile ? TAILLES_BLOC1.mobile : TAILLES_BLOC1.ordi,
    quality: QUALITE_BLOC1,
  })
  return (
    <picture>
      <source media={mobile ? '(min-width: 1024px)' : '(max-width: 1023px)'} srcSet={RIEN} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...props} className="object-cover object-center" />
    </picture>
  )
}

/**
 * Titre et accroche, deux lignes chacun à toute largeur (#R70) : une ligne par <span> insécable,
 * taille en cqi (largeur de la colonne). La requête d'argent « urgence chaudière Besançon » est
 * dans le H1.
 */
const TITRE = [
  <>Urgence chaudière à Besançon</>,
  <>
    Dépannage chauffage <span className="mot-laiton">24h/24</span>
  </>,
]
const ACCROCHE = ['La panne se cerne au téléphone.', 'Le tarif est annoncé avant de venir.']

/**
 * Pictos de la réassurance, dessinés pour le chauffage, trait fin : le devis qui s'écrit, le
 * combiné avec l'onde du diagnostic, le repère posé sur la ville, l'horloge de l'urgence. Les
 * traits se tracent une fois à l'apparition (classe `trait`, Apparitions.tsx), le geste du métier
 * rejoue en boucle (`ecrit`, `apparait`, `rebond`, `tourne`).
 */
const REASSURANCE = [
  {
    nom: 'devis',
    lignes: ['Devis annoncé', 'avant d’intervenir'],
    dessin: (
      <>
        <path className="trait" d="M6 3h8.5L19 7.5V21H6z" />
        <path className="trait" d="M14.5 3v4.5H19" />
        <path className="ecrit" d="M9 12h6" style={{ ['--i' as string]: 0 }} />
        <path className="ecrit" d="M9 15.5h4" style={{ ['--i' as string]: 1 }} />
        <path className="ecrit" d="m9.5 18.5 1.6 1.4 2.4-2.6" style={{ ['--i' as string]: 2 }} />
      </>
    ),
  },
  {
    nom: 'telephone',
    lignes: ['Diagnostic', 'dès l’appel'],
    dessin: (
      <>
        <path
          className="trait"
          d="M5.5 4.5 8 4l2 4.5-2 1.5c.9 2.6 2.5 4.6 5 6l1.5-2 4.5 2-.5 2.5c-.3 1.3-1.4 2-2.7 1.8C9.6 19.2 4.8 14.4 3.7 8.2 3.5 6.9 4.2 5.1 5.5 4.5z"
        />
        <path className="apparait" d="M14.5 4.5a5 5 0 0 1 5 5" style={{ ['--d' as string]: '0s' }} />
        <path className="apparait" d="M14.5 1.5a8 8 0 0 1 8 8" style={{ ['--d' as string]: '0.5s' }} />
      </>
    ),
  },
  {
    nom: 'local',
    lignes: ['Chauffagiste', 'du Grand Besançon'],
    dessin: (
      <>
        <path className="trait" d="M3 20.5h18" />
        <path className="trait" d="M4.5 20.5v-6l3-2.5v8.5M9.5 20.5V9l3-2.5v14M14.5 20.5v-5.5l3-2.5v8" />
        <path className="rebond" d="M19.5 9.5s-2.6-2.3-2.6-4.4a2.6 2.6 0 0 1 5.2 0c0 2.1-2.6 4.4-2.6 4.4z" />
        <circle className="rebond" cx="19.5" cy="5.1" r="0.8" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    nom: 'urgence',
    lignes: ['Urgence 7j/7,', 'week-ends compris'],
    dessin: (
      <>
        <circle className="trait" cx="12" cy="13" r="8" />
        <path className="trait" d="M9.5 2.5h5M12 2.5v2.5" />
        <path className="tourne" d="M12 13V8.5" style={{ ['--d' as string]: '0s' }} />
        <path d="M12 13l3 2" />
      </>
    ),
  },
] as const

function PictoReassurance({ dessin }: { dessin: React.ReactNode }) {
  return (
    <svg
      className="picto h-7 w-7 shrink-0 text-laiton-clair"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      {dessin}
    </svg>
  )
}

export function HeroChaudiere() {
  /* Réassurance : une grille 2 x 2 nette, un picto du métier dessiné, chaque libellé coupé en
     deux lignes à un endroit choisi. Ordinateur : sous les boutons ; téléphone et tablette :
     après le formulaire, centré. */
  const reassurance = (classe: string) => (
    <ul
      className={`grid grid-cols-2 gap-x-4 gap-y-5 text-[13px] leading-snug text-calcaire-neige sm:text-sm lg:gap-x-6 ${classe}`}
      role="list"
    >
      {REASSURANCE.map(({ nom, lignes, dessin }, i) => (
        <li
          key={nom}
          className="entree flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:gap-3 md:text-left"
          style={{ ['--decal' as string]: `${0.1 + i * 0.12}s`, ['--d' as string]: `${i * 0.15}s` }}
        >
          <PictoReassurance dessin={dessin} />
          <span aria-label={lignes.join(' ')}>
            {lignes.map((l) => (
              <span key={l} aria-hidden="true" className="block whitespace-nowrap">
                {l}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  )

  /* Colonne texte, partagée par la version fixe et la séquence : centrée au téléphone et à la
     tablette (posée sur la photo), à gauche sur ordinateur. */
  const texte = (
    <div className="enceinte w-full lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center [container-type:inline-size] lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-laiton-clair [text-shadow:0_1px_8px_rgb(0_0_0_/_0.5)] sm:text-xs sm:tracking-[0.18em]">
          <span className="hidden h-px w-8 shrink-0 bg-laiton-clair/70 lg:block" aria-hidden="true" />
          Chauffagiste à {siteConfig.city}, ligne ouverte {siteConfig.availability}
        </p>

        <h1
          id="titre-hero"
          className="mt-4 font-titre text-[min(7.4cqi,2.75rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-calcaire-neige [text-shadow:0_2px_16px_rgb(0_0_0_/_0.45)] lg:mt-5 lg:text-[min(7.4cqi,3.1rem)]"
        >
          {TITRE.map((ligne, i) => (
            <span key={i} className="block whitespace-nowrap">
              {i > 0 && <span className="sr-only"> </span>}
              {ligne}
            </span>
          ))}
        </h1>

        <p className="mt-4 text-[min(4.9cqi,1.125rem)] leading-relaxed text-calcaire-neige/95 [text-shadow:0_1px_10px_rgb(0_0_0_/_0.5)] lg:mt-5 lg:text-[min(3.5cqi,1.125rem)]">
          {ACCROCHE.map((l) => (
            <span key={l} className="block whitespace-nowrap">
              {l}
            </span>
          ))}
        </p>

        <div className="mt-7 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <Button href={`tel:${siteConfig.phone}`} variant="laiton" size="ample" className="chiffre whitespace-nowrap">
            <Phone size={18} strokeWidth={2.1} aria-hidden="true" />
            {siteConfig.phoneDisplay}
          </Button>
          <Button href="#demande" variant="verre" size="ample" className="whitespace-nowrap max-lg:hidden">
            Décrire ma panne
          </Button>
        </div>

        {/* Téléphone et tablette : la question du formulaire dès l'ouverture (règle du 13/10/2026),
            elle s'efface avec le titre au défilement, et reste posée dans le repli sans animation. */}
        <div data-carte-ecran1="" className="mt-5 w-full max-w-md text-left lg:hidden">
          <LeadForm ecran1 />
        </div>

        {reassurance('vivant mt-8 hidden w-full max-w-[30rem] border-t border-calcaire-neige/15 pt-6 lg:grid')}
      </div>
    </div>
  )

  const formulaire = (
    <div className="w-full">
      <div className="enceinte lg:max-w-none lg:px-0">
        <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <LeadForm variante="compact" />
        </div>
        {reassurance('vivant mx-auto mt-8 w-full max-w-lg border-t border-calcaire-neige/15 pt-6 lg:hidden')}
      </div>
    </div>
  )

  /* Téléphone et tablette : la photo couvre tout le premier écran, le texte est centré entre
     l'en-tête (64 px) et la barre du bas (72 px, téléphone seul). */
  /* Même cadre que le départ de la séquence animée (HeroChaudiereSequence) : la photo commence
     sous l'en-tête (69 px téléphone et tablette, 65 px ordinateur, hauteurs mesurées le
     18/10/2026), la séquence remplace cette version au premier geste sans que l'écran bouge. */
  const versionA = (
    <section
      id="haut"
      data-sans-apparition=""
      className="relative isolate bg-fonte-nuit pt-[69px] lg:pt-[65px]"
      aria-labelledby="titre-hero"
    >
      <div className="relative isolate overflow-hidden lg:flex lg:min-h-[max(calc(100vh-65px),640px)] lg:items-center lg:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" aria-hidden="true">
        <PhotoBloc1 mobile={false} />
        <div className={`absolute inset-0 ${VOILE_ORDI}`} />
      </div>
      <div className={`relative ${GRILLE_ORDI}`}>
        <div className="relative isolate flex min-h-[max(calc(100svh-69px),540px)] flex-col justify-center pb-[calc(72px+1.5rem)] pt-6 md:pb-6 lg:col-start-1 lg:min-h-0 lg:p-0">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden" aria-hidden="true">
            <PhotoBloc1 mobile />
            <div className={`absolute inset-0 ${VOILE_MOBILE}`} />
          </div>
          {texte}
        </div>
        <div id="demande" className="scroll-mt-20 pb-10 pt-8 lg:col-start-3 lg:flex lg:flex-col lg:justify-center lg:p-0">
          {formulaire}
        </div>
      </div>
      </div>
    </section>
  )

  return <HeroChaudiereSequence versionA={versionA} texte={texte} formulaire={formulaire} />
}

export default HeroChaudiere
