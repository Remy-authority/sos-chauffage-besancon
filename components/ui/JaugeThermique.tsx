'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import { COURBE, monteeThermique, vuUneFois } from '@/lib/motion'

/**
 * JAUGE THERMIQUE, composant signature du site.
 *
 * Une colonne graduée verticale qui se remplit du froid vers le chaud. Elle
 * raconte en un objet ce que fait le métier : on part d'un logement à l'arrêt,
 * on remonte jusqu'au confort. Les graduations reprennent le trait gravé du
 * reste du template, le remplissage passe du vert Jura au laiton.
 *
 * Ce composant n'affiche AUCUNE valeur chiffrée : les paliers sont des états
 * (arrêt, chauffe, confort), pas des températures ni des délais, pour ne rien
 * promettre qui ne soit vérifiable.
 */

export type PalierJauge = {
  /** Libellé du palier, lu de bas en haut. */
  label: string
  /** Précision courte affichée sous le libellé. */
  detail?: string
}

const PALIERS_DEFAUT: PalierJauge[] = [
  { label: 'Installation à l’arrêt', detail: 'Le logement se refroidit' },
  { label: 'Diagnostic engagé', detail: 'Au téléphone, puis sur place' },
  { label: 'Remise en chauffe', detail: 'Pièce changée, circuit relancé' },
  { label: 'Confort rétabli', detail: 'Contrôle avant de repartir' },
]

export function JaugeThermique({
  paliers = PALIERS_DEFAUT,
  className = '',
}: {
  paliers?: PalierJauge[]
  className?: string
}) {
  const idDegrade = useId()
  const dernier = paliers.length - 1

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-stretch gap-5">
        {/* Colonne graduée */}
        <div className="relative flex w-14 shrink-0 justify-center">
          <div className="relative h-full w-9 overflow-hidden rounded-jauge border border-calcaire-neige/15 bg-fonte-abysse/70 shadow-grave">
            {/* Remplissage thermique, ancré en bas */}
            <motion.div
              initial="repos"
              whileInView="actif"
              viewport={vuUneFois}
              variants={monteeThermique}
              style={{ transformOrigin: 'bottom' }}
              className="absolute inset-x-0 bottom-0 top-0 rounded-jauge bg-gradient-to-t from-jura-sombre via-jura-tendre to-laiton-clair"
            />
            {/* Voile de brillance sur le remplissage */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 rounded-jauge bg-calcaire-neige/25 mix-blend-overlay"
            />
            {/* Graduations gravées par-dessus la colonne */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full animate-graduation"
              preserveAspectRatio="none"
              viewBox="0 0 36 400"
            >
              <defs>
                <linearGradient id={idDegrade} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="rgb(var(--c-fonte-abysse))" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="rgb(var(--c-fonte-abysse))" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              {Array.from({ length: 21 }).map((_, i) => {
                const y = 8 + i * 19.2
                const majeure = i % 5 === 0
                return (
                  <line
                    key={y}
                    x1={majeure ? 4 : 8}
                    x2={majeure ? 20 : 15}
                    y1={y}
                    y2={y}
                    stroke={`url(#${idDegrade})`}
                    strokeWidth={majeure ? 2.4 : 1.4}
                    strokeLinecap="round"
                  />
                )
              })}
            </svg>
          </div>

          {/* Index mobile : la butée haute qui pulse une fois la jauge pleine */}
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vuUneFois}
            transition={{ duration: 0.6, delay: 0.95, ease: COURBE }}
            className="absolute -right-1 top-1 flex h-3 w-3 items-center justify-center"
          >
            <span className="absolute h-full w-full animate-braise-douce rounded-jauge bg-laiton-franc/70" />
            <span className="relative h-1.5 w-1.5 rounded-jauge bg-laiton-paille" />
          </motion.span>
        </div>

        {/* Paliers, lus de haut en bas côté texte, du plus chaud au plus froid */}
        <ol className="flex flex-1 flex-col justify-between py-1">
          {[...paliers].reverse().map((palier, i) => {
            const chaud = i === 0
            return (
              <motion.li
                key={palier.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vuUneFois}
                transition={{ duration: 0.5, delay: 0.35 + (dernier - i) * 0.12, ease: COURBE }}
                className="relative py-2.5"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-5 top-[1.05rem] h-px w-4 ${
                    chaud ? 'bg-laiton-franc' : 'bg-calcaire-neige/25'
                  }`}
                />
                <p
                  className={`font-titre text-[0.9375rem] font-medium leading-tight ${
                    chaud ? 'text-laiton-clair' : 'text-calcaire-neige'
                  }`}
                >
                  {palier.label}
                </p>
                {palier.detail && (
                  <p className="mt-1 text-legende text-calcaire-ombre">{palier.detail}</p>
                )}
              </motion.li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default JaugeThermique
