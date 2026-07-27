'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, PhoneCall } from 'lucide-react'
import { COURBE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

/**
 * Rappel d'action flottant, apparaît après 600 px de défilement.
 *
 * Traitement T3 : sur desktop, une barrette horizontale ancrée en bas à droite
 * (plaque à coins courts, filet laiton) plutôt que des pastilles rondes. Sur
 * mobile, une barre pleine largeur où l'appel occupe les deux tiers.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const auScroll = () => setVisible(window.scrollY > 600)
    auScroll()
    window.addEventListener('scroll', auScroll, { passive: true })
    return () => window.removeEventListener('scroll', auScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: COURBE }}
            className="fixed bottom-7 right-7 z-40 hidden items-stretch overflow-hidden rounded-module border border-laiton-franc/40 bg-fonte-abysse/95 shadow-releve backdrop-blur lg:flex"
          >
            <a
              href={`tel:${siteConfig.phone}`}
              className="group flex items-center gap-2.5 bg-laiton-franc px-5 py-3.5 font-semibold text-fonte-abysse transition-colors hover:bg-laiton-clair"
            >
              <PhoneCall size={17} strokeWidth={2.3} />
              <span className="chiffre">{siteConfig.phoneDisplay}</span>
            </a>
            <a
              href="/contact#formulaire"
              className="flex items-center gap-2 px-5 py-3.5 text-legende font-medium text-calcaire-brume transition-colors hover:text-laiton-clair"
            >
              <FileText size={15} />
              Décrire ma panne
            </a>
          </motion.div>

          {/* Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: COURBE }}
            className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-fonte-brut bg-fonte-abysse/95 p-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
          >
            <a
              href={`tel:${siteConfig.phone}`}
              className="chiffre flex min-h-[52px] flex-[2] items-center justify-center gap-2 rounded-module bg-laiton-franc px-4 font-semibold text-fonte-abysse"
            >
              <PhoneCall size={18} strokeWidth={2.3} />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href="/contact#formulaire"
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-module border border-calcaire-neige/20 px-4 text-legende font-semibold text-calcaire-neige"
            >
              <FileText size={15} />
              Demande
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default StickyCTA
