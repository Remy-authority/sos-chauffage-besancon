'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { getImageProps } from 'next/image'
import { EcorcheChaudiere, HAUTEUR_ECORCHE, LARGEUR_ECORCHE, animerEcorche, echelleEcorche } from '@/components/ui/EcorcheChaudiere'
import { BANDE_MOBILE, CHAUDIERE, GRILLE_ORDI, HAUTEUR, LARGEUR, PHOTO_BLOC1, QUALITE_BLOC1, TAILLES_BLOC1, VOILE_MOBILE, VOILE_ORDI } from '@/components/sections/chaudiere-reglages'

/**
 * HeroChaudiereSequence, le « bloc 1 qui s'ouvre » (mise à jour n°1, 18/10/2026, plan validé par
 * Rémy « ok go »). Mécanique reprise de forage-puits-val-de-loire.fr (HeroPlongee, « exceptionnel »),
 * le dessin est propre au chauffage.
 *
 *  ÉCRAN 1    le bloc 1 : la chaudière gaz murale, finie, dans une cuisine ; titre, texte, boutons,
 *             formulaire noir à étapes. Téléphone et tablette : la photo plein écran (bande centrée
 *             sur la chaudière), le texte centré dessus.
 *  AVANCÉE    (0 à p1) texte, voile et formulaire s'effacent en moins de 100 px de défilement ; la
 *             caméra avance vers la chaudière jusqu'à la cadrer entière, à gauche sur ordinateur.
 *  OUVERTURE  (p1 à p2) le trait de la façade se pose sur la photo, puis la façade pivote sur sa
 *             charnière : derrière, le fond de fonte et les cinq pièces que le client paie sans les
 *             voir jamais.
 *  PIÈCES     (p2 à e1) vase d'expansion, brûleur (flammes bleues), échangeur, circulateur (qui
 *             tourne), carte électronique (code erreur qui clignote) s'allument une à une, chacune
 *             suivie de son étiquette ; une dernière ligne conclut.
 *  FORMULAIRE (ordinateur, f0 à f1, pendant l'ouverture) le formulaire noir de l'écran 1 revient
 *             depuis la droite et reste utilisable pendant tout le reste.
 *
 * Moteur : un seul requestAnimationFrame par défilement (écouteur passif), styles écrits dans le
 * DOM, aucun rendu React par image. La photo est déplacée par transform seul, à sa pleine
 * définition ; la boîte de l'écorché suit la même caméra (repère de la photo à 1 600 px).
 *
 * « Réduire les animations », économie de données ou réseau lent : la version fixe telle quelle,
 * puis l'écorché COMPLET, fixe, dessous (EcorcheFixe).
 */

type Cle = 'ordi' | 'mobile'
type Rect = { x: number; y: number; w: number; h: number }
/** Caméra : échelle (pixels d'écran par pixel de photo à 1600 px) et position à l'écran du FOYER. */
type Camera = { s: number; fx: number; fy: number }

/** Le point visé : le centre de la chaudière. */
const FOYER = { x: CHAUDIERE.x0 + CHAUDIERE.largeur / 2, y: CHAUDIERE.y0 + CHAUDIERE.hauteur / 2 }
const LIMITES: Record<Cle, { p1: number; p2: number; e1: number; f0: number; f1: number }> = {
  ordi: { p1: 0.2, p2: 0.36, e1: 0.9, f0: 0.26, f1: 0.38 },
  mobile: { p1: 0.18, p2: 0.34, e1: 0.93, f0: 2, f1: 3 },
}
const H = HAUTEUR
/** GIF transparent de 1 px : la source « rien à charger » des <picture> (même valeur que HeroChaudiere). */
const RIEN = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/** Dernière ligne, sans deux-points. */
const CONCLUSION = 'C’est là que ça se joue. Nous arrivons avec la pièce.'

const useEffetAvantPeinture = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lisse = (t: number) => t * t * (3 - 2 * t)
const hermite = (u: number, d0: number, d1: number) =>
  (u ** 3 - 2 * u ** 2 + u) * d0 + (-2 * u ** 3 + 3 * u ** 2) + (u ** 3 - u ** 2) * d1

function reseauLent() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  return !!c && (c.saveData === true || ['slow-2g', '2g', '3g'].includes(c.effectiveType ?? ''))
}

