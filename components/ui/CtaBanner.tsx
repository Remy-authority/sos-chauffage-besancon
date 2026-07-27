import { PhoneCall } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { LiveDot } from '@/components/ui/LiveDot'
import { HaloThermique } from '@/components/ui/HaloThermique'
import { siteConfig } from '@/config/site.config'

/**
 * Bandeau d'appel de fin de page. Il assure la transition du calcaire clair vers
 * le pied de page en fonte : c'est le dernier palier chaud avant le sombre.
 */
export function CtaBanner({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section id="appel" className="relative overflow-hidden bg-fonte-nuit">
      <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
      <HaloThermique className="-left-32 top-0" teinte="jura" taille={420} />
      <HaloThermique className="-right-24 bottom-0" teinte="laiton" taille={360} decalage={-9} />

      <div className="enceinte relative plage">
        <AnimatedSection className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <LiveDot>Ligne ouverte {siteConfig.availability}</LiveDot>

            <h2 className="mt-6 text-titre-l text-calcaire-neige md:text-titre-xl">
              {title ?? (
                <>
                  Le chauffage s’est arrêté ?<br />
                  <span className="mot-laiton">Décrivez, on diagnostique.</span>
                </>
              )}
            </h2>

            <p className="mt-5 max-w-lecture text-chapo text-calcaire-brume">
              {subtitle ??
                'Deux phrases suffisent : ce que fait l’appareil, depuis quand. Nous vous disons quelle piste tenir, ce que coûte l’intervention et quand nous pouvons passer.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button href={`tel:${siteConfig.phone}`} variant="laiton" size="ample">
              <PhoneCall size={18} strokeWidth={2.2} />
              {siteConfig.phoneDisplay}
            </Button>
            <Button href="/contact#formulaire" variant="verre" size="ample">
              Écrire ma demande
            </Button>
          </div>
        </AnimatedSection>

        <div aria-hidden="true" className="filet-laiton mt-12" />

        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-legende text-calcaire-ombre">
          <li>{siteConfig.availability}</li>
          <li>Tarif annoncé avant l’intervention</li>
          <li>Demande en ligne sans engagement</li>
        </ul>
      </div>
    </section>
  )
}

export default CtaBanner
