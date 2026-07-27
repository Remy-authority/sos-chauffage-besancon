/**
 * lib/motion.ts, vocabulaire de mouvement du template T3.
 *
 * Parti pris : un mouvement d'appareillage, pas un mouvement d'affiche. Les
 * blocs se posent (translation courte, détente longue), ils ne glissent pas sur
 * de grandes distances. La courbe attaque plus franchement et se stabilise plus
 * lentement que celle des templates précédents du portefeuille, et les distances
 * de translation sont volontairement réduites de moitié.
 *
 * Tout composant animé consomme ces variants plutôt que d'inventer les siens :
 * c'est ce fichier qui tient la cohérence du rythme sur l'ensemble du site.
 */
import type { Variants } from 'framer-motion'

/** Courbe thermique maison : montée franche, stabilisation lente. */
export const COURBE = [0.16, 1, 0.3, 1] as const

/** Durées de référence, en secondes. */
export const DUREE = {
  vive: 0.24,
  pose: 0.48,
  ample: 0.7,
} as const

/** Apparition standard : le bloc se pose de 12 px, sans changement d'échelle. */
export const pose: Variants = {
  repos: { opacity: 0, y: 12 },
  actif: { opacity: 1, y: 0, transition: { duration: DUREE.pose, ease: COURBE } },
}

/** Apparition sans déplacement, pour les grands aplats et les visuels. */
export const revele: Variants = {
  repos: { opacity: 0 },
  actif: { opacity: 1, transition: { duration: DUREE.ample, ease: 'easeOut' } },
}

/** Entrée latérale courte, réservée aux colonnes appariées. */
export const depuisGauche: Variants = {
  repos: { opacity: 0, x: -18 },
  actif: { opacity: 1, x: 0, transition: { duration: DUREE.ample, ease: COURBE } },
}

export const depuisDroite: Variants = {
  repos: { opacity: 0, x: 18 },
  actif: { opacity: 1, x: 0, transition: { duration: DUREE.ample, ease: COURBE } },
}

/** Montée d'une colonne graduée : l'animation signature du site. */
export const monteeThermique: Variants = {
  repos: { scaleY: 0, opacity: 0 },
  actif: { scaleY: 1, opacity: 1, transition: { duration: 1.1, ease: COURBE } },
}

/** Cadence d'une série : les éléments s'allument l'un après l'autre. */
export const cadence: Variants = {
  repos: {},
  actif: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

export const cadenceRapide: Variants = {
  repos: {},
  actif: { transition: { staggerChildren: 0.04 } },
}

/** Déclenchement au scroll : une seule fois, à 20 % de visibilité. */
export const vuUneFois = { once: true, amount: 0.2 } as const
