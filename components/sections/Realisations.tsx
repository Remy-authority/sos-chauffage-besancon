import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HaloThermique } from '@/components/ui/HaloThermique'
import { siteConfig } from '@/config/site.config'

/**
 * Galerie de réalisations.
 *
 * Posée sur fond fonte : sur un site où l'essentiel des sections est clair, le
 * sombre isole les photos et leur rend leur densité. Chaque visuel porte sa
 * légende en clair sous l'image plutôt qu'en surimpression, pour ne jamais faire
 * dépendre la lisibilité du contraste de la photo.
 *
 * ⚠️ Les légendes décrivent un TYPE d'intervention. Aucun client, aucune commune,
 * aucune date : rien d'invérifiable ne doit apparaître sous une photo.
 */
export function Realisations({
  titre,
  sousTitre,
  images = siteConfig.realisations,
}: {
  titre?: string
  sousTitre?: string
  images?: readonly {
    readonly image: string
    readonly legende: string
    readonly alt: string
  }[]
}) {
  if (!images.length) return null

  return (
    <section
      id="realisations"
      className="grain relative overflow-hidden bg-fonte-nuit"
      aria-labelledby="realisations-titre"
    >
      <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-60" />
      <HaloThermique className="-left-28 top-1/4" teinte="jura" taille={460} />
      <HaloThermique className="-right-24 bottom-0" teinte="laiton" taille={340} decalage={-10} />

      <div className="enceinte relative plage">
        <SectionHeader
          id="realisations-titre"
          variant="dark"
          eyebrow="Interventions"
          title={titre ?? <>À quoi ressemble le travail</>}
          subtitle={
            sousTitre ??
            'Des interventions courantes, photographiées telles quelles. Les légendes disent le type de chantier, rien de plus : nous ne mettons ni nom de client, ni adresse sous une photo.'
          }
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((realisation, i) => (
            <AnimatedSection
              key={realisation.image}
              as="li"
              delay={Math.min(i, 5) * 0.05}
              className="group"
            >
              <figure>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-bloc border border-calcaire-neige/10">
                  <Image
                    src={realisation.image}
                    alt={realisation.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-thermique group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3.5 flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-px w-5 shrink-0 bg-laiton-franc transition-all duration-300 ease-thermique group-hover:w-8"
                  />
                  <span className="text-legende leading-relaxed text-calcaire-brume">
                    {realisation.legende}
                  </span>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Realisations
