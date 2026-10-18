import type { CSSProperties, Ref } from 'react'
import { CHAUDIERE } from '@/components/sections/chaudiere-reglages'

/**
 * EcorcheChaudiere : la chaudière gaz murale dessinée en écorché, posée sur la photo du bloc 1.
 *
 * Ce que le client paie et ne voit jamais : derrière la façade blanche, cinq pièces qui font
 * la panne. Le dessin est en traits laiton sur un fond de fonte translucide ; la façade est un
 * panneau HTML qui pivote en 3D sur sa charnière gauche (les transformations 3D ne sont pas
 * fiables sur un <g> SVG, elles le sont sur un <div>).
 *
 * Trois temps pilotés par `animerEcorche(root, a, o, q)`, sans aucun rendu React :
 *  - a (0 à 1) : le trait de la carcasse et la façade apparaissent sur la photo ;
 *  - o (0 à 1) : la façade s'ouvre, le fond de fonte se pose derrière les pièces ;
 *  - q (0 à 1) : les pièces s'allument une à une, chacune suivie de son étiquette ; la flamme
 *    du brûleur bouge, le code erreur clignote, le circulateur tourne (animations CSS lancées
 *    par l'attribut data-allume, coupées si « réduire les animations »).
 *
 * Traits et textes gardent une épaisseur en PIXELS D'ÉCRAN : `echelleEcorche(root, s)` les
 * convertit selon l'échelle d'affichage (attributs data-sw, data-fs, data-r).
 *
 * Repère : le dessin est tracé en 280 x 570 unités (L0 x H0) ; il est réduit à l'échelle
 * ECHELLE_DESSIN pour tenir dans le cadre réel de la chaudière sur la photo (CHAUDIERE), et
 * centré dedans. La boîte extérieure (LARGEUR_ECORCHE x HAUTEUR_ECORCHE) fait la taille du cadre.
 */

export const LARGEUR_ECORCHE = CHAUDIERE.largeur
export const HAUTEUR_ECORCHE = CHAUDIERE.hauteur
const L0 = 280
const H0 = 570
export const ECHELLE_DESSIN = Math.min(CHAUDIERE.largeur / L0, CHAUDIERE.hauteur / H0)
const DECALAGE_X = (CHAUDIERE.largeur - L0 * ECHELLE_DESSIN) / 2
const DECALAGE_Y = (CHAUDIERE.hauteur - H0 * ECHELLE_DESSIN) / 2

const LAITON = 'rgb(var(--c-laiton-clair))'
const LAITON_SOMBRE = 'rgb(var(--c-laiton-patine))'
const NEIGE = 'rgb(var(--c-calcaire-neige))'
const BRUME = 'rgb(var(--c-calcaire-brume))'
const FLAMME = '#8DC3F2'

/** Les cinq pièces, dans l'ordre où elles s'allument, et leur étiquette (8 mots au plus). */
export const PIECES = [
  { id: 'vase', etiquette: ["Vase d'expansion"] },
  { id: 'bruleur', etiquette: ['Brûleur'] },
  { id: 'echangeur', etiquette: ['Échangeur'] },
  { id: 'circulateur', etiquette: ['Circulateur'] },
  { id: 'carte', etiquette: ['Carte avec', 'code erreur'] },
] as const

/** Fenêtre d'allumage de la pièce i dans q, et de son étiquette. */
const PAS = 0.17
const DUREE_PIECE = 0.12
const RETARD_ETIQUETTE = 0.05
const DUREE_ETIQUETTE = 0.09

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lisse = (t: number) => t * t * (3 - 2 * t)

function Trait({ d, sw = 1.3, couleur = LAITON, opacite, fill = 'none', className }: { d: string; sw?: number; couleur?: string; opacite?: number; fill?: string; className?: string }) {
  return <path d={d} fill={fill} stroke={couleur} strokeWidth={sw} data-sw={sw} strokeLinecap="round" strokeLinejoin="round" opacity={opacite} className={className} />
}

