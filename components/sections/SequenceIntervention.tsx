'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CoupeIntervention, { ETAT_FIXE, MIEL } from '@/components/ui/CoupeIntervention'
import { ETAPES } from '@/components/ui/intervention-etapes'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Bloc 3 de l'accueil : le déroulé du dépannage chez le client, en scrollytelling
 * (#R66) : cadre fixe, le dessin avance avec le doigt ou la molette, les six temps
 * s'allument un à un, barre de progression jaune miel. Modèle : lorient-maconnerie
 * `SequenceFondations.tsx`, réécrit sur les tokens T3.
 *
 * Avec « réduire les animations » : liste des six temps et dessin à l'état final.
 */
const COURSE = 0.42
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const pad2 = (n: number) => String(n).padStart(2, '0')

export function SequenceIntervention() {
  const N = ETAPES.length
  const racine = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const hautRef = useRef(96)
  const [mode, setMode] = useState<'anime' | 'fixe'>('anime')
  const [serre, setSerre] = useState(false)
  const [cur, setCur] = useState(0)
  const [haut, setHaut] = useState(96)

  useIsoLayoutEffect(() => {
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)')
    const etroit = window.matchMedia('(max-width: 1023px)')
    const surMode = () => setMode(reduit.matches ? 'fixe' : 'anime')
    const surLargeur = () => setSerre(etroit.matches)
    surMode()
    surLargeur()
    reduit.addEventListener('change', surMode)
    etroit.addEventListener('change', surLargeur)
    return () => {
      reduit.removeEventListener('change', surMode)
      etroit.removeEventListener('change', surLargeur)
    }
  }, [])

  useEffect(() => {
    if (mode !== 'anime') return
    let cadre = 0

    const mesurer = () => {
      const sc = scene.current
      if (!sc) return
      const vh = window.innerHeight
      const entete = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      const barre = window.innerWidth < 1024 ? document.querySelector<HTMLElement>('[data-barre-fixe]')?.getBoundingClientRect().height ?? 0 : 0
      const h = sc.getBoundingClientRect().height
      const top = entete + Math.max(8, (vh - entete - barre - h) / 2)
      hautRef.current = top
      setHaut(top)
    }

    const calculer = () => {
      const r = racine.current?.getBoundingClientRect()
      const sc = scene.current?.getBoundingClientRect()
      if (!r || !sc) return
      const total = Math.max(1, r.height - sc.height)
      const avancement = clamp((hautRef.current - r.top) / total, 0, 1)
      const q = clamp(avancement / 0.9, 0, 1) * (N - 1)
      setCur(Math.min(N - 1, Math.floor(q + 0.35)))
    }

    const surDefilement = () => {
      if (cadre) return
      cadre = window.requestAnimationFrame(() => {
        cadre = 0
        calculer()
      })
    }
    const surTaille = () => {
      mesurer()
      calculer()
    }

    mesurer()
    calculer()
    window.addEventListener('scroll', surDefilement, { passive: true })
    window.addEventListener('resize', surTaille)
    const ro = scene.current ? new ResizeObserver(surTaille) : null
    if (scene.current && ro) ro.observe(scene.current)
    return () => {
      window.removeEventListener('scroll', surDefilement)
      window.removeEventListener('resize', surTaille)
      ro?.disconnect()
      if (cadre) window.cancelAnimationFrame(cadre)
    }
  }, [mode, N])

  return (
    <section id="deroule" className="plage bg-calcaire-voile" aria-labelledby="deroule-titre" data-sans-apparition>
      <div className="enceinte">
        <SectionHeader
          id="deroule-titre"
          align="center"
          eyebrow="Chez vous"
          title="Comment se déroule le dépannage"
          subtitle="Six temps, toujours dans le même ordre, de votre appel à la remise en route."
        />
      </div>

      {mode === 'fixe' ? (
        <div className="enceinte mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:items-stretch">
          <ol className="space-y-6 lg:flex lg:flex-col lg:justify-center">
            {ETAPES.map((e, k) => (
              <li key={e.titre} className="grid grid-cols-[2.5rem_1fr] gap-3">
                <span className="chiffre font-titre text-sm text-laiton-patine">{pad2(k + 1)}</span>
                <div>
                  <h3 className="font-titre text-titre-s text-fonte-abysse">{e.titre}</h3>
                  <p className="mt-1.5 text-lecture text-calcaire-basalte">{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
          <CoupeIntervention serre={serre} etape={ETAT_FIXE} className="h-auto w-full" />
        </div>
      ) : (
        <div ref={racine} className="relative mt-8 lg:mt-12">
          <div ref={scene} className="sticky" style={{ top: haut }}>
            <div className="enceinte grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:items-stretch lg:gap-12">
              <div className="order-2 lg:order-1 lg:flex lg:flex-col lg:justify-center">
                <p className="chiffre font-titre text-sm text-laiton-patine" aria-hidden="true">
                  {pad2(cur + 1)} / {pad2(N)}
                </p>
                <div className="mt-3 grid min-h-[7.5rem] lg:min-h-[9rem]">
                  {ETAPES.map((e, k) => (
                    <div
                      key={e.titre}
                      className="[grid-area:1/1] transition-opacity duration-300"
                      style={{ opacity: k === cur ? 1 : 0 }}
                      aria-current={k === cur ? 'step' : undefined}
                    >
                      <h3 className="font-titre text-titre-m text-fonte-abysse">{e.titre}</h3>
                      <p className="mt-3 text-lecture text-calcaire-basalte">{e.texte}</p>
                    </div>
                  ))}
                </div>
                <div className="relative mt-6 h-1 w-full bg-calcaire-pierre" aria-hidden="true">
                  <div
                    className="absolute inset-y-0 left-0 w-full origin-left transition-transform duration-300"
                    style={{ transform: `scaleX(${(cur + 1) / N})`, backgroundColor: MIEL }}
                  />
                  {ETAPES.map((_, k) => (
                    <span
                      key={k}
                      className="absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-fonte-abysse/40"
                      style={{ left: `${((k + 1) / N) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="order-1 mx-auto w-full max-w-[min(100%,calc((100svh-330px)*1.1))] lg:order-2 lg:max-w-none">
                <CoupeIntervention serre={serre} etape={cur} className="h-auto w-full" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" style={{ height: `${N * COURSE * 100}svh` }} />
        </div>
      )}
    </section>
  )
}

export default SequenceIntervention
