import type { Metadata } from 'next'
import { Clock, Mail, MapPin, PhoneCall } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { PageHeader } from '@/components/layout/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { LeadForm } from '@/components/ui/LeadForm'
import { CtaBanner } from '@/components/ui/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Contact et demande d’intervention',
  description: `Contactez ${siteConfig.businessName} pour un dépannage de chauffage ou un entretien de chaudière à ${siteConfig.city} et dans le Grand Besançon. Ligne ouverte 7j/7.`,
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
                Une panne de chauffage se décrit mal par écrit. Si le logement est froid, appelez :
                c’est plus rapide, et nous pouvons vous indiquer tout de suite ce qu’il faut
                vérifier en attendant, code erreur, pression du circuit, position du thermostat.
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

      <CtaBanner />
    </>
  )
}
