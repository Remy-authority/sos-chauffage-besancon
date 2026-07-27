'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Info } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { COURBE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

/**
 * SECTION SIGNATURE, le diagnostic par symptôme.
 *
 * Un appelant ne dit jamais « j'ai besoin d'un désembouage » : il dit « mes
 * radiateurs sont froids ». Cette section part de la plainte réelle, donne la
 * cause probable et le geste utile avant l'intervention, puis renvoie vers la
 * prestation correspondante. Elle porte à elle seule le maillage interne de la
 * home et alimente la citabilité par les moteurs génératifs (chaque réponse est
 * autonome).
 *
 * Aucune promesse de délai, aucun tarif : uniquement du diagnostic.
 */
export function DiagnosticThermique({
  services,
}: {
  services: { slug: string; navTitle: string }[]
}) {
  const [actif, setActif] = useState(0)
  const symptomes = siteConfig.symptomes
  const courant = symptomes[actif]
  const presta = services.find((s) => s.slug === courant.service)

  return (
    <section id="diagnostic" className="plage bg-calcaire-voile" aria-labelledby="diagnostic-titre">
      <div className="enceinte">
        <SectionHeader
          id="diagnostic-titre"
          eyebrow="Diagnostic par symptôme"
          title={
            <>
              Dites ce que fait l’appareil,
              <br />
              <span className="mot-laiton-clair">on vous dit ce que c’est.</span>
            </>
          }
          subtitle="Six situations couvrent la quasi-totalité des appels que nous recevons l’hiver. Choisissez la vôtre : vous saurez ce qu’il faut regarder avant même de décrocher."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Panneau de sélection : une rangée par symptôme */}
          <ul className="lg:col-span-5" role="tablist" aria-label="Symptômes fréquents">
            {symptomes.map((symptome, i) => {
              const choisi = i === actif
              return (
                <li key={symptome.id}>
                  <button
                    type="button"
                    role="tab"
                    id={`symptome-${symptome.id}`}
                    aria-selected={choisi}
                    aria-controls="panneau-diagnostic"
                    onClick={() => setActif(i)}
                    className={`relative flex w-full items-center gap-4 border-b border-calcaire-pierre px-4 py-4 text-left transition-colors duration-300 ease-thermique ${
                      choisi ? 'bg-calcaire-neige' : 'hover:bg-calcaire-neige/70'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-0.5 transition-colors duration-300 ${
                        choisi ? 'bg-laiton-franc' : 'bg-transparent'
                      }`}
                    />
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-module border transition-colors duration-300 ${
                        choisi
                          ? 'border-laiton-franc/50 bg-laiton-franc/10 text-laiton-patine'
                          : 'border-calcaire-brume bg-calcaire-neige text-calcaire-roche'
                      }`}
                    >
                      <ServiceIcon icon={symptome.id} className="h-[1.15rem] w-[1.15rem]" />
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block font-titre text-[1.0625rem] font-medium leading-snug ${
                          choisi ? 'text-fonte-abysse' : 'text-fonte-nuit'
                        }`}
                      >
                        {symptome.plainte}
                      </span>
                      <span className="mt-0.5 block text-legende text-calcaire-roche">
                        {symptome.indice}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className={`shrink-0 transition-all duration-300 ease-thermique ${
                        choisi
                          ? 'translate-x-0 text-laiton-patine opacity-100'
                          : '-translate-x-1 text-calcaire-ombre opacity-0'
                      }`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Panneau de réponse */}
          <div className="lg:col-span-7">
            <div
              id="panneau-diagnostic"
              role="tabpanel"
              aria-labelledby={`symptome-${courant.id}`}
              className="grain relative h-full overflow-hidden rounded-socle border border-calcaire-neige/10 bg-fonte-coulee p-7 lg:p-9"
            >
              <div aria-hidden="true" className="trame-graduee-fine absolute inset-0 opacity-50" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={courant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: COURBE }}
                  className="relative flex h-full flex-col"
                >
                  <p className="surtitre text-laiton-clair">Piste la plus probable</p>

                  <h3 className="mt-4 text-titre-m text-calcaire-neige">{courant.plainte}</h3>

                  <p className="mt-5 max-w-lecture text-lecture text-calcaire-brume">
                    {courant.cause}
                  </p>

                  <p className="mt-6 flex items-start gap-3 rounded-bloc border border-jura-tendre/30 bg-jura-sombre/25 p-4 text-legende leading-relaxed text-calcaire-brume">
                    <Info
                      size={16}
                      strokeWidth={1.9}
                      className="mt-0.5 shrink-0 text-jura-mousse"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="font-semibold text-calcaire-neige">
                        Avant d’appeler.{' '}
                      </span>
                      {courant.geste}
                    </span>
                  </p>

                  {presta && (
                    <Link
                      href={`/services/${presta.slug}`}
                      className="group mt-auto inline-flex items-center gap-2.5 pt-7 font-titre text-[0.9375rem] font-medium text-laiton-clair transition-colors hover:text-laiton-paille"
                    >
                      <span aria-hidden="true" className="h-px w-7 bg-laiton-franc" />
                      {presta.navTitle}
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 ease-thermique group-hover:translate-x-1"
                      />
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiagnosticThermique
