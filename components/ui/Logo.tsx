import { siteConfig } from '@/config/site.config'

/**
 * Marque du site, template T3.
 *
 * Pictogramme : un cadran gradué dont l'aiguille est montée en température,
 * posé dans une plaque à coins courts. Deux lectures superposées, le thermostat
 * du chauffagiste et le cadran horloger de Besançon, capitale du temps. Aucune
 * flamme : la chaleur est dite par l'aiguille et le laiton, pas par le feu.
 *
 * Le pictogramme est en SVG, le nom en HTML : la typographie du site s'applique
 * donc réellement au mot-symbole.
 */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="6" className="fill-jura-sombre" />

      {/* Arc du cadran */}
      <path
        d="M10.8 25.2 A14 14 0 0 1 37.2 25.2"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="stroke-calcaire-neige/45"
      />

      {/* Graduations */}
      <g strokeWidth="1.8" strokeLinecap="round" className="stroke-calcaire-neige/70">
        <path d="M10.8 25.2 L14.6 26.6" />
        <path d="M15.0 19.3 L17.6 22.3" />
        <path d="M24 16 L24 20" />
      </g>
      <g strokeWidth="1.8" strokeLinecap="round" className="stroke-laiton-clair">
        <path d="M33.0 19.3 L30.4 22.3" />
        <path d="M37.2 25.2 L33.4 26.6" />
      </g>

      {/* Aiguille montée en température */}
      <path
        d="M24 30 L30.3 21"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="stroke-laiton-clair"
      />
      <circle cx="24" cy="30" r="2.4" className="fill-laiton-franc" />
    </svg>
  )
}

/**
 * LOGO EN TEXTE (formulaire court, regle-formulaire.md §3.4, Rémy 13 et 14/11/2026) :
 * une ligne, police des titres (Bricolage Grotesque), en minuscules, le métier
 * « sos chauffage » en 800, la ville en couleur d'accent (laiton). Aucune capitale
 * étirée. 24 px de haut au téléphone, 28 px à l'ordinateur. Le cadran `LogoMark`
 * ne sert plus qu'au favicon. Le nom déclaré à Google ne change pas.
 */
export function Logo({
  tone = 'dark',
  className = '',
  empile = false,
}: {
  /** Pied de page au téléphone : nom centré au pixel (#R53). */
  empile?: boolean
  /** `dark` : texte fonte sur fond clair. `light` : texte calcaire sur fond sombre. */
  tone?: 'dark' | 'light'
  className?: string
}) {
  const clair = tone === 'light'
  return (
    <span
      className={`inline-block whitespace-nowrap font-titre text-[1.25rem] leading-6 tracking-[-0.02em] min-[360px]:text-[1.375rem] lg:text-[1.625rem] lg:leading-7 ${
        empile ? 'text-center lg:text-left' : ''
      } ${className}`}
    >
      <span className={`font-extrabold ${clair ? 'text-calcaire-neige' : 'text-fonte-abysse'}`}>sos chauffage</span>{' '}
      <span className={`font-bold ${clair ? 'text-laiton-clair' : 'text-laiton-patine'}`}>{siteConfig.city.toLowerCase()}</span>
    </span>
  )
}

export default Logo
