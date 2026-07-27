import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { extractNumberedSteps } from '@/lib/text'
import type { ContentBlock } from '@/lib/content'

/**
 * Bloc de contenu d'une page prestation ou commune.
 *
 * Si le corps contient une liste numérotée rédigée en prose (« 1. … 2. … »),
 * elle est rendue en séquence d'étapes plutôt qu'en pavé : le texte reste
 * strictement identique, seule sa mise en forme change.
 *
 * Traitement T3 : les étapes sont des lignes numérotées reliées par un filet
 * vertical, pas des cartes empilées.
 */
export function ServiceBlock({ block, eager = false }: { block: ContentBlock; eager?: boolean }) {
  const etapes = extractNumberedSteps(block.body)

  return (
    <AnimatedSection as="section" className="scroll-mt-28">
      <h2>{block.heading}</h2>

      {etapes ? (
        <>
          {etapes.lead && <p>{etapes.lead}</p>}
          <ol className="mt-7 space-y-0">
            {etapes.steps.map((etape, i) => (
              <li key={etape.slice(0, 32)} className="relative flex gap-5 pb-7 last:pb-0">
                {i < etapes.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[0.9375rem] top-8 h-[calc(100%-1.5rem)] w-px bg-calcaire-pierre"
                  />
                )}
                <span className="chiffre relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-plaque border border-laiton-franc/40 bg-laiton-franc/10 font-titre text-sm font-semibold text-laiton-patine">
                  {i + 1}
                </span>
                <span className="pt-1 text-lecture text-calcaire-basalte">{etape}</span>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p>{block.body}</p>
      )}

      {block.image && (
        <figure className="mt-8">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-bloc border border-calcaire-pierre shadow-pose">
            <Image
              src={block.image}
              alt={block.imageAlt || block.heading}
              fill
              sizes="(min-width: 768px) 704px, 100vw"
              className="object-cover"
              loading={eager ? 'eager' : 'lazy'}
            />
          </div>
          {block.imageCaption && (
            <figcaption className="mt-3 text-legende text-calcaire-roche">
              {block.imageCaption}
            </figcaption>
          )}
        </figure>
      )}
    </AnimatedSection>
  )
}

export default ServiceBlock