/** Caméra qui couvre le rectangle r comme object-cover, avec la position (ox, oy) de object-position. */
function couvrir(r: Rect, ox: number, oy: number): Camera {
  const s = Math.max(r.w / LARGEUR, r.h / H)
  const gauche = r.x + (r.w - LARGEUR * s) * ox
  const haut = r.y + (r.h - H * s) * oy
  return { s, fx: gauche + FOYER.x * s, fy: haut + FOYER.y * s }
}
/** Travelling : échelle géométrique, point visé en ligne droite à l'écran. */
const entre = (a: Camera, b: Camera, e: number): Camera => ({
  s: a.s * Math.pow(b.s / a.s, e),
  fx: a.fx + (b.fx - a.fx) * e,
  fy: a.fy + (b.fy - a.fy) * e,
})
/** Écran d'un point de la photo. */
const ecran = (c: Camera, x: number, y: number) => [(x - FOYER.x) * c.s + c.fx, (y - FOYER.y) * c.s + c.fy]

/** Fondu long et adouci, posé à l'écran, qui rejoint le fond sombre sous le formulaire (ordinateur). */
const FONDU_PAS = Array.from({ length: 11 }, (_, i) => {
  const t = i / 10
  return { t, a: t * t * t * (t * (6 * t - 15) + 10) }
})
const fondu = (d0: number, d1: number) => {
  const c = (a: number, x: number) => `rgb(var(--c-fonte-nuit)/${a.toFixed(3)}) ${(x * 100).toFixed(2)}%`
  const droite = FONDU_PAS.map(({ t, a }) => c(a, d0 + (d1 - d0) * t))
  return `linear-gradient(90deg,${[c(0, 0), ...droite, c(1, 1)].join(',')})`
}

/** Mise en page : hauteurs qui dépendent de celle de l'en-tête (mesurée) et de la barre du bas. */
const CSS = `
.plg{--entete:64px;--barre:72px}
.plg-piste{position:relative;height:380svh}
.plg-panneau{position:sticky;top:var(--entete);height:max(calc(100svh - var(--entete)),540px);overflow:hidden}
.plg-texte{position:sticky;top:var(--entete);height:0;z-index:10;pointer-events:none}
.plg-plein{min-height:calc(max(calc(100svh - var(--entete)),540px) - var(--barre))}
@media (min-width:768px){.plg{--barre:0px}}
@media (min-width:1024px){
.plg-plein{min-height:0}
.plg-piste{height:450vh}
.plg-panneau{height:max(calc(100vh - var(--entete)),640px)}
.plg-calque{position:absolute;left:0;right:0;top:0;z-index:10;pointer-events:none;height:calc(450vh - max(calc(100vh - var(--entete)),640px))}
.plg-colle{position:sticky;top:var(--entete);height:0}
.plg-cadre{height:max(calc(100vh - var(--entete)),640px)}
.plg-texte{position:static;height:auto;pointer-events:auto}
}`

