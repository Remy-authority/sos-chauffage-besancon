import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import type { Service } from '@/lib/content'

/**
 * Les huit prestations, en relevé.
 *
 * Traitement volontairement à contre-courant de la grille de cartes : une table
 * de rangées numérotées, dense et lisible, qui donne à la section l'allure d'une
 * fiche d'appareillage. Chaque rangée porte son numéro d'ordre, son
 * pictogramme, son intitulé et sa ligne de résumé.
 */
export function PrestationsReleve({ services }: { services: Service[] }) {
  return (
    <section
      id="prestations"
      className="plage bg-calcaire-voile"
      aria-labelledby="prestations-titre"
    >
      <div className="enceinte">
        <SectionHeader
          id="prestations-titre"
          eyebrow="Ce que nous prenons en charge"
          title={
            <>
              Huit interventions,
              <br />
              un seul métier.
            </>
          }
          subtitle="Le chauffage et l’eau chaude sanitaire, du dépannage d’urgence au remplacement d’appareil. Rien d’autre : nous ne faisons ni plomberie générale, ni électricité, ni climatisation seule."
        />

        <div className="mt-12 border-t border-calcaire-brume">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={Math.min(i, 4) * 0.04}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex items-start gap-4 border-b border-calcaire-brume px-2 py-6 transition-colors duration-300 ease-thermique hover:bg-calcaire-neige sm:gap-6 sm:px-4"
              >
                <span className="chiffre hidden pt-3 font-titre text-legende text-calcaire-ombre transition-colors group-hover:text-laiton-patine sm:block">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-module border border-calcaire-brume bg-calcaire-neige text-jura-franc transition-colors duration-300 group-hover:border-laiton-franc/50 group-hover:bg-laiton-franc/10 group-hover:text-laiton-patine">
                  <ServiceIcon icon={service.icon} className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-titre text-titre-s font-medium text-fonte-abysse transition-colors group-hover:text-jura-dense">
                    {service.navTitle}
                  </span>
                  <span className="mt-1.5 block max-w-lecture text-legende leading-relaxed text-calcaire-roche">
                    {service.metaDescription}
                  </span>
                </span>

                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="mt-3 shrink-0 text-calcaire-ombre transition-all duration-300 ease-thermique group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-laiton-patine"
                />
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PrestationsReleve
