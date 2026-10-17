'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const PRINCIPALES = new Set(['besancon', 'saint-vit', 'thise', 'ecole-valentin', 'miserey-salines', 'avanne-aveney'])

/** Liste des communes à côté de la carte : six au téléphone, toutes sur ordinateur. */
export function ListeCommunes({ communes }: { communes: { slug: string; name: string; postalCode: string }[] }) {
  const [tout, setTout] = useState(false)
  const cachees = communes.filter((c) => !PRINCIPALES.has(c.slug)).length
  return (
    <div className="lg:flex lg:flex-col lg:justify-center">
      <ul id="liste-communes" className="divide-y divide-calcaire-pierre border-y border-calcaire-pierre">
        {communes.map((c) => (
          <li key={c.slug} className={PRINCIPALES.has(c.slug) || tout ? 'list-item' : 'hidden lg:list-item'}>
            <Link href={`/zones/${c.slug}`} className="group flex items-baseline justify-between gap-4 py-2.5 transition-colors hover:text-laiton-patine">
              <span className="font-titre text-lecture font-medium text-fonte-abysse group-hover:text-laiton-patine">{c.name}</span>
              <span className="chiffre text-legende text-calcaire-basalte">{c.postalCode}</span>
            </Link>
          </li>
        ))}
      </ul>
      {cachees > 0 && (
        <button
          type="button"
          onClick={() => setTout((v) => !v)}
          aria-expanded={tout}
          aria-controls="liste-communes"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-laiton-patine lg:hidden"
        >
          {tout ? 'Réduire la liste' : `Voir les ${cachees} autres communes`}
          <ChevronDown size={16} className={`transition-transform ${tout ? 'rotate-180' : ''}`} />
        </button>
      )}
      <Link href="/zones" className="mt-5 hidden text-sm font-semibold text-fonte-abysse underline decoration-laiton-franc decoration-2 underline-offset-4 lg:inline-block">
        Toutes les communes couvertes
      </Link>
    </div>
  )
}

export default ListeCommunes
