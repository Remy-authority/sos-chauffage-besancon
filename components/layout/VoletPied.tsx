'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Colonne du pied de page : volet fermé au téléphone (#R47), colonne ouverte sur
 * ordinateur avec une ligne de titre de hauteur FIXE pour que les titres et les
 * premiers liens de toutes les colonnes s'alignent au pixel à 1440 px (#R69).
 */
export function VoletPied({ titre, plus, children }: { titre: string; plus?: ReactNode; children: ReactNode }) {
  const [ouvert, setOuvert] = useState(false)
  const id = `pied-${titre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <div className="border-b border-calcaire-neige/10 lg:border-0">
      <div className="lg:mb-4 lg:flex lg:h-4 lg:items-center lg:justify-between lg:gap-4">
        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-controls={id}
          className="surtitre flex w-full items-center justify-center gap-2 py-3.5 leading-none text-laiton-clair lg:pointer-events-none lg:w-auto lg:py-0"
        >
          {titre}
          <ChevronDown size={14} className={`transition-transform lg:hidden ${ouvert ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {plus && <span className="hidden text-legende leading-none lg:inline">{plus}</span>}
      </div>
      <div id={id} className={`${ouvert ? 'block' : 'hidden'} pb-4 text-center lg:block lg:pb-0 lg:text-left`}>{children}</div>
    </div>
  )
}

export default VoletPied
