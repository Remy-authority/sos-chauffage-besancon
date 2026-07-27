import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { siteConfig } from '@/config/site.config'

/**
 * Signature de l'artisan, version compacte pour les pages prestation.
 *
 * Volontairement discrète : un bandeau d'une seule ligne de hauteur, en fin de
 * corps éditorial, là où le lecteur vient de comprendre la prestation et se
 * demande à qui il la confie. Pas de récit, pas de citation, pas de second
 * portrait plein cadre : ces éléments restent réservés à la section d'accueil,
 * sinon le persona finit par occuper plus de place que le contenu utile.
 */
export function SignatureArtisan({ prestation }: { prestation?: string }) {
  const { persona, phone, phoneDisplay, city } = siteConfig
  const prenom = persona.nom.split(' ')[0]

  return (
    <AnimatedSection className="mt-14 rounded-socle border border-calcaire-pierre bg-calcaire-voile p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Point focal calé sur le visage : un cadrage haut prendrait le plafond
            de la chaufferie plutôt que l'artisan. */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-module border border-calcaire-brume">
          <Image
            src={persona.photo}
            alt={persona.photoAlt}
            fill
            sizes="64px"
            className="object-cover object-[center_28%]"
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-lecture text-calcaire-basalte">
            {prestation ? `${prestation} à ${city} : ` : ''}
            c’est <span className="font-medium text-fonte-abysse">{persona.nom}</span> qui prend
            l’appel, et c’est {prenom} qui intervient.
          </p>
          <Link
            href="/#artisan"
            className="group mt-1.5 inline-flex items-center gap-2 text-legende font-medium text-jura-dense transition-colors hover:text-jura-franc"
          >
            Qui intervient chez vous
            <ArrowRight
              size={14}
              className="transition-transform duration-300 ease-thermique group-hover:translate-x-1"
            />
          </Link>
        </div>

        <a
          href={`tel:${phone}`}
          className="chiffre inline-flex shrink-0 items-center gap-2.5 rounded-module bg-laiton-franc px-5 py-3 font-semibold text-fonte-abysse transition-colors hover:bg-laiton-clair"
        >
          <PhoneCall size={16} strokeWidth={2.3} />
          {phoneDisplay}
        </a>
      </div>
    </AnimatedSection>
  )
}

export default SignatureArtisan