export function EcorcheChaudiere({ className, style, boiteRef, fixe = false }: { className?: string; style?: CSSProperties; boiteRef?: Ref<HTMLDivElement>; fixe?: boolean }) {
  const L = LARGEUR_ECORCHE
  const H = HAUTEUR_ECORCHE
  return (
    <div
      ref={boiteRef}
      className={`eco ${fixe ? 'eco-fixe' : ''} ${className ?? ''}`}
      style={{ width: L, height: H, ...style }}
      aria-hidden="true"
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: L0, height: H0, transform: `translate(${DECALAGE_X.toFixed(2)}px, ${DECALAGE_Y.toFixed(2)}px) scale(${ECHELLE_DESSIN.toFixed(5)})`, transformOrigin: '0 0' }}
      >
      <svg viewBox={`0 0 ${L0} ${H0}`} width={L0} height={H0} className="absolute left-0 top-0 overflow-visible" style={{ width: L0, height: H0 }}>
        {/* Fond de fonte translucide, posé derrière les pièces quand la façade s'ouvre. */}
        <rect data-fond="" x="10" y="10" width="260" height="550" rx="7" fill="rgb(var(--c-fonte-nuit))" opacity={fixe ? 0.94 : 0} />

        {/* Carcasse et raccords du bas : le trait qui apparaît sur la photo. */}
        <g data-carcasse="" opacity={fixe ? 1 : 0}>
          <rect x="10" y="10" width="260" height="550" rx="7" fill="none" stroke={LAITON} strokeWidth="1.6" data-sw="1.6" />
          <Trait d="M150 10v-8h22v8" sw={1.3} />
          <Trait d="M120 496v64M170 496v64M220 496v64M250 496v64" sw={1.1} couleur={BRUME} opacite={0.7} />
          <g fill="none" stroke={BRUME} strokeWidth="1.1" data-sw="1.1" opacity="0.7">
            <circle cx="120" cy="532" r="5" data-r="5" />
            <circle cx="170" cy="532" r="5" data-r="5" />
            <circle cx="220" cy="532" r="5" data-r="5" />
          </g>
        </g>

        {/* 0. Vase d'expansion : le disque à membrane, en haut à gauche, derrière le reste. */}
        <g data-piece="0" opacity={fixe ? 1 : 0}>
          <circle cx="82" cy="118" r="56" fill={LAITON_SOMBRE} fillOpacity="0.2" stroke={LAITON} strokeWidth="1.4" data-sw="1.4" />
          <circle cx="82" cy="118" r="46" fill="none" stroke={LAITON} strokeWidth="1" data-sw="1" strokeDasharray="4 4" opacity="0.7" />
          <Trait d="M32 118q25-14 50 0t50 0" sw={1.3} />
          <Trait d="M82 62v-12m-7 0h14" sw={1.3} />
        </g>

        {/* 1. Brûleur : le caisson du ventilateur et la rampe de flammes bleues. */}
        <g data-piece="1" opacity={fixe ? 1 : 0}>
          <rect x="122" y="62" width="116" height="40" rx="4" fill="rgb(var(--c-fonte-trempe))" fillOpacity="0.5" stroke={LAITON} strokeWidth="1.3" data-sw="1.3" />
          <circle cx="150" cy="82" r="12" fill="none" stroke={LAITON} strokeWidth="1.1" data-sw="1.1" />
          <Trait d="M150 82l0-10M150 82l9 5M150 82l-9 5" sw={1.1} />
          <Trait d="M172 76h56M172 88h56" sw={1} couleur={BRUME} opacite={0.6} />
          <rect x="124" y="104" width="112" height="4" fill={LAITON} fillOpacity="0.8" />
          <g className="eco-flammes">
            {[134, 152, 170, 188, 206, 224].map((x) => (
              <path key={x} className="eco-flamme" d={`M${x} 124q-6-9 0-18q6 8 0 18z`} fill={FLAMME} opacity="0.92" />
            ))}
          </g>
        </g>

        {/* 2. Échangeur : le bloc où l'eau se chauffe, le serpentin ; la sonde sur le tuyau à droite. */}
        <g data-piece="2" opacity={fixe ? 1 : 0}>
          <rect x="120" y="126" width="120" height="160" rx="8" fill="rgb(var(--c-fonte-trempe))" fillOpacity="0.45" stroke={LAITON} strokeWidth="1.4" data-sw="1.4" />
          <Trait d="M132 142h96v18h-96v18h96v18h-96v18h96v18h-96v18h96v18h-96" sw={1.3} />
          <Trait d="M248 140v160" sw={1.1} couleur={BRUME} opacite={0.7} />
          <rect x="243" y="196" width="10" height="16" rx="2" fill="rgb(var(--c-fonte-nuit))" stroke={LAITON} strokeWidth="1.1" data-sw="1.1" />
          <Trait d="M248 212q-12 24-8 60" sw={1} couleur={BRUME} opacite={0.6} />
        </g>

        {/* 3. Circulateur : la pompe qui pousse l'eau vers les radiateurs. */}
        <g data-piece="3" opacity={fixe ? 1 : 0}>
          <Trait d="M140 286v44q0 22-22 22h-6" sw={1.1} couleur={BRUME} opacite={0.7} />
          <circle cx="78" cy="352" r="32" fill="rgb(var(--c-fonte-trempe))" fillOpacity="0.5" stroke={LAITON} strokeWidth="1.4" data-sw="1.4" />
          <circle cx="78" cy="352" r="11" fill="none" stroke={LAITON} strokeWidth="1.2" data-sw="1.2" />
          <g className="eco-rotor">
            <Trait d="M78 328a24 24 0 0 1 24 24" sw={1.3} />
            <Trait d="M98 344l4 8-8 2" sw={1.3} />
          </g>
          <Trait d="M60 380v180" sw={1.1} couleur={BRUME} opacite={0.7} />
        </g>

        {/* 4. Carte électronique : les composants, l'afficheur et le code erreur qui clignote. */}
        <g data-piece="4" opacity={fixe ? 1 : 0}>
          <rect x="150" y="412" width="112" height="84" rx="3" fill="rgb(var(--c-fonte-trempe))" fillOpacity="0.55" stroke={LAITON} strokeWidth="1.3" data-sw="1.3" />
          <rect x="160" y="422" width="58" height="22" rx="2" fill="rgb(var(--c-fonte-abysse))" stroke={LAITON} strokeWidth="1" data-sw="1" />
          <text className="eco-code font-titre" x="189" y="438" textAnchor="middle" fill={LAITON} fontSize="13" data-fs="13" data-ls="0.08" fontWeight="600">
            F28
          </text>
          <g fill="rgb(var(--c-fonte-nuit))" stroke={LAITON} strokeWidth="1" data-sw="1">
            <rect x="226" y="424" width="26" height="18" rx="1" />
            <rect x="160" y="456" width="22" height="14" rx="1" />
            <rect x="190" y="456" width="40" height="14" rx="1" />
            <rect x="238" y="452" width="16" height="30" rx="1" />
          </g>
          <Trait d="M160 482h92M172 470v12M210 470v12" sw={1} couleur={BRUME} opacite={0.6} />
        </g>

        {/* Étiquettes : un point sur la pièce, un trait, le mot. */}
        <g fill="none" stroke={BRUME} strokeWidth="1" data-sw="1" opacity="0.9">
          <g data-etiquette="0" opacity={fixe ? 1 : 0}>
            <circle cx="82" cy="174" r="2.2" data-r="2.2" fill={NEIGE} stroke="none" />
            <path d="M82 174l-36 24" />
            <text x="20" y="214" fill={NEIGE} stroke="none" fontSize="12.5" data-fs="12.5" className="font-titre" fontWeight="500">
              Vase d&apos;expansion
            </text>
          </g>
          <g data-etiquette="1" opacity={fixe ? 1 : 0}>
            <circle cx="190" cy="62" r="2.2" data-r="2.2" fill={NEIGE} stroke="none" />
            <path d="M190 62v-14" />
            <text x="154" y="44" fill={NEIGE} stroke="none" fontSize="12.5" data-fs="12.5" className="font-titre" fontWeight="500">
              Brûleur
            </text>
          </g>
          <g data-etiquette="2" opacity={fixe ? 1 : 0}>
            <circle cx="180" cy="286" r="2.2" data-r="2.2" fill={NEIGE} stroke="none" />
            <path d="M180 286v18" />
            <text x="152" y="320" fill={NEIGE} stroke="none" fontSize="12.5" data-fs="12.5" className="font-titre" fontWeight="500">
              Échangeur
            </text>
          </g>
          <g data-etiquette="3" opacity={fixe ? 1 : 0}>
            <circle cx="96" cy="378" r="2.2" data-r="2.2" fill={NEIGE} stroke="none" />
            <path d="M96 378v18" />
            <text x="76" y="412" fill={NEIGE} stroke="none" fontSize="12.5" data-fs="12.5" className="font-titre" fontWeight="500">
              Circulateur
            </text>
          </g>
          <g data-etiquette="4" opacity={fixe ? 1 : 0}>
            <circle cx="150" cy="454" r="2.2" data-r="2.2" fill={NEIGE} stroke="none" />
            <path d="M150 454h-44" />
            <text x="20" y="458" fill={NEIGE} stroke="none" fontSize="12.5" data-fs="12.5" className="font-titre" fontWeight="500">
              Carte avec
            </text>
            <text x="20" y="474" fill={NEIGE} stroke="none" fontSize="12.5" data-fs="12.5" className="font-titre" fontWeight="500">
              code erreur
            </text>
          </g>
        </g>
      </svg>

      {/* La façade : un panneau dessiné, translucide, qui pivote sur sa charnière gauche. */}
      {!fixe && (
        <div data-facade="" className="eco-facade" style={{ left: 10, top: 10, width: 260, height: 550, opacity: 0 }}>
          <svg viewBox="0 0 260 550" width="260" height="550" className="absolute left-0 top-0 overflow-visible">
            <rect x="0.8" y="0.8" width="258.4" height="548.4" rx="7" fill="rgb(var(--c-calcaire-neige))" fillOpacity="0.16" stroke={LAITON} strokeWidth="1.6" data-sw="1.6" />
            <rect x="88" y="60" width="84" height="26" rx="2" fill="rgb(var(--c-fonte-nuit))" fillOpacity="0.5" stroke={LAITON} strokeWidth="1.1" data-sw="1.1" />
            <circle cx="104" cy="488" r="9" fill="none" stroke={LAITON} strokeWidth="1.1" data-sw="1.1" />
            <circle cx="156" cy="488" r="9" fill="none" stroke={LAITON} strokeWidth="1.1" data-sw="1.1" />
            <path d="M40 520h180" fill="none" stroke={LAITON} strokeWidth="1" data-sw="1" opacity="0.7" />
          </svg>
        </div>
      )}
      </div>
    </div>
  )
}

