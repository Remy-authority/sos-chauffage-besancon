'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  CircleAlert,
  Fan,
  Flame,
  Fuel,
  Gauge,
  ThermometerSnowflake,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { COURBE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

type Etape = 1 | 2 | 3

interface Champs {
  probleme: string
  ville: string
  urgence: string
  nom: string
  telephone: string
  email: string
  message: string
}

/** Les huit situations qui couvrent la quasi-totalité des appels chauffage. */
const SITUATIONS: { id: string; label: string; Icone: LucideIcon }[] = [
  { id: 'Chaudière gaz en panne', label: 'Chaudière gaz', Icone: Flame },
  { id: 'Chaudière fioul en panne', label: 'Chaudière fioul', Icone: Fuel },
  { id: 'Radiateurs froids', label: 'Radiateurs froids', Icone: ThermometerSnowflake },
  { id: "Plus d'eau chaude", label: 'Plus d’eau chaude', Icone: Bath },
  { id: 'Pompe à chaleur en panne', label: 'Pompe à chaleur', Icone: Fan },
  { id: 'Chauffage électrique', label: 'Chauffage électrique', Icone: Zap },
  { id: 'Entretien annuel à programmer', label: 'Entretien annuel', Icone: Gauge },
  { id: 'Autre situation', label: 'Autre situation', Icone: CircleAlert },
]

const URGENCES = ['C’est urgent', 'Dans la journée', 'Cette semaine', 'Je planifie']

function Jauge({ etape }: { etape: Etape }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-1 gap-1.5">
        {([1, 2, 3] as Etape[]).map((e) => (
          <span
            key={e}
            className={`h-1 flex-1 rounded-jauge transition-all duration-500 ease-thermique ${
              e < etape
                ? 'bg-laiton-patine'
                : e === etape
                  ? 'bg-laiton-franc'
                  : 'bg-calcaire-neige/15'
            }`}
          />
        ))}
      </div>
      <span className="surtitre chiffre shrink-0 text-calcaire-ombre">
        {etape} / 3
      </span>
    </div>
  )
}

const classeChamp =
  'w-full rounded-module border border-calcaire-neige/15 bg-calcaire-neige/[0.05] px-4 py-3 text-calcaire-neige placeholder:text-calcaire-roche transition-colors focus:border-laiton-franc focus:outline-none focus:ring-2 focus:ring-laiton-franc/25'
const classeEtiquette = 'mb-1.5 block text-legende font-medium text-calcaire-brume'

const variantesEtape = {
  entree: { opacity: 0, x: 16 },
  centre: { opacity: 1, x: 0 },
  sortie: { opacity: 0, x: -16 },
}

