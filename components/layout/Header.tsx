'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, PhoneCall, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { COURBE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

export type NavService = { slug: string; navTitle: string }
export type NavZone = { slug: string; name: string }

/** Les trois prestations et les trois communes mises en avant dans les menus. */
const PRESTATIONS_MENU = ['depannage-chaudiere-gaz', 'depannage-ballon-eau-chaude', 'depannage-pompe-chaleur']
const COMMUNES_MENU = ['besancon', 'saint-vit', 'thise']

type Menu = { cle: string; libelle: string; liens: { href: string; label: string }[]; tout: { href: string; label: string } }

/**
 * En-tête fixe, template T3 (réécrit à la mise à jour n°1, 18/10/2026, #R33).
 *
 * Deux états : transparent sur les en-têtes sombres, puis « posé » au scroll.
 * Deux menus déroulants, Prestations et Communes, trois liens + « voir tout »
 * chacun, sur ordinateur (survol) ET au téléphone (accordéons). Le bouton
 * téléphone garde la logique du site (numéro de démonstration), il n'est pas touché.
 */
export function Header({ services, zones }: { services: NavService[]; zones: NavZone[] }) {
  const [defile, setDefile] = useState(false)
  const [mobileOuvert, setMobileOuvert] = useState(false)
  const [ouvert, setOuvert] = useState<string | null>(null)
  const [deplies, setDeplies] = useState<Record<string, boolean>>({})
  const chemin = usePathname()

  useEffect(() => {
    const auScroll = () => setDefile(window.scrollY > 24)
    auScroll()
    window.addEventListener('scroll', auScroll, { passive: true })
    return () => window.removeEventListener('scroll', auScroll)
  }, [])

  useEffect(() => {
    setMobileOuvert(false)
    setOuvert(null)
    setDeplies({})
  }, [chemin])

  const choisir = <T extends { slug: string }>(liste: T[], slugs: string[]) =>
    slugs.map((s) => liste.find((x) => x.slug === s)).filter((x): x is T => Boolean(x))

  const menus: Menu[] = [
    {
      cle: 'prestations',
      libelle: 'Prestations',
      liens: choisir(services, PRESTATIONS_MENU).map((s) => ({ href: `/services/${s.slug}`, label: s.navTitle })),
      tout: { href: '/services', label: 'Voir toutes les prestations' },
    },
    {
      cle: 'communes',
      libelle: 'Communes',
      liens: choisir(zones, COMMUNES_MENU).map((z) => ({ href: `/zones/${z.slug}`, label: z.name })),
      tout: { href: '/zones', label: 'Voir toutes les communes' },
    },
  ]

  const liens = [
    { href: '/conseils', label: 'Conseils' },
    { href: '/contact', label: 'Contact' },
  ]

  const hautClair = /^\/(zones|services|conseils|tarifs|contact)(\/[^/]+)?\/?$/.test(chemin)
  const pose = defile || mobileOuvert || hautClair

  const tonLien = pose ? 'text-fonte-nuit hover:text-jura-franc' : 'text-calcaire-brume hover:text-laiton-clair'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-thermique ${
        pose ? 'bg-calcaire-neige/90 backdrop-blur-xl' : 'bg-gradient-to-b from-fonte-abysse/70 to-transparent'
      }`}
    >
      <div className="enceinte flex items-center justify-between gap-6 py-3">
        <Link href="/" aria-label={`${siteConfig.businessName}, accueil`} className="transition-opacity hover:opacity-80">
          <Logo tone={pose ? 'dark' : 'light'} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
          {menus.map((m) => (
            <div key={m.cle} className="relative" onMouseEnter={() => setOuvert(m.cle)} onMouseLeave={() => setOuvert(null)}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={ouvert === m.cle}
                aria-controls={`menu-${m.cle}`}
                onClick={() => setOuvert((v) => (v === m.cle ? null : m.cle))}
                className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${tonLien}`}
              >
                {m.libelle}
                <ChevronDown size={15} className={`transition-transform duration-300 ease-thermique ${ouvert === m.cle ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {ouvert === m.cle && (
                  <motion.div
                    id={`menu-${m.cle}`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: COURBE }}
                    className="absolute left-0 top-full z-10 w-72 pt-3"
                  >
                    <ul className="rounded-plaque border border-calcaire-pierre bg-calcaire-neige p-2 shadow-releve">
                      {m.liens.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="block rounded-plaque px-4 py-2.5 font-titre text-[0.9375rem] font-medium text-fonte-nuit transition-colors hover:bg-calcaire-voile hover:text-jura-dense">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-calcaire-pierre pt-1">
                        <Link href={m.tout.href} className="block rounded-plaque px-4 py-2.5 text-sm font-semibold text-laiton-patine transition-colors hover:bg-calcaire-voile">
                          {m.tout.label}
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {liens.map((lien) => (
            <Link key={lien.href} href={lien.href} className={`group relative py-2 text-sm font-medium transition-colors ${tonLien}`}>
              {lien.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-laiton-franc transition-all duration-300 ease-thermique group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Button href={`tel:${siteConfig.phone}`} variant="laiton" size="compact">
            <PhoneCall size={15} strokeWidth={2.2} />
            {siteConfig.phoneDisplay}
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOuvert}
          onClick={() => setMobileOuvert((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-module transition-colors lg:hidden ${
            pose ? 'bg-fonte-abysse text-calcaire-neige' : 'bg-calcaire-neige/10 text-calcaire-neige'
          }`}
        >
          {mobileOuvert ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <span
        aria-hidden="true"
        className={`block h-px w-full bg-gradient-to-r from-transparent via-laiton-franc/45 to-transparent transition-opacity duration-500 ${pose ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Menu mobile : deux accordéons + liens simples + téléphone */}
      <AnimatePresence>
        {mobileOuvert && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: COURBE }}
            className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-calcaire-pierre bg-calcaire-neige lg:hidden"
          >
            <nav className="flex flex-col px-6 py-5" aria-label="Navigation mobile">
              {menus.map((m) => (
                <div key={m.cle}>
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={!!deplies[m.cle]}
                    aria-controls={`menu-mobile-${m.cle}`}
                    onClick={() => setDeplies((v) => ({ ...v, [m.cle]: !v[m.cle] }))}
                    className="flex w-full items-center justify-between border-b border-calcaire-pierre py-3.5 text-base font-medium text-fonte-nuit"
                  >
                    {m.libelle}
                    <ChevronDown size={18} className={`transition-transform duration-300 ease-thermique ${deplies[m.cle] ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {deplies[m.cle] && (
                      <motion.div
                        id={`menu-mobile-${m.cle}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: COURBE }}
                        className="overflow-hidden"
                      >
                        <div className="border-l border-laiton-franc/40 pl-4">
                          {m.liens.map((l) => (
                            <Link key={l.href} href={l.href} className="block py-2.5 text-legende text-calcaire-basalte transition-colors hover:text-jura-franc">
                              {l.label}
                            </Link>
                          ))}
                          <Link href={m.tout.href} className="block py-2.5 text-legende font-semibold text-laiton-patine">
                            {m.tout.label}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {liens.map((lien) => (
                <Link key={lien.href} href={lien.href} className="border-b border-calcaire-pierre py-3.5 text-base font-medium text-fonte-nuit transition-colors hover:text-jura-franc">
                  {lien.label}
                </Link>
              ))}

              <Button href={`tel:${siteConfig.phone}`} variant="laiton" size="normal" className="mt-6">
                <PhoneCall size={17} strokeWidth={2.2} />
                {siteConfig.phoneDisplay}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
