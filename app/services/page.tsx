import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getServices } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { PageHeader } from '@/components/layout/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Prestations de chauffage à Besançon, dépannage et entretien',
  description:
    'Nos prestations à Besançon : dépannage de chaudière gaz et fioul, chauffe-eau, pompe à chaleur, désembouage, entretien annuel, remplacement, climatisation.',
  path: '/services',
})

/** Hub des prestations (créé à la mise à jour n°1, 18/10/2026) : cible du « Voir toutes les prestations » des menus. */
export default function ServicesHub() {
  const services = getServices()
  const { city } = siteConfig

  const faqHub = [
    {
      q: 'Quelle prestation choisir si je ne sais pas ce qui est en panne ?',
      a: `Appelez-nous et décrivez ce que vous constatez : radiateurs froids, plus d’eau chaude, code erreur, bruit, odeur. Nous cernons la panne au téléphone et nous vous disons quelle intervention est nécessaire, avec son tarif, avant de venir.`,
    },
    {
      q: 'Intervenez-vous sur toutes les marques de chaudières ?',
      a: `Nous dépannons les chaudières gaz et fioul murales et au sol des grandes marques présentes à ${city}, ainsi que les pompes à chaleur air-eau et les chauffe-eau électriques. Au téléphone, donnez-nous la marque et le modèle lus sur l’appareil : nous confirmons tout de suite.`,
    },
    {
      q: 'Le dépannage et l’entretien sont-ils facturés au même prix ?',
      a: 'Non. L’entretien annuel est une visite planifiée à prix fixe. Le dépannage dépend de la panne et des pièces à remplacer ; le tarif est annoncé avant l’intervention et détaillé sur notre page des tarifs.',
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Nos prestations"
        title={
          <>
            Dépannage, entretien et remplacement
            <br />
            <span className="mot-laiton">du chauffage à {city}</span>
          </>
        }
        subtitle={`Neuf prestations, une seule équipe de chauffagistes à ${city}. Le tarif est annoncé avant de venir.`}
      />

      <section className="bg-calcaire-neige py-14 lg:py-20">
        <div className="enceinte">
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimatedSection key={service.slug} as="li" delay={i * 0.04} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-plaque border border-calcaire-pierre bg-calcaire-voile p-6 transition-colors hover:border-laiton-franc/60"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-module bg-fonte-abysse text-laiton-clair">
                      <ServiceIcon icon={service.icon} className="h-6 w-6" />
                    </span>
                    <span className="chiffre text-legende text-calcaire-ombre">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <h2 className="mt-5 font-titre text-titre-s font-medium text-fonte-nuit">{service.navTitle}</h2>
                  <p className="mt-2 flex-1 text-legende leading-6 text-calcaire-basalte">{service.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-legende font-medium text-jura-dense transition-all duration-300 ease-thermique group-hover:gap-3">
                    Voir la prestation
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </ol>
          <p className="mt-10 max-w-lecture text-lecture text-calcaire-basalte">
            Chaque intervention est annoncée avec son prix avant notre venue. Les fourchettes par prestation sont sur{' '}
            <Link href="/tarifs" className="font-medium text-jura-dense underline decoration-laiton-franc decoration-2 underline-offset-4">
              la page des tarifs
            </Link>
            .
          </p>
        </div>
      </section>

      <Faq items={faqHub} eyebrow="Nos prestations" title={<>Vos questions sur nos interventions</>} />
      <CtaBanner />
    </>
  )
}
