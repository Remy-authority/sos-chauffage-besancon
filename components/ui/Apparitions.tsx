'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Apparitions au défilement (mise à jour n°1, 18/10/2026, #R53, #R67 et #R71), posé une fois dans
 * le layout. Chaque bloc de premier niveau de <main> (et tout élément `.vivant`) reçoit
 * `data-anim="pret"` tant qu'il est sous l'écran, puis `data-anim="vu"` quand il entre : le bloc
 * glisse et se fond, ses pictos de chauffagiste se tracent (app/globals.css). Un bloc déjà à
 * l'écran au chargement passe directement à « vu ». Exclus : les récits au défilement
 * (`data-sans-apparition`), qui ont leur propre mouvement, sauf leurs éléments `.vivant`.
 * Sans JavaScript ou avec « réduire les animations » : tout reste affiché et immobile.
 */
export default function Apparitions() {
  const chemin = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cibles = Array.from(
      document.querySelectorAll<HTMLElement>('main > section, main > article, main > div > section, .vivant'),
    ).filter((el) => el.classList.contains('vivant') || !el.closest('[data-sans-apparition]'))

    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue
          ;(e.target as HTMLElement).dataset.anim = 'vu'
          obs.unobserve(e.target)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )
    for (const el of cibles) {
      if (el.dataset.anim === 'vu') continue
      el.dataset.anim = el.getBoundingClientRect().top < window.innerHeight * 0.94 ? 'vu' : 'pret'
      if (el.dataset.anim === 'pret') obs.observe(el)
    }
    // Les pictos bougent en boucle : hors écran, ils s'arrêtent (`data-hors`, app/globals.css).
    const veille = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          const el = e.target as SVGElement
          if (e.isIntersecting) el.removeAttribute('data-hors')
          else el.setAttribute('data-hors', '')
        }
      },
      { rootMargin: '10% 0px 10% 0px' },
    )
    document.querySelectorAll('svg.picto').forEach((el) => veille.observe(el))
    return () => {
      obs.disconnect()
      veille.disconnect()
    }
  }, [chemin])

  return null
}
