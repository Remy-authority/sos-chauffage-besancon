import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { HeroChauffe } from '@/components/sections/HeroChauffe'
import { DiagnosticThermique } from '@/components/sections/DiagnosticThermique'
import { DeuxSaisons } from '@/components/sections/DeuxSaisons'
import { PrestationsReleve } from '@/components/sections/PrestationsReleve'
import { Realisations } from '@/components/sections/Realisations'
import { ParcAppareils } from '@/components/sections/ParcAppareils'
import { HiverComtois } from '@/components/sections/HiverComtois'
import { QuiIntervient } from '@/components/sections/QuiIntervient'
import { CarteZones } from '@/components/sections/CarteZones'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LeadForm } from '@/components/ui/LeadForm'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'

const TITRE = `Dépannage chauffage et chaudière à ${siteConfig.city}, urgence 24h/24`
const DESCRIPTION = `Chauffagiste à ${siteConfig.city} et dans le Grand Besançon : panne de chaudière gaz ou fioul, radiateurs froids, plus d'eau chaude, pompe à chaleur, entretien annuel obligatoire. Ligne ouverte 7j/7, tarif annoncé avant intervention.`

export const metadata: Metadata = buildMetadata({
  title: TITRE,
  description: DESCRIPTION,
  path: '/',
})

/**
 * Accueil, template T3.
 *
 * Enchaînement propre au métier du chauffage, et volontairement distinct des
 * autres templates du portefeuille : on ouvre sur le TRIAGE (panne ou
 * entretien), on enchaîne sur le DIAGNOSTIC par symptôme, puis seulement après
 * viennent les prestations. L'ancrage local (hiver comtois, bâti bisontin) est
 * traité en section pleine, pas en encart.
 *
 * La preuve arrive en deux temps : les RÉALISATIONS juste après les prestations
 * (ce que donne le travail), puis QUI INTERVIENT après l'ancrage local (à qui on
 * confie sa chaudière). Les deux sections sombres de la page, réalisations et
 * hiver comtois, restent séparées par une section claire.
 */
export default function HomePage() {
  const services = getServices()
  const zones = getZones()
  const navServices = services.map((s) => ({ slug: s.slug, navTitle: s.navTitle }))

  return (
    <>
      <HeroChauffe />
      <DiagnosticThermique services={navServices} />
      <DeuxSaisons />
      <PrestationsReleve services={services} />
      <Realisations />
      <ParcAppareils />
      <HiverComtois />
      <QuiIntervient />
      <CarteZones zones={zones} />

      <section id="devis" className="plage bg-calcaire-neige" aria-labelledby="devis-titre">
        <div className="enceinte grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeader
              id="devis-titre"
              eyebrow="Décrire ma situation"
              title={
                <>
                  Trois questions,
                  <br />
                  et nous vous rappelons.
                </>
              }
              subtitle="Plus vous êtes précis sur ce que fait l’appareil et depuis quand, plus l’estimation au téléphone sera juste. Pour une urgence, l’appel reste le plus rapide."
            />
          </div>
          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>
      </section>

      <Faq
        items={siteConfig.homeFaq as unknown as { q: string; a: string }[]}
        subtitle={`Urgence, obligation d’entretien, tarifs, code erreur, odeur de gaz : les questions qui reviennent le plus souvent à ${siteConfig.city}.`}
      />

      <CtaBanner />
    </>
  )
}
