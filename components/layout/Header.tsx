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

/**
 * En-tête fixe, template T3.
 *
 * Deux états : transparent sur les en-têtes sombres, puis « posé » au scroll,
 * avec un filet laiton qui se dessine sous la barre. Le menu des prestations
 * s'ouvre en panneau plein-largeur (et non en petite liste flottante) : les huit
 * prestations tiennent en deux colonnes, avec le numéro d'ordre en repère.
 */
export function Header({ services }: { services: NavService[] }) {
  const [defile, setDefile] = useState(false)
  const [mobileOuvert, setMobileOuvert] = useState(false)
  const [panneauOuvert, setPanneauOuvert] = useState(false)
  const [mobilePrestations, setMobilePrestations] = useState(false)
  const chemin = usePathname()

  useEffect(() => {
    const auScroll = () => setDefile(window.scrollY > 24)
    auScroll()
    window.addEventListener('scroll', auScroll, { passive: true })
    return () => window.removeEventListener('scroll', auScroll)
  }, [])

  // Fermer les panneaux à chaque changement de page.
  useEffect(() => {
    setMobileOuvert(false)
    setPanneauOuvert(false)
    setMobilePrestations(false)
  }, [chemin])

  const liens = [
    { href: '/zones', label: 'Communes' },
    { href: '/conseils', label: 'Conseils' },
    { href: '/contact', label: 'Contact' },
  ]

  // Les pages détail commune / prestation / conseil démarrent sur un fil d'Ariane
  // clair : l'en-tête doit y être posé dès le chargement.
  const hautClair = /^\/(zones|services|conseils)\/[^/]+\/?$/.test(chemin)
  const pose = defile || mobileOuvert || hautClair

  const tonLien = pose
    ? 'text-fonte-nuit hover:text-jura-franc'
    : 'text-calcaire-brume hover:text-laiton-clair'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-thermique ${
        pose
          ? 'bg-calcaire-neige/90 backdrop-blur-xl'
          : 'bg-gradient-to-b from-fonte-abysse/70 to-transparent'
      }`}
    >
      <div className="enceinte flex items-center justify-between gap-6 py-3">
        <Link
          href="/"
          aria-label={`${siteConfig.businessName}, accueil`}
          className="transition-opacity hover:opacity-80"
        >
          <Logo tone={pose ? 'dark' : 'light'} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
          <div onMouseEnter={() => setPanneauOuvert(true)} onMouseLeave={() => setPanneauOuvert(false)}>
            <button
              type="button"
              aria-expanded={panneauOuvert}
              onClick={() => setPanneauOuvert((v) => !v)}
              className={`group flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${tonLien}`}
            >
              Prestations
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ease-thermique ${
                  panneauOuvert ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className={`group relative py-2 text-sm font-medium transition-colors ${tonLien}`}
            >
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

      {/* Filet laiton révélé une fois l'en-tête posé */}
      <span
        aria-hidden="true"
        className={`block h-px w-full bg-gradient-to-r from-transparent via-laiton-franc/45 to-transparent transition-opacity duration-500 ${
          pose ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panneau prestations, desktop */}
      <AnimatePresence>
        {panneauOuvert && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: COURBE }}
            onMouseEnter={() => setPanneauOuvert(true)}
            onMouseLeave={() => setPanneauOuvert(false)}
            className="hidden border-b border-calcaire-pierre bg-calcaire-neige/95 backdrop-blur-xl lg:block"
          >
            <div className="enceinte grid grid-cols-2 gap-x-10 py-7">
              {services.map((service, i) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-baseline gap-4 border-b border-calcaire-pierre/70 py-3 transition-colors last:border-b-0 even:last:border-b-0 hover:text-jura-franc"
                >
                  <span className="chiffre text-legende text-calcaire-ombre transition-colors group-hover:text-laiton-patine">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-titre text-[0.9375rem] font-medium text-fonte-nuit transition-colors group-hover:text-jura-dense">
                    {service.navTitle}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile */}
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
              <button
                type="button"
                aria-expanded={mobilePrestations}
                onClick={() => setMobilePrestations((v) => !v)}
                className="flex items-center justify-between border-b border-calcaire-pierre py-3.5 text-base font-medium text-fonte-nuit"
              >
                Prestations
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ease-thermique ${
                    mobilePrestations ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {mobilePrestations && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: COURBE }}
                    className="overflow-hidden"
                  >
                    <div className="border-l border-laiton-franc/40 pl-4">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block py-2.5 text-legende text-calcaire-basalte transition-colors hover:text-jura-franc"
                        >
                          {service.navTitle}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {liens.map((lien) => (
                <Link
                  key={lien.href}
                  href={lien.href}
                  className="border-b border-calcaire-pierre py-3.5 text-base font-medium text-fonte-nuit transition-colors hover:text-jura-franc"
                >
                  {lien.label}
                </Link>
              ))}

              <Button
                href={`tel:${siteConfig.phone}`}
                variant="laiton"
                size="normal"
                className="mt-6"
              >
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