export function LeadForm() {
  const [etape, setEtape] = useState<Etape>(1)
  const [champs, setChamps] = useState<Champs>({
    probleme: '',
    ville: '',
    urgence: '',
    nom: '',
    telephone: '',
    email: '',
    message: '',
  })
  const [statut, setStatut] = useState<'repos' | 'envoi' | 'erreur'>('repos')

  function definir<K extends keyof Champs>(cle: K, valeur: Champs[K]) {
    setChamps((prec) => ({ ...prec, [cle]: valeur }))
  }

  async function envoyer() {
    setStatut('envoi')
    try {
      const reponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...champs, company: '' }),
      })
      if (!reponse.ok) throw new Error()
      window.location.href = '/merci'
    } catch {
      setStatut('erreur')
    }
  }

  const boutonSuivant =
    'inline-flex min-h-[48px] items-center gap-2 rounded-module px-6 text-sm font-semibold transition-all duration-300 ease-thermique'

  return (
    <div
      className="grain relative overflow-hidden rounded-socle border border-calcaire-neige/10 bg-fonte-coulee p-6 shadow-releve md:p-9"
      role="region"
      aria-label="Formulaire de demande"
    >
      <div aria-hidden="true" className="trame-graduee-fine absolute inset-0 opacity-60" />

      <div className="relative">
        {/* Piège à robots, invisible pour les humains. */}
        <div className="hidden" aria-hidden="true">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" readOnly />
        </div>

        <Jauge etape={etape} />

        <AnimatePresence mode="wait">
          {etape === 1 && (
            <motion.div
              key="etape1"
              variants={variantesEtape}
              initial="entree"
              animate="centre"
              exit="sortie"
              transition={{ duration: 0.28, ease: COURBE }}
            >
              <h2 className="mt-7 text-titre-m text-calcaire-neige">
                Qu’est-ce qui ne chauffe plus ?
              </h2>
              <p className="mt-2 text-legende text-calcaire-ombre">
                Choisissez la situation la plus proche de la vôtre.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {SITUATIONS.map(({ id, label, Icone }) => {
                  const choisi = champs.probleme === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => definir('probleme', id)}
                      aria-pressed={choisi}
                      className={`flex min-h-[94px] flex-col items-start justify-between gap-3 rounded-module border p-3.5 text-left text-legende font-medium leading-tight transition-all duration-300 ease-thermique ${
                        choisi
                          ? 'border-laiton-franc bg-laiton-franc/15 text-calcaire-neige'
                          : 'border-calcaire-neige/10 bg-calcaire-neige/[0.03] text-calcaire-brume hover:border-calcaire-neige/25 hover:bg-calcaire-neige/[0.07]'
                      }`}
                    >
                      <Icone
                        className={`h-5 w-5 ${choisi ? 'text-laiton-clair' : 'text-jura-mousse'}`}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                      {label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={() => setEtape(2)}
                  disabled={!champs.probleme}
                  className={`${boutonSuivant} ${
                    champs.probleme
                      ? 'bg-laiton-franc text-fonte-abysse hover:bg-laiton-clair'
                      : 'cursor-not-allowed bg-calcaire-neige/10 text-calcaire-roche'
                  }`}
                >
                  Continuer
                  <ArrowRight size={16} strokeWidth={2.4} />
                </button>
              </div>
            </motion.div>
          )}

          {etape === 2 && (
            <motion.div
              key="etape2"
              variants={variantesEtape}
              initial="entree"
              animate="centre"
              exit="sortie"
              transition={{ duration: 0.28, ease: COURBE }}
            >
              <h2 className="mt-7 text-titre-m text-calcaire-neige">
                Où, et à quel point c’est pressé ?
              </h2>
              <p className="mt-2 text-legende text-calcaire-ombre">
                Cela nous permet de vous situer dans le planning en cours.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="ville" className={classeEtiquette}>
                    Commune ou code postal
                  </label>
                  <input
                    id="ville"
                    name="ville"
                    type="text"
                    autoComplete="postal-code"
                    placeholder="Besançon, Saint-Vit, 25000…"
                    value={champs.ville}
                    onChange={(e) => definir('ville', e.target.value)}
                    className={classeChamp}
                  />
                </div>

                <fieldset>
                  <legend className={classeEtiquette}>Degré d’urgence</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {URGENCES.map((valeur) => (
                      <button
                        key={valeur}
                        type="button"
                        onClick={() => definir('urgence', valeur)}
                        aria-pressed={champs.urgence === valeur}
                        className={`min-h-[44px] rounded-module border px-4 text-legende font-semibold transition-all duration-300 ease-thermique ${
                          champs.urgence === valeur
                            ? 'border-laiton-franc bg-laiton-franc text-fonte-abysse'
                            : 'border-calcaire-neige/20 text-calcaire-brume hover:border-calcaire-neige/40 hover:text-calcaire-neige'
                        }`}
                      >
                        {valeur}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="mt-7 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEtape(1)}
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-legende text-calcaire-ombre transition-colors hover:text-calcaire-neige"
                >
                  <ArrowLeft size={16} strokeWidth={2.4} />
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => setEtape(3)}
                  disabled={!champs.ville || !champs.urgence}
                  className={`${boutonSuivant} ${
                    champs.ville && champs.urgence
                      ? 'bg-laiton-franc text-fonte-abysse hover:bg-laiton-clair'
                      : 'cursor-not-allowed bg-calcaire-neige/10 text-calcaire-roche'
                  }`}
                >
                  Continuer
                  <ArrowRight size={16} strokeWidth={2.4} />
                </button>
              </div>
            </motion.div>
          )}

          {etape === 3 && (
            <motion.div
              key="etape3"
              variants={variantesEtape}
              initial="entree"
              animate="centre"
              exit="sortie"
              transition={{ duration: 0.28, ease: COURBE }}
            >
              <h2 className="mt-7 text-titre-m text-calcaire-neige">Comment vous joindre ?</h2>
              <p className="mt-2 text-legende text-calcaire-ombre">
                Nous vous rappelons dès que possible. Pour une urgence, l’appel reste le plus rapide.
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nom" className={classeEtiquette}>
                      Nom <span className="text-laiton-clair">*</span>
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Votre nom"
                      value={champs.nom}
                      onChange={(e) => definir('nom', e.target.value)}
                      className={classeChamp}
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className={classeEtiquette}>
                      Téléphone <span className="text-laiton-clair">*</span>
                    </label>
                    <input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="06 00 00 00 00"
                      value={champs.telephone}
                      onChange={(e) => definir('telephone', e.target.value)}
                      className={classeChamp}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={classeEtiquette}>
                    Email <span className="text-calcaire-roche">(optionnel)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@exemple.fr"
                    value={champs.email}
                    onChange={(e) => definir('email', e.target.value)}
                    className={classeChamp}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={classeEtiquette}>
                    Précisions <span className="text-calcaire-roche">(optionnel)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Marque et âge de l’appareil, code erreur affiché, maison ou appartement…"
                    value={champs.message}
                    onChange={(e) => definir('message', e.target.value)}
                    className={`${classeChamp} resize-none`}
                  />
                </div>
              </div>

              <p className="mt-4 text-legende leading-relaxed text-calcaire-roche">
                En envoyant ce formulaire, vous acceptez d’être recontacté au sujet de votre
                demande. Vos données ne sont pas revendues, voir notre{' '}
                <a
                  href="/politique-confidentialite"
                  className="underline underline-offset-4 transition-colors hover:text-calcaire-brume"
                >
                  politique de confidentialité
                </a>
                .
              </p>

              {statut === 'erreur' && (
                <p role="alert" className="mt-4 text-legende font-medium text-laiton-clair">
                  L’envoi a échoué. Appelez-nous directement au {siteConfig.phoneDisplay}.
                </p>
              )}

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setEtape(2)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-legende text-calcaire-ombre transition-colors hover:text-calcaire-neige sm:justify-start"
                >
                  <ArrowLeft size={16} strokeWidth={2.4} />
                  Retour
                </button>
                <button
                  type="button"
                  onClick={envoyer}
                  disabled={!champs.nom || !champs.telephone || statut === 'envoi'}
                  className={`inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-module px-8 font-semibold transition-all duration-300 ease-thermique sm:w-auto ${
                    !champs.nom || !champs.telephone || statut === 'envoi'
                      ? 'cursor-not-allowed bg-calcaire-neige/10 text-calcaire-roche'
                      : 'bg-laiton-franc text-fonte-abysse shadow-halo-laiton hover:bg-laiton-clair'
                  }`}
                >
                  {statut === 'envoi' ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LeadForm
