import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { HeroChaudiere } from '@/components/sections/HeroChaudiere'
import { Symptomes } from '@/components/sections/Symptomes'
import { SequenceIntervention } from '@/components/sections/SequenceIntervention'
import { PrestationsEmpilees } from '@/components/sections/PrestationsEmpilees'
import { PourquoiNous } from '@/components/sections/PourquoiNous'
import { CarteGrandBesancon } from '@/components/sections/CarteGrandBesancon'
import { LeadForm } from '@/components/ui/LeadForm'
import { Faq } from '@/components/ui/Faq'

const TITRE_ACCUEIL = 'Urgence chaudière Besançon, dépannage chauffage 7j/7'
const DESCRIPTION_ACCUEIL =
  'Chaudière en panne, radiateurs froids, plus d’eau chaude à Besançon ? Chauffagiste 7j/7, tarif annoncé avant de venir, pièces courantes à bord.'

export const metadata: Metadata = buildMetadata({
  title: TITRE_ACCUEIL,
  description: DESCRIPTION_ACCUEIL,
  path: '/',
})

/**
 * Accueil, mise à jour n°1 du 18/10/2026 (kickoff « 10 chantiers »).
 *
 * Ordre : 1 bloc 1 scrollytelling (la chaudière qui s'ouvre), 2 symptômes,
 * 3 déroulé du dépannage au défilement, 4 prestations une par une, 5 pourquoi nous,
 * 6 carte dessinée du Grand Besançon, 7 FAQ fermée, 8 formulaire de fin (#R71).
 * Moins de 800 mots visibles (#R67), aucune personne fictive, aucun chiffre inventé.
 */
export default function HomePage() {
  const services = getServices()
  const zones = getZones()

  return (
    <>
      <HeroChaudiere />
      <Symptomes services={services.map((s) => ({ slug: s.slug, navTitle: s.navTitle }))} />
      <SequenceIntervention />
      <PrestationsEmpilees services={services} />
      <PourquoiNous />
      <CarteGrandBesancon zones={zones} />

      <Faq
        items={siteConfig.homeFaq as unknown as { q: string; a: string }[]}
        subtitle={`Urgence, entretien, tarifs, code erreur ou odeur de gaz, ce qu’on nous demande le plus à ${siteConfig.city}.`}
      />

      <section id="devis" className="plage bg-calcaire-voile" aria-labelledby="devis-titre">
        <div className="enceinte grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Centré au téléphone et à la tablette, comme la carte du formulaire ; à gauche sur ordinateur. */}
          <div className="mx-auto max-w-xl text-center lg:col-span-5 lg:mx-0 lg:max-w-none lg:text-left">
            <p className="surtitre mb-5 flex items-center justify-center gap-3 text-laiton-patine lg:justify-start">
              <span aria-hidden="true" className="h-px w-8 bg-laiton-franc" />
              Décrire ma panne
            </p>
            <h2 id="devis-titre" className="text-titre-l text-fonte-abysse md:text-titre-xl">
              Votre appareil,
              <br />
              nous vous rappelons.
            </h2>
            <p className="mt-5 text-chapo text-calcaire-basalte">
              Choisissez l’appareil, dites ce qu’il fait, laissez votre numéro. Pour une urgence,
              l’appel reste le plus rapide.
            </p>
          </div>
          <div className="mx-auto w-full max-w-xl lg:col-span-7 lg:max-w-none">
            <LeadForm idPrefix="fin-" />
          </div>
        </div>
      </section>
    </>
  )
}
