import type { Metadata } from 'next'
import { Clock, Mail, MapPin, PhoneCall } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { PageHeader } from '@/components/layout/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { LeadForm } from '@/components/ui/LeadForm'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Faq } from '@/components/ui/Faq'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { getServices } from '@/lib/content'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Contacter un chauffagiste à Besançon, dépannage 7j/7',
  description: `Chaudière en panne, plus d’eau chaude ou entretien à prévoir. Joignez ${siteConfig.businessName} par téléphone ou formulaire, à ${siteConfig.city} et dans le Grand Besançon.`,
  path: '/contact',
})

const COORDONNEES = [
  {
    icone: PhoneCall,
    intitule: 'Téléphone',
    valeur: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone}`,
  },
  { icone: Mail, intitule: 'Email', valeur: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icone: Clock, intitule: 'Disponibilité', valeur: siteConfig.availability },
  {
    icone: MapPin,
    intitule: 'Zone',
    valeur: `${siteConfig.city} et les communes du Grand Besançon`,
  },
]

export default function ContactPage() {
  const services = getServices()
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Dites-nous ce que
            <br />
            <span className="mot-laiton">fait votre installation</span>
          </>
        }
        subtitle="Par téléphone si le chauffage est à l’arrêt, par le formulaire si cela peut attendre quelques heures."
      />

      <section className="bg-calcaire-neige py-14 lg:py-20">
        <div className="enceinte grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <AnimatedSection>
              <h2 className="text-titre-m">Nous joindre</h2>
              <p className="mt-4 max-w-lecture text-lecture text-calcaire-basalte">
                Une panne de chauffage se décrit mal par écrit. Si le logement est froid, appelez,
                c’est plus rapide. Nous vous indiquons tout de suite ce qu’il faut vérifier en
                attendant, code erreur, pression du circuit, position du thermostat.
              </p>
            </AnimatedSection>

            <AnimatedSection
              delay={0.08}
              className="mt-8 divide-y divide-calcaire-pierre border-y border-calcaire-pierre"
            >
              {COORDONNEES.map(({ icone: Icone, intitule, valeur, href }) => (
                <div key={intitule} className="flex items-start gap-4 py-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-module border border-calcaire-brume text-jura-franc">
                    <Icone size={18} strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <p className="surtitre text-calcaire-roche">{intitule}</p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1.5 block break-all font-medium text-fonte-abysse transition-colors hover:text-jura-dense"
                      >
                        {valeur}
                      </a>
                    ) : (
                      <p className="mt-1.5 font-medium text-fonte-abysse">{valeur}</p>
                    )}
                  </div>
                </div>
              ))}
            </AnimatedSection>

            <AnimatedSection delay={0.16} className="mt-8">
              <Button
                href={`tel:${siteConfig.phone}`}
                variant="laiton"
                size="ample"
                className="w-full"
              >
                <PhoneCall size={18} strokeWidth={2.2} />
                Appeler maintenant
              </Button>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-7">
            <div id="formulaire" className="scroll-mt-28">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="plage bg-calcaire-voile" aria-labelledby="contact-prestations-titre">
        <div className="enceinte">
          <div className="mx-auto max-w-lecture text-center">
            <p className="surtitre text-jura-franc">Ce que nous dépannons</p>
            <h2 id="contact-prestations-titre" className="mt-3 text-titre-m">
              Dites-nous quel appareil est en cause
            </h2>
            <p className="mt-4 text-lecture text-calcaire-basalte">
              Chaque prestation a sa page, avec les pannes fréquentes et les prix pratiqués.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="vivant">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-center gap-4 rounded-module border border-calcaire-pierre bg-calcaire-neige p-4 transition-colors hover:border-jura-franc"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-module bg-jura-mousse text-jura-dense">
                    <ServiceIcon icon={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1 font-titre text-base font-semibold text-fonte-abysse">
                    {s.navTitle}
                  </span>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-calcaire-roche transition-transform group-hover:translate-x-1 group-hover:text-jura-dense"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq
        items={siteConfig.contactFaq as unknown as { q: string; a: string }[]}
        eyebrow="Avant d’appeler"
        title={<>Les questions qu’on nous pose avant de venir</>}
      />

      <CtaBanner />
    </>
  )
}