export default function HeroChaudiereSequence({
  versionA,
  texte,
  formulaire,
}: {
  /** Le bloc 1, tel quel (rendu serveur, repli). */
  versionA: ReactNode
  /** Colonne texte. */
  texte: ReactNode
  /** Colonne formulaire. */
  formulaire: ReactNode
}) {
  const [mode, setMode] = useState<'A' | 'B' | 'F'>('A')

  const section = useRef<HTMLElement>(null)
  const piste = useRef<HTMLDivElement>(null)
  const panneau = useRef<HTMLDivElement>(null)
  const texteRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const voileRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const photoMobileRef = useRef<HTMLImageElement>(null)
  const boiteRef = useRef<HTMLDivElement>(null)
  const fonduRef = useRef<HTMLDivElement>(null)
  const conclusionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const maj = () => setMode(mq.matches || reseauLent() ? 'F' : 'B')
    maj()
    mq.addEventListener('change', maj)
    return () => mq.removeEventListener('change', maj)
  }, [])

  useEffetAvantPeinture(() => {
    if (mode !== 'B') return
    const sectionEl = section.current!
    const pisteEl = piste.current!
    const panneauEl = panneau.current!
    const grandMq = window.matchMedia('(min-width: 1024px)')
    let cle: Cle = grandMq.matches ? 'ordi' : 'mobile'

    let entete = 64
    let W = 0
    let Hp = 0
    let s0: Camera = { s: 1, fx: 0, fy: 0 }
    let sE = s0
    let gaucheForm = 0
    let echelle = 0
    const mesurer = () => {
      cle = grandMq.matches ? 'ordi' : 'mobile'
      const en = document.querySelector('header')
      entete = en ? Math.round(en.getBoundingClientRect().height) : 64
      sectionEl.style.setProperty('--entete', `${entete}px`)
      W = panneauEl.offsetWidth
      Hp = panneauEl.offsetHeight
      const rp = panneauEl.getBoundingClientRect()

      // Départ = le cadre de la version fixe : la photo entière couvre le panneau (ordinateur) ;
      // téléphone et tablette, la bande centrée sur la chaudière le couvre.
      if (cle === 'ordi') s0 = couvrir({ x: 0, y: 0, w: W, h: Hp }, 0.5, 0.5)
      else {
        const s = Math.max(W / BANDE_MOBILE.largeur, Hp / H)
        const centre = BANDE_MOBILE.x0 + BANDE_MOBILE.largeur / 2
        s0 = { s, fx: W / 2 + (FOYER.x - centre) * s, fy: (Hp - H * s) / 2 + FOYER.y * s }
      }

      // Arrivée : la chaudière entière. Ordinateur, à gauche du formulaire ; téléphone et tablette,
      // centrée, au-dessus de la barre du bas et de la dernière ligne.
      let zx0: number, zx1: number, zy0: number, zy1: number
      if (cle === 'ordi') {
        const f = formRef.current
        if (f) {
          const ancien = f.style.transform
          f.style.transform = ''
          gaucheForm = f.getBoundingClientRect().left - rp.left
          f.style.transform = ancien
        } else gaucheForm = W * 0.7
        zx0 = 24
        zx1 = gaucheForm - 32
        zy0 = 14
        zy1 = Hp - 48
      } else {
        zx0 = 8
        zx1 = W - 8
        zy0 = 10
        zy1 = Hp - (W < 768 ? 72 + 44 : 56)
      }
      const sFin = Math.min((zy1 - zy0) / CHAUDIERE.hauteur, (zx1 - zx0) / CHAUDIERE.largeur)
      // Jamais plus petit que le départ : on avance, on ne recule pas.
      const sf = Math.max(sFin, s0.s)
      sE = { s: sf, fx: (zx0 + zx1) / 2, fy: (zy0 + zy1) / 2 }

      // Fondu de fin (ordinateur) : de 260 px avant le bord droit de la photo (jamais sur la
      // chaudière) jusqu'à ce bord, puis plein jusqu'au formulaire.
      if (fonduRef.current) {
        const f = fonduRef.current.style
        if (cle === 'ordi' && W > 0) {
          const bord = ecran(sE, LARGEUR, 0)[0]
          const droiteChaudiere = ecran(sE, CHAUDIERE.x0 + CHAUDIERE.largeur, 0)[0]
          const debut = Math.max(droiteChaudiere + 60, Math.min(gaucheForm - 160, bord - 260))
          f.backgroundImage = fondu(debut / W, clamp(bord / W, debut / W + 0.05, 1))
        } else f.backgroundImage = ''
      }
      if (conclusionRef.current) {
        const l = conclusionRef.current.style
        if (cle === 'ordi') {
          l.left = `${zx0}px`
          l.width = `${zx1 - zx0}px`
        } else {
          l.left = ''
          l.width = ''
        }
      }
      echelle = 0
    }

    /** Pose un calque de largeur CSS `cssL` qui couvre `photoL` pixels de la photo depuis (x0, y0). */
    const poser = (el: HTMLElement | null, cam: Camera, x0: number, y0: number, photoL: number, cssL: number) => {
      if (!el) return
      const [x, y] = ecran(cam, x0, y0)
      el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${((cam.s * photoL) / cssL).toFixed(5)})`
    }

    let raf = 0
    let dernier = -1
    let dernierA = -1
    let dernierO = -1
    let dernierQ = -1
    const rendre = () => {
      raf = 0
      const rpiste = pisteEl.getBoundingClientRect()
      // La piste commence sous l'en-tête fixe et le panneau collé est repoussé de `entete` pixels :
      // il reste collé jusqu'à ce que le bas de la piste atteigne entete + Hp. Progression p = 0 au
      // repos (page non défilée), 1 quand le panneau se décolle.
      const y = -rpiste.top
      const course = Math.max(1, rpiste.height - Hp - entete)
      const p = clamp(y / course)
      if (p === dernier) return
      dernier = p
      const L = LIMITES[cle]

      // Texte, voile (et formulaire sur ordinateur) : au repos tout est plein et cliquable ; le fondu
      // ne commence qu'après 12 px de défilement et s'achève à 100 px, le texte monte un peu en s'effaçant.
      const f = clamp((y - 12) / 88)
      const opa = 1 - lisse(f)
      const formGlisse = cle === 'ordi' && p >= L.f0
      for (const el of cle === 'ordi' && !formGlisse ? [texteRef.current, formRef.current] : [texteRef.current]) {
        if (!el) continue
        el.style.opacity = opa.toFixed(3)
        el.style.transform = f > 0 ? `translateY(${(-18 * lisse(f)).toFixed(1)}px)` : ''
        el.style.visibility = opa < 0.02 ? 'hidden' : ''
        el.style.pointerEvents = opa < 0.6 ? 'none' : ''
      }
      if (cle === 'mobile' && formRef.current) formRef.current.removeAttribute('style')
      if (formGlisse && formRef.current) {
        const g = lisse(clamp((p - L.f0) / (L.f1 - L.f0)))
        const el = formRef.current
        el.style.opacity = g.toFixed(3)
        el.style.transform = g < 1 ? `translateX(${((1 - g) * (W - gaucheForm + 24)).toFixed(1)}px)` : ''
        el.style.visibility = g < 0.02 ? 'hidden' : ''
        el.style.pointerEvents = g < 0.9 ? 'none' : ''
      }
      if (voileRef.current) voileRef.current.style.opacity = opa.toFixed(3)

      // Caméra : avancée vers la chaudière, puis immobile.
      const cam: Camera = p <= L.p1 ? entre(s0, sE, hermite(p / L.p1, 0.4, 0)) : sE
      poser(photoRef.current, cam, 0, 0, LARGEUR, PHOTO_BLOC1.largeur)
      poser(photoMobileRef.current, cam, BANDE_MOBILE.x0, 0, BANDE_MOBILE.largeur, BANDE_MOBILE.largeur)
      poser(boiteRef.current, cam, CHAUDIERE.x0, CHAUDIERE.y0, LARGEUR_ECORCHE, LARGEUR_ECORCHE)
      if (cam.s / (echelle || 1) > 1.015 || cam.s / (echelle || 1) < 0.985 || !echelle) {
        echelle = cam.s
        if (boiteRef.current) echelleEcorche(boiteRef.current, cam.s)
      }

      // L'écorché : a = le trait se pose pendant la fin de l'avancée, o = ouverture, q = pièces.
      const a = clamp((p - L.p1 * 0.55) / (L.p1 * 0.45))
      const o = clamp((p - L.p1) / (L.p2 - L.p1))
      const q = clamp((p - L.p2) / (L.e1 - L.p2))
      if (boiteRef.current) boiteRef.current.style.visibility = p > L.p1 * 0.5 ? 'visible' : 'hidden'
      const aa = Math.round(a * 300) / 300
      const oo = Math.round(o * 400) / 400
      const qq = Math.round(q * 500) / 500
      if (boiteRef.current && (aa !== dernierA || oo !== dernierO || qq !== dernierQ)) {
        dernierA = aa
        dernierO = oo
        dernierQ = qq
        animerEcorche(boiteRef.current, aa, oo, qq)
      }

      if (fonduRef.current) {
        const v = cle === 'ordi' ? lisse(clamp((p - L.p1 * 0.6) / (L.p1 * 0.4))) : 0
        fonduRef.current.style.opacity = v.toFixed(3)
      }
      if (conclusionRef.current) {
        const v = lisse(clamp((q - 0.86) / 0.12))
        conclusionRef.current.style.opacity = v.toFixed(3)
        conclusionRef.current.style.transform = v < 1 ? `translateY(${(8 * (1 - v)).toFixed(1)}px)` : ''
      }
    }
    const planifier = () => {
      if (!raf) raf = requestAnimationFrame(rendre)
    }
    const surTaille = () => {
      mesurer()
      dernier = -1
      planifier()
    }

    mesurer()
    if (boiteRef.current) animerEcorche(boiteRef.current, 0, 0, 0)
    const ro = new ResizeObserver(surTaille)
    ro.observe(panneauEl)
    window.addEventListener('scroll', planifier, { passive: true })
    grandMq.addEventListener('change', surTaille)
    document.fonts?.ready.then(() => surTaille())
    rendre()
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', planifier)
      grandMq.removeEventListener('change', surTaille)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [mode])

  if (mode !== 'B') {
    return (
      <>
        {versionA}
        {mode === 'F' && <EcorcheFixe />}
      </>
    )
  }

  const { props: ph } = getImageProps({
    src: PHOTO_BLOC1.src,
    alt: '',
    width: PHOTO_BLOC1.largeur,
    height: PHOTO_BLOC1.hauteur,
    quality: QUALITE_BLOC1,
    sizes: TAILLES_BLOC1.ordi,
    priority: true,
  })
  const { props: pm } = getImageProps({
    src: BANDE_MOBILE.src,
    alt: '',
    width: BANDE_MOBILE.fichier.largeur,
    height: BANDE_MOBILE.fichier.hauteur,
    quality: QUALITE_BLOC1,
    sizes: TAILLES_BLOC1.mobile,
    priority: true,
  })
  const IMG = 'pointer-events-none absolute left-0 top-0 max-w-none origin-top-left select-none will-change-transform'
  return (
    <section ref={section} id="haut" aria-labelledby="titre-hero" data-hero-b="" data-sans-apparition="" className="plg relative isolate flex flex-col bg-fonte-nuit [overflow-x:clip] lg:block">
      <style>{CSS}</style>
      <div className="plg-calque contents lg:block">
        <div className="plg-colle contents lg:block">
          <div className="plg-cadre contents lg:flex lg:items-center lg:py-14">
            <div className={`contents ${GRILLE_ORDI}`}>
              <div className="plg-texte order-1 lg:col-start-1 lg:flex lg:flex-col lg:justify-center">
                <div ref={texteRef} className="plg-plein pointer-events-auto relative flex flex-col justify-center py-6 will-change-[opacity] lg:block lg:py-0">
                  {texte}
                </div>
              </div>
              {/* Téléphone : le haut du formulaire glisse sous la bande réservée à la barre du bas. */}
              <div
                ref={formRef}
                id="demande"
                className="relative z-10 order-3 -mt-14 scroll-mt-20 bg-fonte-nuit pb-10 pt-6 md:mt-0 md:pt-8 lg:pointer-events-auto lg:col-start-3 lg:flex lg:flex-col lg:justify-center lg:bg-transparent lg:p-0"
              >
                {formulaire}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={piste} className="plg-piste order-2">
        <div ref={panneau} className="plg-panneau bg-fonte-nuit">
          <div aria-hidden="true" className="absolute inset-0">
            <picture>
              <source media="(max-width: 1023px)" srcSet={RIEN} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img ref={photoRef} {...ph} alt="" className={`${IMG} hidden lg:block`} style={{ width: PHOTO_BLOC1.largeur, height: PHOTO_BLOC1.hauteur }} />
            </picture>
            <picture>
              <source media="(min-width: 1024px)" srcSet={RIEN} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img ref={photoMobileRef} {...pm} alt="" className={`${IMG} lg:hidden`} style={{ width: BANDE_MOBILE.largeur, height: H }} />
            </picture>
          </div>
          {/* Voile de l'écran 1, effacé avec le texte. */}
          <div ref={voileRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className={`absolute inset-0 lg:hidden ${VOILE_MOBILE}`} />
            <div className={`absolute inset-0 hidden lg:block ${VOILE_ORDI}`} />
          </div>
          {/* Fondu de fin, ordinateur : la photo se dissout dans le fond sous le formulaire. */}
          <div ref={fonduRef} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden opacity-0 lg:block" />
          {/* L'écorché, dans le repère de la photo, sur la chaudière. */}
          <EcorcheChaudiere boiteRef={boiteRef} style={{ visibility: 'hidden', width: LARGEUR_ECORCHE, height: HAUTEUR_ECORCHE }} />
          <p
            ref={conclusionRef}
            className="pointer-events-none absolute inset-x-4 bottom-[calc(72px+12px)] text-center font-titre text-[15px] font-medium leading-snug text-calcaire-neige opacity-0 md:bottom-5 md:text-base lg:inset-x-auto lg:bottom-5 lg:text-[17px]"
          >
            {CONCLUSION}
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * Repli (« réduire les animations », réseau lent) : l'écorché COMPLET et fixe, sous le bloc 1,
 * toutes ses étiquettes posées.
 */
export function EcorcheFixe() {
  const cadre = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = cadre.current
    if (!el) return
    const boite = el.querySelector<HTMLElement>('.eco')
    if (!boite) return
    const ro = new ResizeObserver(() => {
      const s = el.offsetWidth / LARGEUR_ECORCHE
      boite.style.transform = `scale(${s.toFixed(5)})`
      echelleEcorche(boite, s)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <section aria-label="Ce qu'il y a derrière la façade d'une chaudière" className="bg-fonte-nuit py-10 lg:py-14">
      <div className="mx-auto max-w-[340px] px-4">
        <div ref={cadre} className="relative w-full" style={{ aspectRatio: `${LARGEUR_ECORCHE} / ${HAUTEUR_ECORCHE}` }}>
          <EcorcheChaudiere fixe />
        </div>
        <p className="mt-6 text-center font-titre text-base font-medium leading-snug text-calcaire-neige">{CONCLUSION}</p>
      </div>
    </section>
  )
}
