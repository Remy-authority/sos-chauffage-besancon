import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteConfig } from '@/config/site.config'
import type { Zone } from '@/lib/content'

/**
 * Zone d'intervention, organisée par orientation réelle plutôt qu'en liste
 * alphabétique. Le visiteur cherche « est-ce que vous venez chez moi », pas un
 * index : le regroupement par point cardinal répond directement à la question et
 * donne à la section une lecture de carte.
 *
 * Les orientations proviennent des fiches commune (champ `orientation`), elles
 * ont été vérifiées une à une. Aucune n'est déduite à la volée.
 */
const ORDRE_CARDINAL = [
  'Nord',
  'Nord-est',
  'Nord-ouest',
  'Ouest',
  'Sud-ouest',
  'Sud-est',
] as const

export function CarteZones({ zones }: { zones: Zone[] }) {
  const groupes = ORDRE_CARDINAL.map((cardinal) => ({
    cardinal,
    communes: zones.filter((z) => z.orientation === cardinal),
  })).filter((g) => g.communes.length > 0)

  // Filet de sécurité : une commune sans orientation renseignée reste affichée.
  const sansOrientation = zones.filter(
    (z) => !z.orientation || !ORDRE_CARDINAL.includes(z.orientation as (typeof ORDRE_CARDINAL)[number]),
  )
  if (sansOrientation.length) {
    groupes.push({ cardinal: 'Autres communes' as never, communes: sansOrientation })
  }

  return (
    <section id="communes" className="plage bg-calcaire-voile" aria-labelledby="communes-titre">
      <div className="enceinte">
        <SectionHeader
          id="communes-titre"
          eyebrow="Zone d’intervention"
          title={
            <>
              {siteConfig.city}
              <br />
              et le Grand Besançon.
            </>
          }
          subtitle={`Nous couvrons ${siteConfig.city} dans tous ses quartiers, et ${zones.length} communes de l’agglomération qui disposent chacune de leur page. Si la vôtre n’y figure pas, appelez tout de même : la zone réelle est plus large que cette liste.`}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Le centre : Besançon */}
          <AnimatedSection className="grain relative overflow-hidden rounded-socle bg-fonte-nuit p-8 lg:col-span-4 lg:p-9">
            <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
            <div className="relative">
              <p className="surtitre text-laiton-clair">Ville de base</p>
              <h3 className="mt-4 text-titre-l text-calcaire-neige">{siteConfig.city}</h3>
              <p className="chiffre mt-1 text-legende text-calcaire-ombre">
                {siteConfig.legal.address.postalCode} · {siteConfig.departmentName} (
                {siteConfig.department})
              </p>
              <p className="mt-5 text-legende leading-relaxed text-calcaire-brume">
                Besançon n’a pas de page dédiée : c’est notre point de départ. Nous intervenons dans
                tous les quartiers, de la Boucle aux faubourgs.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-fonte-brut/70 pt-5 text-legende text-calcaire-ombre">
                {siteConfig.serviceArea.districts.map((quartier) => (
                  <li key={quartier}>{quartier}</li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Les communes, par orientation */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {groupes.map((groupe, i) => (
              <AnimatedSection
                key={groupe.cardinal}
                delay={Math.min(i, 4) * 0.05}
                className="rounded-socle border border-calcaire-pierre bg-calcaire-neige p-6"
              >
                <p className="surtitre flex items-center gap-2.5 text-laiton-patine">
                  <span aria-hidden="true" className="h-px w-4 bg-laiton-franc" />
                  {groupe.cardinal}
                </p>
                <ul className="mt-4 space-y-0">
                  {groupe.communes.map((commune) => (
                    <li key={commune.slug}>
                      <Link
                        href={`/zones/${commune.slug}`}
                        className="group flex items-baseline justify-between gap-3 border-b border-calcaire-pierre py-2.5 last:border-b-0"
                      >
                        <span className="font-titre text-[0.9375rem] font-medium text-fonte-nuit transition-colors group-hover:text-jura-dense">
                          {commune.name}
                        </span>
                        <span className="chiffre shrink-0 text-legende text-calcaire-ombre">
                          {commune.postalCode}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection className="mt-8">
          <Link
            href="/zones"
            className="group inline-flex items-center gap-2.5 font-titre text-[0.9375rem] font-medium text-jura-dense transition-colors hover:text-jura-franc"
          >
            <span aria-hidden="true" className="h-px w-7 bg-jura-franc" />
            Voir toutes les communes desservies
            <ArrowRight
              size={16}
              className="transition-transform duration-300 ease-thermique group-hover:translate-x-1"
            />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default CarteZones
