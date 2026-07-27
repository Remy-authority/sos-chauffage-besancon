'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { COURBE } from '@/lib/motion'
import type { FaqItem } from '@/lib/content'

/**
 * Accordéon de FAQ, template T3.
 *
 * Traitement : des lignes séparées par un filet, pas des cartes flottantes. La
 * question ouverte se signale par un liseré laiton à gauche et un index numéroté
 * qui passe en laiton, dans l'esprit d'un tableau de relevés.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [ouvert, setOuvert] = useState<number | null>(0)

  return (
    <AnimatedSection className="mt-12 border-t border-calcaire-pierre">
      {items.map((item, idx) => {
        const actif = ouvert === idx
        return (
          <div
            key={item.q}
            className={`border-b border-calcaire-pierre transition-colors duration-300 ${
              actif ? 'bg-calcaire-voile' : 'bg-transparent hover:bg-calcaire-voile/60'
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOuvert(actif ? null : idx)}
                aria-expanded={actif}
                className="relative flex w-full items-start gap-5 px-5 py-6 text-left lg:px-7"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-0.5 transition-colors duration-300 ${
                    actif ? 'bg-laiton-franc' : 'bg-transparent'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`chiffre mt-0.5 shrink-0 font-titre text-sm transition-colors duration-300 ${
                    actif ? 'text-laiton-patine' : 'text-calcaire-ombre'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-titre text-titre-s font-medium text-fonte-abysse">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-plaque border transition-all duration-300 ${
                    actif
                      ? 'rotate-45 border-laiton-franc bg-laiton-franc text-fonte-abysse'
                      : 'border-calcaire-brume text-calcaire-roche'
                  }`}
                >
                  <Plus size={14} strokeWidth={2.4} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {actif && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: COURBE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-lecture px-5 pb-7 pl-[3.4rem] text-lecture text-calcaire-basalte lg:px-7 lg:pl-[3.9rem]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </AnimatedSection>
  )
}

export default FaqAccordion
