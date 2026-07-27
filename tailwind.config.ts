import type { Config } from 'tailwindcss'

/**
 * tailwind.config.ts, jeu de tokens du TEMPLATE T3 (« fonte et laiton »).
 *
 * Ce fichier est volontairement construit sur une autre grammaire que les autres
 * templates du portefeuille, structure ET valeurs :
 *  - familles de couleur nommées par MATIÈRE (fonte, calcaire, jura, laiton) et
 *    échelles nommées par MOTS (brut, trempe, coulee, nuit, abysse…), jamais par
 *    nombres. Une classe T3 ressemble à `bg-fonte-nuit`, pas à `bg-ink-950`.
 *  - géométrie sèche : rayons courts nommés d'après l'appareillage du métier
 *    (`plaque`, `module`, `bloc`), au lieu de rayons généreux.
 *  - typographie à deux rôles explicites : `titre` (Bricolage Grotesque) et
 *    `texte` (IBM Plex Sans), au lieu d'un couple sans/display.
 *  - vocabulaire de motion thermique : `montee`, `graduation`, `braise-douce`.
 *
 * Aucune couleur en dur : tout vient des variables CSS émises par lib/theme.ts
 * depuis `siteConfig.palette`.
 */
const teinte = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`

const matiere = (famille: string, niveaux: string[]) =>
  Object.fromEntries(niveaux.map((n) => [n, teinte(`--c-${famille}-${n}`)]))

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './config/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        fonte: matiere('fonte', ['brut', 'trempe', 'coulee', 'nuit', 'abysse']),
        calcaire: matiere('calcaire', [
          'neige',
          'voile',
          'pierre',
          'brume',
          'ombre',
          'roche',
          'basalte',
        ]),
        jura: {
          ...matiere('jura', ['mousse', 'tendre', 'franc', 'dense', 'sombre']),
          DEFAULT: teinte('--c-jura-dense'),
        },
        laiton: {
          ...matiere('laiton', ['paille', 'clair', 'franc', 'patine']),
          DEFAULT: teinte('--c-laiton-franc'),
        },
      },

      fontFamily: {
        // `texte` porte tout le corps et l'interface, `titre` tous les niveaux de titre.
        texte: ['var(--police-texte)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        titre: ['var(--police-titre)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--police-texte)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      /**
       * Échelle typographique propre à T3 : des paliers nommés, calés sur le
       * rythme éditorial du site plutôt que sur l'échelle Tailwind par défaut.
       */
      fontSize: {
        surtitre: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.24em' }],
        legende: ['0.8125rem', { lineHeight: '1.5' }],
        lecture: ['1.0625rem', { lineHeight: '1.75' }],
        chapo: ['1.1875rem', { lineHeight: '1.65' }],
        'titre-s': ['1.375rem', { lineHeight: '1.28', letterSpacing: '-0.015em' }],
        'titre-m': ['1.875rem', { lineHeight: '1.16', letterSpacing: '-0.02em' }],
        'titre-l': ['2.625rem', { lineHeight: '1.08', letterSpacing: '-0.028em' }],
        'titre-xl': ['3.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },

      /* Géométrie sèche, empruntée à l'appareillage : plaques, modules, blocs. */
      borderRadius: {
        plaque: '0.25rem',
        module: '0.5rem',
        bloc: '0.875rem',
        socle: '1.25rem',
        jauge: '62.5rem',
      },

      boxShadow: {
        pose: '0 1px 0 rgb(12 14 13 / 0.06), 0 2px 10px -4px rgb(12 14 13 / 0.14)',
        releve: '0 2px 4px rgb(12 14 13 / 0.07), 0 18px 40px -22px rgb(12 14 13 / 0.4)',
        'halo-laiton': '0 0 0 1px rgb(var(--c-laiton-franc) / 0.35), 0 14px 34px -16px rgb(var(--c-laiton-franc) / 0.7)',
        'halo-jura': '0 0 0 1px rgb(var(--c-jura-franc) / 0.3), 0 14px 34px -18px rgb(var(--c-jura-franc) / 0.55)',
        grave: 'inset 0 1px 0 rgb(250 249 246 / 0.06), inset 0 -1px 0 rgb(12 14 13 / 0.5)',
      },

      /* Largeurs de lecture nommées : le gabarit éditorial du site. */
      maxWidth: {
        lecture: '44rem',
        colonne: '58rem',
        planche: '82rem',
      },

      keyframes: {
        /* Respiration lente d'une graduation gravée, clin d'œil horloger bisontin.
           La MONTÉE de la colonne thermique, elle, est pilotée par framer-motion
           (lib/motion.ts, `monteeThermique`) : pas de doublon CSS. */
        graduation: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.95' },
        },
        /* Respiration chaude très lente sous les blocs sombres. */
        'braise-douce': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.62', transform: 'scale(1.06)' },
        },
        /* Dérive d'un halo, plus lente et plus courte que les templates précédents. */
        derive: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(2.5rem,-1.75rem,0)' },
        },
      },
      animation: {
        graduation: 'graduation 5.5s ease-in-out infinite',
        'braise-douce': 'braise-douce 9s ease-in-out infinite',
        derive: 'derive 26s ease-in-out infinite',
      },

      transitionTimingFunction: {
        // Courbe maison T3 : entrée franche, sortie longue. Volontairement
        // différente de la courbe des templates précédents.
        thermique: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
