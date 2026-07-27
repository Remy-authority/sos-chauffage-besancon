import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

/**
 * Bouton unique du site, template T3.
 *
 * Silhouette : rectangle à coins courts (`rounded-module`), pas de pilule. Le
 * survol ne grossit pas le bouton, il l'enfonce très légèrement et allume un
 * liseré, comme un contacteur d'appareillage.
 *
 * Règle de couleur T3 : `laiton` est réservé à l'ACTION (appel, envoi de
 * demande). `jura` porte les actions secondaires et la structure.
 */
type Variante = 'laiton' | 'jura' | 'verre' | 'trait'
type Taille = 'compact' | 'normal' | 'ample'

const socle =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-module font-medium tracking-tight transition-all duration-300 ease-thermique focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laiton-franc focus-visible:ring-offset-2 focus-visible:ring-offset-calcaire-neige disabled:pointer-events-none disabled:opacity-50'

const variantes: Record<Variante, string> = {
  laiton:
    'bg-laiton-franc text-fonte-abysse shadow-halo-laiton hover:bg-laiton-clair hover:translate-y-px active:translate-y-0.5',
  jura:
    'bg-jura-dense text-calcaire-neige shadow-halo-jura hover:bg-jura-franc hover:translate-y-px active:translate-y-0.5',
  verre:
    'border border-calcaire-neige/20 bg-calcaire-neige/[0.07] text-calcaire-neige backdrop-blur-sm hover:border-laiton-franc/60 hover:bg-calcaire-neige/[0.12]',
  trait:
    'border border-fonte-abysse/25 bg-transparent text-fonte-abysse hover:border-fonte-abysse hover:bg-fonte-abysse hover:text-calcaire-neige',
}

const tailles: Record<Taille, string> = {
  compact: 'h-10 px-4 text-sm',
  normal: 'h-12 px-6 text-[0.9375rem]',
  ample: 'h-14 px-7 text-base',
}

type Commun = {
  variant?: Variante
  size?: Taille
  children: ReactNode
  className?: string
}

type ProprietesLien = Commun & ComponentProps<'a'> & { href: string }
type ProprietesBouton = Commun & ComponentProps<'button'> & { href?: undefined }

export function Button(props: ProprietesLien | ProprietesBouton) {
  const { variant = 'laiton', size = 'normal', children, className = '', ...reste } = props
  const styles = `${socle} ${variantes[variant]} ${tailles[size]} ${className}`

  if ('href' in props && props.href) {
    const externe = /^(https?:|tel:|mailto:)/.test(props.href)
    if (externe) {
      return (
        <a className={styles} {...(reste as ComponentProps<'a'>)}>
          {children}
        </a>
      )
    }
    const { href, ...resteLien } = reste as ComponentProps<'a'>
    void href
    return (
      <Link href={props.href} className={styles} {...resteLien}>
        {children}
      </Link>
    )
  }

  return (
    <button className={styles} {...(reste as ComponentProps<'button'>)}>
      {children}
    </button>
  )
}

export default Button
