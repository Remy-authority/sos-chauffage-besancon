import type { ReactNode } from 'react'

/**
 * Témoin « ligne ouverte » : une diode laiton qui respire dans une étiquette à
 * coins courts. Marqueur de disponibilité du hero, du pied de page et des
 * bandeaux d'appel. Le clignotement reprend la respiration lente du template
 * (`animate-braise-douce`) plutôt qu'un ping nerveux.
 */
export function LiveDot({
  children,
  tone = 'dark',
  className = '',
}: {
  children: ReactNode
  /** `dark` : posé sur fond sombre. `light` : posé sur fond clair. */
  tone?: 'dark' | 'light'
  className?: string
}) {
  const sombre = tone === 'dark'
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-module border px-3.5 py-2 text-legende font-medium ${
        sombre
          ? 'border-laiton-franc/35 bg-laiton-franc/10 text-laiton-clair'
          : 'border-laiton-franc/40 bg-laiton-franc/10 text-laiton-patine'
      } ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-braise-douce rounded-jauge bg-laiton-franc" />
        <span className="relative inline-flex h-2 w-2 rounded-jauge bg-laiton-clair" />
      </span>
      {children}
    </span>
  )
}

export default LiveDot
