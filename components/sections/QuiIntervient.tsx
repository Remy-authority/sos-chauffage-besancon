import Image from 'next/image'
import { PhoneCall } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteConfig } from '@/config/site.config'
import { depuisGauche } from '@/lib/motion'

/**
 * « Qui intervient chez vous », l'artisan derrière le site.
 *
 * Le portrait est traité comme une plaque : cadre net, coins courts, filet
 * laiton en débord, à l'opposé du portrait rond détouré des sites de service.
 * Le parcours est raconté en étapes numérotées, jamais en années : la règle du
 * projet interdit tout chiffre d'expérience, et le récit par étapes dit la même
 * chose sans rien avancer d'invérifiable.
 */
export function QuiIntervient() {
  const { persona, phone, phoneDisplay, city } = siteConfig
  const prenom = persona.nom.split(' ')[0]

  return (
    <section id="artisan" className="plage bg-calcaire-neige" aria-labelledby="artisan-titre">
      <div className="enceinte">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <AnimatedSection variants={depuisGauche} className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-socle border border-calcaire-pierre bg-calcaire-voile">
                <Image
                  src={persona.photo}
                  alt={persona.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Cartouche d'identité, en débord sur le bas du portrait */}
              <div className="relative -mt-12 ml-6 mr-10 rounded-bloc border-l-2 border-laiton-franc bg-fonte-nuit p-5 shadow-releve">
                <p className="font-titre text-titre-s font-semibold text-calcaire-neige">
                  {persona.nom}
                </p>
                <p className="surtitre mt-2 text-laiton-clair">
                  {persona.role} · {city}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Récit */}
          <div className="lg:col-span-7">
            <SectionHeader
              id="artisan-titre"
              eyebrow="Qui intervient chez vous"
              title={
                <>
                  {persona.accroche},
                  <br />
                  <span className="mot-laiton-clair">du téléphone au chantier.</span>
                </>
              }
              subtitle={`Pas de standard, pas de mise en relation revendue au premier disponible. Vous décrivez la panne à ${prenom}, et c’est ${prenom} qui se déplace.`}
            />

            <AnimatedSection delay={0.08} className="mt-10">
              <blockquote className="border-l-2 border-laiton-franc pl-6">
                <p className="font-titre text-titre-s font-medium leading-snug text-fonte-abysse">
                  {persona.citation}
                </p>
              </blockquote>
            </AnimatedSection>

            {/* Parcours, en étapes et jamais en années */}
            <ol className="mt-10 border-t border-calcaire-pierre">
              {persona.parcours.map((etape, i) => (
                <AnimatedSection
                  key={etape.titre}
                  as="li"
                  delay={0.1 + i * 0.06}
                  className="flex gap-5 border-b border-calcaire-pierre py-5"
                >
                  <span className="chiffre shrink-0 pt-0.5 font-titre text-legende text-laiton-patine">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-medium">{etape.titre}</h3>
                    <p className="mt-1.5 max-w-lecture text-legende leading-relaxed text-calcaire-roche">
                      {etape.texte}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </ol>

            <AnimatedSection delay={0.24} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={`tel:${phone}`}
                className="chiffre group inline-flex items-center gap-2.5 font-titre text-titre-s font-medium text-jura-dense transition-colors hover:text-jura-franc"
              >
                <PhoneCall size={18} strokeWidth={2.1} />
                {phoneDisplay}
              </a>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-legende text-calcaire-roche">
                {persona.engagements.map((engagement) => (
                  <li key={engagement} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-px w-4 shrink-0 bg-laiton-franc" />
                    {engagement}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuiIntervient
