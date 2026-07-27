import type { ReactNode } from 'react'
import { HaloThermique } from '@/components/ui/HaloThermique'

/**
 * En-tête sombre des pages internes. Reprend le traitement du hero (fonte,
 * trame graduée, halo) en version courte : une page commune ou un article
 * restent dans le même monde visuel que l'accueil, au lieu de repartir sur une
 * page neutre. Alignement à gauche par défaut, comme le reste du template.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  children,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  children?: ReactNode
}) {
  const centre = align === 'center'

  return (
    <section className="grain relative overflow-hidden bg-fonte-nuit pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="trame-atelier absolute inset-0" />
      <HaloThermique className="-right-24 -top-20" teinte="jura" taille={480} />
      <HaloThermique className="-bottom-24 left-0" teinte="laiton" taille={340} decalage={-11} />

      <div className={`enceinte relative ${centre ? 'text-center' : 'text-left'}`}>
        <div className={`max-w-colonne ${centre ? 'mx-auto' : ''}`}>
          {eyebrow && (
            <p
              className={`surtitre mb-5 flex items-center gap-3 text-laiton-clair ${
                centre ? 'justify-center' : ''
              }`}
            >
              <span aria-hidden="true" className="h-px w-8 bg-laiton-franc" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-titre-l text-calcaire-neige md:text-titre-xl">{title}</h1>
          {subtitle && (
            <p
              className={`mt-5 max-w-lecture text-chapo text-calcaire-brume ${
                centre ? 'mx-auto' : ''
              }`}
            >
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

export default PageHeader