/**
 * Trois temps : a = apparition du trait sur la photo, o = ouverture de la façade, q = pièces.
 */
export function animerEcorche(root: HTMLElement, a: number, o: number, q: number) {
  const A = lisse(clamp(a))
  const O = lisse(clamp(o))
  const facade = root.querySelector<HTMLElement>('[data-facade]')
  if (facade) {
    const angle = -112 * O
    facade.style.opacity = (A * (1 - 0.3 * O)).toFixed(3)
    facade.style.transform = `perspective(1400px) rotateY(${angle.toFixed(2)}deg)`
    facade.style.visibility = A < 0.02 ? 'hidden' : ''
  }
  const carcasse = root.querySelector<SVGElement>('[data-carcasse]')
  if (carcasse) carcasse.setAttribute('opacity', A.toFixed(3))
  const fond = root.querySelector<SVGElement>('[data-fond]')
  if (fond) fond.setAttribute('opacity', (0.94 * O).toFixed(3))
  for (let i = 0; i < PIECES.length; i++) {
    const debut = i * PAS
    const k = lisse(clamp((q - debut) / DUREE_PIECE))
    const piece = root.querySelector<SVGElement>(`[data-piece="${i}"]`)
    if (piece) {
      piece.setAttribute('opacity', (k * O).toFixed(3))
      if (k >= 0.99) piece.setAttribute('data-allume', '')
      else piece.removeAttribute('data-allume')
    }
    const l = lisse(clamp((q - debut - RETARD_ETIQUETTE) / DUREE_ETIQUETTE))
    const etiquette = root.querySelector<SVGElement>(`[data-etiquette="${i}"]`)
    if (etiquette) {
      etiquette.setAttribute('opacity', l.toFixed(3))
      etiquette.style.transform = l < 1 ? `translateY(${(6 * (1 - l)).toFixed(2)}px)` : ''
    }
  }
}

/** Traits, rayons et textes en pixels d'écran : convertis selon l'échelle d'affichage s. */
export function echelleEcorche(root: HTMLElement, s: number) {
  // `s` = pixels d'écran par unité de photo ; le dessin est en plus réduit à ECHELLE_DESSIN.
  const k = 1 / Math.max(0.05, s * ECHELLE_DESSIN)
  root.querySelectorAll<SVGElement>('[data-sw],[data-fs],[data-r]').forEach((el) => {
    const d = el.dataset
    if (d.sw) el.setAttribute('stroke-width', (Number(d.sw) * k).toFixed(2))
    if (d.r) el.setAttribute('r', (Number(d.r) * k).toFixed(2))
    if (d.fs) {
      el.setAttribute('font-size', (Number(d.fs) * k).toFixed(2))
      if (d.ls) el.setAttribute('letter-spacing', (Number(d.ls) * Number(d.fs) * k).toFixed(2))
    }
  })
}

export default EcorcheChaudiere
