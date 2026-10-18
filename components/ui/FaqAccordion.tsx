import type { FaqItem } from '@/lib/content'
import { paragraphes } from '@/lib/text'

/**
 * Accordéon FAQ en <details>/<summary> (mise à jour n°1, 18/10/2026) : les
 * réponses sont dans le HTML servi (Google et les IA les lisent), fermées par
 * défaut (le texte visible reste court, #R67), ouverture sans script.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-10 border-t border-calcaire-pierre">
      {items.map((it, i) => (
        <details key={it.q} className="faq-item group border-b border-calcaire-pierre">
          <summary className="relative flex cursor-pointer list-none items-center gap-4 py-5 pl-5 pr-4 text-left transition-colors duration-300 group-open:bg-calcaire-voile lg:pl-7 lg:pr-6">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-laiton-franc opacity-0 transition-opacity group-open:opacity-100" />
            <span className="chiffre font-titre text-sm text-laiton-patine">{String(i + 1).padStart(2, '0')}</span>
            <span className="flex-1 font-titre text-titre-s font-medium text-fonte-abysse">{it.q}</span>
            <span
              aria-hidden="true"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-plaque border border-calcaire-pierre text-fonte-abysse transition-transform duration-300 group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M8 2.5v11M2.5 8h11" />
              </svg>
            </span>
          </summary>
          <div className="bg-calcaire-voile px-5 pb-7 pl-[3.4rem] lg:px-7 lg:pl-[3.9rem]">
            <div className="max-w-lecture space-y-3 text-lecture text-calcaire-basalte">
              {paragraphes(it.a).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  )
}

export default FaqAccordion
