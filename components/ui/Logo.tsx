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
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-titre text-[1.0625rem] font-semibold tracking-tight ${
            clair ? 'text-calcaire-neige' : 'text-fonte-abysse'
          }`}
        >
          SOS Chauffage
        </span>
        <span
          className={`surtitre mt-1.5 ${
            clair ? 'text-laiton-clair' : 'text-laiton-patine'
          }`}
        >
          {siteConfig.city} · {siteConfig.departmentName}
        </span>
      </span>
    </span>
  )
}

export default Logo
