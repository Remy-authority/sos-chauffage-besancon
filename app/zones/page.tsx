import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getZones } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { PageHeader } from '@/components/layout/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: `Chauffagiste à ${siteConfig.city} et dans le Grand Besançon, communes desservies`,
  description: `Communes desservies autour de ${siteConfig.city} pour le dépannage de chauffage et l'entretien de chaudière : Saint-Vit, Thise, École-Valentin, Franois et les autres communes de l'agglomération.`,
  path: '/zones',
})

export default function ZonesHub() {
  const zones = getZones()
  const noms = zones.map((z) => z.name)
  const { city, businessName, departmentName, department, serviceArea } = siteConfig

  // Réponse courte factuelle, pensée pour être citable telle quelle (levier GEO).
  const citable = `${businessName} intervient à ${city} (${departmentName}, ${department}) et dans ${zones.length} communes du Grand Besançon : ${noms.join(', ')}. Dépannage de chaudière gaz et fioul, pompe à chaleur, ballon d'eau chaude, radiateurs, et entretien annuel obligatoire. Ligne ouverte ${siteConfig.availability}.`

  const faqHub = [
    {
      q: `Quelles communes couvrez-vous autour de ${city} ?`,
      a: `Nous intervenons à ${city}, dans tous les quartiers, et dans les communes du Grand Besançon qui disposent d'une page dédiée sur ce site : ${noms.join(', ')}. Notre zone réelle est un peu plus large que cette liste : en cas de doute sur votre secteur, appelez-nous, la réponse est immédiate.`,
    },
    {
      q: 'Ma commune ne figure pas dans la liste, intervenez-vous quand même ?',
      a: `Probablement oui. La liste ci-dessus regroupe les communes qui ont une page dédiée, pas les limites de notre déplacement. Nous couvrons ${city} et son agglomération. Le plus simple reste de nous appeler en indiquant votre commune : nous vous disons tout de suite si nous venons.`,
    },
    {
      q: `Le délai est-il plus long en dehors de ${city} ?`,
      a: "Le délai dépend surtout du planning en cours, pas de la distance : les communes de l'agglomération sont à quelques minutes de route. Nous préférons annoncer un créneau réaliste au téléphone plutôt qu'une promesse générique, en particulier pendant les pics de pannes de l'hiver.",
    },
    {
      q: 'Le déplacement dans une commune voisine est-il facturé en plus ?',
      a: `Le tarif annoncé au téléphone couvre l'intervention dans notre zone autour de ${city}. S'il devait exister un supplément lié à un secteur particulièrement éloigné, vous le sauriez avant de nous engager, pas au moment de la facture.`,
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Zone d’intervention"
        title={
          <>
            {city} et les communes
            <br />
            <span className="mot-laiton">du Grand Besançon</span>
          </>
        }
        subtitle={`Nous couvrons ${city} et ${zones.length} communes voisines pour le dépannage de chauffage et l’entretien de chaudière.`}
      />

      <section className="bg-calcaire-neige py-14 lg:py-20">
        <div className="enceinte">
          {/* Réponse courte factuelle, citable hors contexte. */}
          <AnimatedSection className="max-w-colonne rounded-socle border-l-2 border-laiton-franc bg-calcaire-voile p-6 lg:p-8">
            <p className="text-lecture text-fonte-nuit">{citable}</p>
          </AnimatedSection>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-socle border border-calcaire-pierre bg-calcaire-pierre sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone, i) => (
              <AnimatedSection
                key={zone.slug}
                delay={Math.min(i, 5) * 0.04}
                as="li"
                className="bg-calcaire-neige"
              >
                <Link
                  href={`/zones/${zone.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-300 ease-thermique hover:bg-calcaire-voile"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-titre text-titre-s font-medium text-fonte-abysse transition-colors group-hover:text-jura-dense">
                      {zone.name}
                    </span>
                    <span className="chiffre shrink-0 text-legende text-calcaire-ombre">
                      {zone.postalCode}
                    </span>
                  </div>
                  {zone.orientation && (
                    <span className="surtitre mt-2.5 text-laiton-patine">
                      {zone.orientation} de {city}
                    </span>
                  )}
                  {zone.context && (
                    <p className="mt-3.5 flex-1 text-legende leading-relaxed text-calcaire-roche">
                      {zone.context}
                    </p>
                  )}
                  <span className="mt-6 inline-flex items-center gap-2 text-legende font-medium text-jura-dense transition-all duration-300 ease-thermique group-hover:gap-3">
                    Chauffagiste à {zone.name}
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </ul>

          <AnimatedSection className="mt-8 rounded-socle border border-calcaire-pierre bg-calcaire-voile p-7">
            <h2 className="text-titre-s">Et à {city} même</h2>
            <p className="mt-3 max-w-lecture text-lecture text-calcaire-basalte">
              {city} n’a pas de page dédiée : c’est notre ville de base. Nous intervenons dans tous
              les quartiers, de la Boucle aux faubourgs, sur l’habitat ancien comme sur les
              constructions récentes.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {serviceArea.districts.map((quartier) => (
                <li
                  key={quartier}
                  className="inline-flex rounded-module border border-calcaire-pierre bg-calcaire-neige px-3.5 py-2 text-legende text-calcaire-basalte"
                >
                  {quartier}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      <Faq
        items={faqHub}
        eyebrow="Zone d’intervention"
        title={<>Vos questions sur notre secteur</>}
      />

      <CtaBanner />
    </>
  )
}
