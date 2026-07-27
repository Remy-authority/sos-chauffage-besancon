import Link from 'next/link'
import { PhoneCall } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { Button } from '@/components/ui/Button'
import { HaloThermique } from '@/components/ui/HaloThermique'

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[78vh] items-center overflow-hidden bg-fonte-nuit px-6 pb-24 pt-32">
      <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
      <HaloThermique className="-left-24 top-1/4" teinte="jura" taille={420} />

      <div className="enceinte relative max-w-colonne">
        <p className="chiffre font-titre text-[5rem] font-semibold leading-none text-laiton-clair">
          404
        </p>
        <h1 className="mt-6 text-titre-l text-calcaire-neige">Cette page n’existe pas</h1>
        <p className="mt-4 max-w-lecture text-chapo text-calcaire-brume">
          Le lien est peut-être ancien ou mal recopié. Repartez de l’accueil, ou appelez-nous si le
          chauffage est à l’arrêt.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={`tel:${siteConfig.phone}`} variant="laiton" size="ample">
            <PhoneCall size={18} strokeWidth={2.2} />
            {siteConfig.phoneDisplay}
          </Button>
          <Button href="/" variant="verre" size="ample">
            Retour à l’accueil
          </Button>
        </div>
        <Link
          href="/zones"
          className="mt-8 inline-block text-legende text-calcaire-ombre transition-colors hover:text-laiton-clair"
        >
          Voir les communes desservies
        </Link>
      </div>
    </section>
  )
}
