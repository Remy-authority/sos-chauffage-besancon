import Link from 'next/link'
import type { Metadata } from 'next'
import { Check, PhoneCall } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/Button'
import { HaloThermique } from '@/components/ui/HaloThermique'

// Page utilitaire post-soumission → noindex.
export const metadata: Metadata = buildMetadata({
  title: 'Demande reçue',
  description: 'Votre demande a bien été reçue.',
  path: '/merci',
  noindex: true,
})

export default function MerciPage() {
  return (
    <section className="grain relative flex min-h-[78vh] items-center overflow-hidden bg-fonte-nuit px-6 pb-24 pt-32">
      <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
      <HaloThermique className="-left-20 top-1/4" teinte="jura" taille={420} />
      <HaloThermique className="-right-16 bottom-0" teinte="laiton" taille={320} decalage={-6} />

      <div className="enceinte relative max-w-colonne">
        <span className="flex h-14 w-14 items-center justify-center rounded-module bg-laiton-franc text-fonte-abysse">
          <Check size={26} strokeWidth={2.6} aria-hidden="true" />
        </span>
        <h1 className="mt-7 text-titre-l text-calcaire-neige md:text-titre-xl">Demande reçue</h1>
        <p className="mt-5 max-w-lecture text-chapo text-calcaire-brume">
          Nous vous rappelons dès que possible. Si le logement se refroidit d’ici là, ne patientez
          pas : appelez directement, la ligne est ouverte {siteConfig.availability}.
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
          href="/conseils"
          className="mt-8 inline-block text-legende text-calcaire-ombre transition-colors hover:text-laiton-clair"
        >
          Lire nos conseils chauffage
        </Link>
      </div>
    </section>
  )
}
