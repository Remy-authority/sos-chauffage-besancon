import Link from 'next/link'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LiveDot } from '@/components/ui/LiveDot'
import { HaloThermique } from '@/components/ui/HaloThermique'
import { JaugeThermique } from '@/components/ui/JaugeThermique'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { siteConfig } from '@/config/site.config'

/**
 * Ouverture de l'accueil.
 *
 * Le parti pris T3 est le TRIAGE : dès le premier écran, le visiteur choisit
 * entre les deux entrées réelles du métier, la panne qui ne peut pas attendre et
 * l'entretien qu'on programme. C'est ce qui remplace le couple hero + bandeau de
 * réassurance des templates précédents. À droite, la jauge thermique, composant
 * signature du site.
 */
export function HeroChauffe() {
  const { urgence, entretien } = siteConfig.parcours

  return (
    <section
      id="haut"
      className="grain relative isolate overflow-hidden bg-fonte-nuit pb-16 pt-28 lg:pb-24 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgb(var(--c-fonte-brut)/0.85),transparent_58%),linear-gradient(180deg,rgb(var(--c-fonte-nuit))_0%,rgb(var(--c-fonte-coulee))_58%,rgb(var(--c-fonte-abysse))_100%)]"
      />
      <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-80" />
      <div aria-hidden="true" className="trame-atelier absolute inset-0" />
      <HaloThermique className="-left-40 top-10" teinte="jura" taille={560} />
      <HaloThermique className="-right-28 top-1/3" teinte="laiton" taille={420} decalage={-13} />

      <div className="enceinte relative grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <AnimatedSection>
            <LiveDot>Ligne ouverte week-ends et jours fériés</LiveDot>
          </AnimatedSection>

          <AnimatedSection delay={0.06}>
            <h1 className="mt-7 text-[clamp(2.5rem,6.2vw,4.75rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-calcaire-neige">
              Plus de chauffage
              <br />
              à {siteConfig.city} ?
              <br />
              <span className="mot-laiton">On remet en chauffe.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <p className="mt-7 max-w-lecture text-chapo text-calcaire-brume">
              Chaudière gaz ou fioul à l’arrêt, radiateurs froids, plus d’eau chaude, pompe à
              chaleur qui décroche par grand froid. Nous dépannons le chauffage à {siteConfig.city}{' '}
              et dans le Grand Besançon, et nous assurons l’entretien annuel obligatoire.
            </p>
          </AnimatedSection>

          {/* Triage : les deux entrées réelles du métier */}
          <AnimatedSection delay={0.18} className="mt-9 grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${siteConfig.phone}`}
              className="group relative overflow-hidden rounded-bloc border border-laiton-franc/45 bg-laiton-franc/[0.09] p-5 transition-all duration-300 ease-thermique hover:border-laiton-franc hover:bg-laiton-franc/15"
            >
              <span className="surtitre text-laiton-clair">{urgence.sousTitre}</span>
              <span className="mt-3 flex items-center gap-2.5 font-titre text-titre-s font-medium text-calcaire-neige">
                <PhoneCall size={19} strokeWidth={2.1} className="text-laiton-clair" />
                {urgence.titre}
              </span>
              <span className="chiffre mt-2 block text-legende text-calcaire-brume">
                {siteConfig.phoneDisplay}
              </span>
            </a>

            <Link
              href="/services/entretien-annuel-chaudiere"
              className="group relative overflow-hidden rounded-bloc border border-calcaire-neige/10 bg-calcaire-neige/[0.04] p-5 transition-all duration-300 ease-thermique hover:border-jura-tendre/60 hover:bg-calcaire-neige/[0.07]"
            >
              <span className="surtitre text-jura-mousse">{entretien.sousTitre}</span>
              <span className="mt-3 flex items-center gap-2.5 font-titre text-titre-s font-medium text-calcaire-neige">
                {entretien.titre}
                <ArrowRight
                  size={17}
                  className="text-jura-mousse transition-transform duration-300 ease-thermique group-hover:translate-x-1"
                />
              </span>
              <span className="mt-2 block text-legende text-calcaire-brume">
                Obligation légale annuelle
              </span>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.24} className="mt-9">
            <Button href="/contact#formulaire" variant="verre" size="normal">
              Décrire ma situation en ligne
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </AnimatedSection>
        </div>

        {/* Composant signature */}
        <div className="lg:col-span-5 lg:pl-6">
          <div className="rounded-socle border border-calcaire-neige/10 bg-fonte-abysse/45 p-6 backdrop-blur-sm lg:p-7">
            <p className="surtitre text-calcaire-ombre">Comment ça se passe</p>
            <p className="mt-3 font-titre text-titre-s font-medium text-calcaire-neige">
              Du logement à l’arrêt au confort rétabli
            </p>
            <JaugeThermique className="mt-7 h-[19rem]" />
          </div>
        </div>
      </div>

      {/* Bandeau de repères, tous vérifiables sur le site lui-même */}
      <div className="enceinte relative mt-14 lg:mt-20">
        <div aria-hidden="true" className="filet-laiton" />
        <ul className="grid divide-y divide-fonte-brut/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            { valeur: '24h/24', libelle: 'Ligne urgence' },
            { valeur: '7j/7', libelle: 'Week-ends et fériés' },
            { valeur: '8', libelle: 'Prestations chauffage' },
            { valeur: '13', libelle: 'Communes couvertes' },
          ].map((repere) => (
            <li key={repere.libelle} className="px-0 py-5 sm:px-6 sm:first:pl-0 lg:last:pr-0">
              <p className="chiffre font-titre text-titre-m font-semibold text-laiton-clair">
                {repere.valeur}
              </p>
              <p className="mt-1 text-legende text-calcaire-ombre">{repere.libelle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HeroChauffe
