/**
 * Réglages partagés du bloc 1 « la chaudière qui s'ouvre » (HeroChaudiere.tsx côté serveur,
 * HeroChaudiereSequence.tsx côté navigateur) : mêmes adresses d'image, même qualité, même
 * cadrage, pour que la séquence reprenne au pixel près la photo déjà affichée au premier rendu.
 *
 * Toutes les coordonnées « photo » sont exprimées dans une photo ramenée à 1 600 px de large.
 */
export const LARGEUR = 1600
export const HAUTEUR = 893.33

export const PHOTO_BLOC1 = {
  src: '/accueil/chaudiere-murale-cuisine.webp',
  alt: 'Chaudière gaz murale blanche installée dans la cuisine d’une maison, à Besançon',
  /** Définition du fichier source. */
  largeur: 2400,
  hauteur: 1340,
}
export const QUALITE_BLOC1 = 70

/**
 * Photo du téléphone et de la tablette : la bande verticale de la photo centrée sur la
 * chaudière (x 320 à 1 320 sur 1 600, centrée sur la chaudière à x 820), toute sa hauteur, agrandie puis ramenée à 2 700 px :
 * nette en densité 3, elle couvre tout le premier écran.
 */
export const BANDE_MOBILE = {
  src: '/accueil/chaudiere-murale-cuisine-telephone.webp',
  x0: 320,
  largeur: 1000,
  fichier: { largeur: 2700, hauteur: 2412 },
}

/**
 * La chaudière dans la photo (pixels à 1 600 px) : le cadre où le dessin en écorché se pose.
 * Recalé après la génération de la photo, sur la photo réelle.
 */
export const CHAUDIERE = { x0: 680, y0: 150, largeur: 280, hauteur: 570 }

/**
 * `sizes` = la largeur réelle de l'image à l'écran, jamais celle de l'écran : la bande couvre le
 * panneau (873 px CSS à 390 x 844, 1 245 px à 820 x 1 180).
 */
export const TAILLES_BLOC1 = { ordi: '100vw', mobile: '(min-width: 768px) 1250px, 880px' }

/**
 * Voile de l'ordinateur : il part de la gauche, sous le texte, et s'éteint avant la chaudière ;
 * le formulaire, opaque, n'en a pas besoin. Paliers comptés depuis le bord de la grille (80rem
 * centrée), pas depuis l'écran.
 */
export const VOILE_ORDI =
  'bg-[linear-gradient(90deg,rgb(var(--c-fonte-nuit)/0.84)_calc(max(0px,50%_-_640px)_+_0px),rgb(var(--c-fonte-nuit)/0.78)_calc(max(0px,50%_-_640px)_+_300px),rgb(var(--c-fonte-nuit)/0.62)_calc(max(0px,50%_-_640px)_+_470px),rgb(var(--c-fonte-nuit)/0.34)_calc(max(0px,50%_-_640px)_+_570px),rgb(var(--c-fonte-nuit)/0.06)_calc(max(0px,50%_-_640px)_+_640px),rgb(var(--c-fonte-nuit)/0)_calc(max(0px,50%_-_640px)_+_720px))]'
/**
 * Voile du téléphone : une ombre douce derrière le texte, centrée, le haut et le bas assombris ;
 * jamais un aplat, la chaudière et la cuisine restent visibles.
 */
export const VOILE_MOBILE =
  'bg-[radial-gradient(ellipse_90%_42%_at_50%_47%,rgb(var(--c-fonte-nuit)/0.46)_0%,rgb(var(--c-fonte-nuit)/0.22)_58%,rgb(var(--c-fonte-nuit)/0)_100%),linear-gradient(180deg,rgb(var(--c-fonte-nuit)/0.46)_0%,rgb(var(--c-fonte-nuit)/0.3)_32%,rgb(var(--c-fonte-nuit)/0.24)_66%,rgb(var(--c-fonte-nuit)/0.5)_100%)]'

/**
 * Grille de l'ordinateur : texte à gauche, la chaudière au milieu, le formulaire à droite. Les deux
 * colonnes prennent la hauteur de la rangée et centrent leur contenu en hauteur.
 */
export const GRILLE_ORDI =
  'lg:mx-auto lg:grid lg:w-full lg:max-w-planche lg:grid-cols-[minmax(0,29rem)_minmax(0,1fr)_22rem] lg:gap-6 lg:px-10 xl:grid-cols-[minmax(0,32rem)_minmax(0,1fr)_24rem]'
