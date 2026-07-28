import { AnimatedSection } from '@/components/ui/AnimatedSection'

/**
 * Repères d'une prestation, en bandeau juste sous la réponse courte.
 * Traitement T3 : une rangée de colonnes séparées par des filets, façon plaque
 * signalétique, plutôt que des cartes indépendantes.
 *
 * Depuis que l'en-tête porte la photo de la prestation, ce bandeau est le seul
 * emplacement de l'encadré « Ce qu'il faut retenir » : il garde donc son
 * intitulé, posé sur le fond clair du corps, où rien ne le concurrence.
 */
export function ServiceQuickFacts({ bullets }: { bullets: string[] }) {
  if (!bullets?.length) return null

  return (
    <AnimatedSection delay={0.08} className="mb-12">
      <p className="surtitre text-calcaire-roche">Ce qu’il faut retenir</p>
      <div className="mt-4 grid divide-y divide-calcaire-pierre border-y border-calcaire-pierre sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {bullets.map((repere, i) => (
          <div key={repere} className="px-1 py-5 sm:px-5 sm:first:pl-0 sm:last:pr-0">
            <span className="chiffre block font-titre text-legende text-laiton-patine">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="mt-1.5 block text-[0.9375rem] font-medium leading-snug text-fonte-nuit">
              {repere}
            </span>
          </div>
        ))}
      </div>
    </AnimatedSection>
  )
}

export default ServiceQuickFacts
