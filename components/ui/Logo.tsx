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
 * étirée. Le cadran `LogoMark` ne sert plus qu'au favicon. Le nom déclaré à Google
 * ne change pas.
 *
 * Le texte est posé dans un SVG (modèle abri-anti-atomique.fr) : 24 px de haut au
 * téléphone, 28 px à l'ordinateur, mesurables par le contrôle de design (point 1),
 * et un viewBox serré sur les lettres (252 px mesurés à 22 px dans la police du site)
 * pour que le pied de page le centre au pixel (#R53). Sous 360 px, 22 px de haut.
 */
export function Logo({
  tone = 'dark',
  className = '',
}: {
  /** `dark` : texte fonte sur fond clair. `light` : texte calcaire sur fond sombre. */
  tone?: 'dark' | 'light'
  className?: string
}) {
  const clair = tone === 'light'
  return (
    <svg
      viewBox="0 0 253 24"
      overflow="visible"
      aria-hidden="true"
      focusable="false"
      className={`block h-[22px] w-auto font-titre min-[360px]:h-6 lg:h-7 ${className}`}
    >
      <text x="0" y="18.5" fontSize="22" letterSpacing="-0.44">
        <tspan fontWeight="800" className={clair ? 'fill-calcaire-neige' : 'fill-fonte-abysse'}>
          sos chauffage
        </tspan>
        <tspan fontWeight="700" className={clair ? 'fill-laiton-clair' : 'fill-laiton-patine'}>
          {' '}
          {siteConfig.city.toLowerCase()}
        </tspan>
      </text>
    </svg>
  )
}

export default Logo
