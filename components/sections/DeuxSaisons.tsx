import Link from 'next/link'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteConfig } from '@/config/site.config'

/**
 * Les deux saisons du métier, face à face.
 *
 * Le chauffage est une activité franchement saisonnière : l'hiver appelle en
 * urgence, l'été programme son entretien. Plutôt que de masquer cette bascule,
 * la section l'assume et donne à chaque saison son propre traitement visuel, le
 * bloc sombre pour la panne, le bloc clair pour l'entretien.
 */
export function DeuxSaisons() {
  const { urgence, entretien } = siteConfig.parcours

  return (
    <section className="plage bg-calcaire-neige" aria-labelledby="saisons-titre">
      <div className="enceinte">
        <SectionHeader
          id="saisons-titre"
          eyebrow="Deux façons de nous appeler"
          title={
            <>
              L’urgence de janvier,
              <br />
              l’entretien de septembre.
            </>
          }
          subtitle="Ce métier a deux temps, et ils ne se traitent pas pareil. L’un se règle dans la journée, l’autre se programme avant que le froid revienne."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* La panne */}
          <AnimatedSection className="grain relative overflow-hidden rounded-socle bg-fonte-nuit p-8 lg:p-10">
            <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
            <div className="relative flex h-full flex-col">
              <p className="surtitre text-laiton-clair">{urgence.sousTitre}</p>
              <h3 className="mt-4 text-titre-l text-calcaire-neige">{urgence.titre}</h3>
              <p className="mt-5 max-w-lecture text-lecture text-calcaire-brume">{urgence.texte}</p>

              <ul className="mt-8 space-y-0 border-t border-fonte-brut/70">
                {urgence.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 border-b border-fonte-brut/70 py-3.5 text-legende text-calcaire-brume"
                  >
                    <span aria-hidden="true" className="h-px w-5 shrink-0 bg-laiton-franc" />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href={`tel:${siteConfig.phone}`}
                className="chiffre group mt-8 inline-flex items-center gap-2.5 font-titre text-titre-s font-medium text-laiton-clair transition-colors hover:text-laiton-paille"
              >
                <PhoneCall size={19} strokeWidth={2.1} />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </AnimatedSection>

          {/* L'entretien */}
          <AnimatedSection
            delay={0.08}
            className="relative overflow-hidden rounded-socle border border-calcaire-pierre bg-calcaire-voile p-8 lg:p-10"
          >
            <div className="flex h-full flex-col">
              <p className="surtitre text-jura-franc">{entretien.sousTitre}</p>
              <h3 className="mt-4 text-titre-l text-fonte-abysse">{entretien.titre}</h3>
              <p className="mt-5 max-w-lecture text-lecture text-calcaire-basalte">
                {entretien.texte}
              </p>

              <ul className="mt-8 space-y-0 border-t border-calcaire-pierre">
                {entretien.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 border-b border-calcaire-pierre py-3.5 text-legende text-calcaire-basalte"
                  >
                    <span aria-hidden="true" className="h-px w-5 shrink-0 bg-jura-franc" />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Les deux chantiers de la belle saison : l'entretien qui prépare
                  l'hiver, la climatisation réversible qui traite l'été. */}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href="/services/entretien-annuel-chaudiere"
                  className="group inline-flex items-center gap-2.5 font-titre text-titre-s font-medium text-jura-dense transition-colors hover:text-jura-franc"
                >
                  Programmer mon entretien
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 ease-thermique group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/services/climatisation-reversible"
                  className="group inline-flex items-center gap-2 text-legende font-medium text-calcaire-basalte transition-colors hover:text-jura-franc"
                >
                  La climatisation réversible
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 ease-thermique group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default DeuxSaisons
