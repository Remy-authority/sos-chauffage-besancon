import type { ReactNode } from 'react'
import { AnimatedSection } from './AnimatedSection'

/**
 * En-tête de section, template T3.
 *
 * Signature typographique du site : le surtitre est précédé d'un trait de
 * graduation en laiton, le titre est aligné à gauche par défaut (le centrage
 * reste possible mais n'est plus la norme, contrairement aux templates
 * précédents), et le chapô est tenu dans une largeur de lecture stricte.
 */
type Props = {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  variant?: 'light' | 'dark'
  as?: 'h1' | 'h2'
  id?: string
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  variant = 'light',
  as: Balise = 'h2',
  id,
  className = '',
}: Props) {
  const sombre = variant === 'dark'
  const centre = align === 'center'

  return (
    <AnimatedSection
      className={`max-w-colonne ${centre ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <p
          className={`surtitre mb-5 flex items-center gap-3 ${
            centre ? 'justify-center' : ''
          } ${sombre ? 'text-laiton-clair' : 'text-laiton-patine'}`}
        >
          <span aria-hidden="true" className="h-px w-8 bg-laiton-franc" />
          {eyebrow}
        </p>
      )}

      <Balise
        id={id}
        className={`text-titre-l md:text-titre-xl ${
          sombre ? 'text-calcaire-neige' : 'text-fonte-abysse'
        }`}
      >
        {title}
      </Balise>

      {subtitle && (
        <p
          className={`mt-5 max-w-lecture text-chapo ${centre ? 'mx-auto' : ''} ${
            sombre ? 'text-calcaire-brume' : 'text-calcaire-basalte'
          }`}
        >
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  )
}

export default SectionHeader
