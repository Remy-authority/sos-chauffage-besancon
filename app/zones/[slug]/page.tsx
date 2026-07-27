import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin, PhoneCall } from 'lucide-react'
import { getServices, getZone, getZones } from '@/lib/content'
import { buildMetadata, jsonLdScript, zoneJsonLd } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ServiceBlock } from '@/components/ui/ServiceBlock'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { HaloThermique } from '@/components/ui/HaloThermique'

export const dynamicParams = false

export function generateStaticParams() {
  return getZones().map((z) => ({ slug: z.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const zone = getZone(params.slug)
  if (!zone) return {}
  return buildMetadata({
    title: zone.metaTitle,
    description: zone.metaDescription,
    path: `/zones/${zone.slug}`,
  })
}

/**
 * Visuel de tête d'une commune.
 *
 * Règle permanente du projet : l'image de tête est UNIQUE par commune, câblée
 * sur son slug (`public/zones/<slug>.jpg`). Les pools d'images partagées entre
 * plusieurs communes sont interdits, ils produisent des pages jumelles.
 *
 * Tant que le visuel dédié n'a pas été produit, on n'emprunte donc RIEN à une
 * autre commune : la page affiche à la place une plaque graphique construite sur
 * les données réelles de la commune (nom, code postal, orientation). Aucune
 * image cassée, aucun doublon visuel.
 */
function imageDediee(slug: string): string | null {
  return existsSync(join(process.cwd(), 'public', 'zones', `${slug}.jpg`))
    ? `/zones/${slug}.jpg`
    : null
}

export default function ZonePage({ params }: { params: { slug: string } }) {
  const zone = getZone(params.slug)
  if (!zone) notFound()

  const communes = getZones()
  const visuel = imageDediee(zone.slug)

  // Maillage : les prestations les plus demandées sur une commune résidentielle.
  const prestations = getServices()
    .filter((s) =>
      [
        'depannage-chaudiere-gaz',
        'depannage-chaudiere-fioul',
        'entretien-annuel-chaudiere',
        'depannage-ballon-eau-chaude',
      ].includes(s.slug),
    )
    .slice(0, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(zoneJsonLd(zone)) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Communes', path: '/zones' },
          { name: zone.name, path: `/zones/${zone.slug}` },
        ]}
      />

      <section className="grain relative overflow-hidden bg-fonte-nuit py-14 lg:py-20">
        <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
        <HaloThermique className="-right-24 -top-16" teinte="jura" taille={440} />
        <HaloThermique className="-bottom-20 left-1/4" teinte="laiton" taille={300} decalage={-8} />

        <div className="enceinte relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="surtitre flex items-center gap-2.5 text-laiton-clair">
              <MapPin size={15} aria-hidden="true" />
              <span className="chiffre">
                {zone.name} · {zone.postalCode}
              </span>
            </p>
            <h1 className="mt-5 text-titre-l text-calcaire-neige md:text-titre-xl">{zone.h1}</h1>
            <p className="mt-5 max-w-lecture text-chapo text-calcaire-brume">{zone.intro}</p>
            <div className="mt-8">
              <Button href={`tel:${siteConfig.phone}`} variant="laiton" size="ample">
                <PhoneCall size={18} strokeWidth={2.2} />
                {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            {visuel ? (
              <figure className="relative">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-socle border border-calcaire-neige/10">
                  <Image
                    src={visuel}
                    alt={zone.imageAlt ?? `${zone.name} (${zone.postalCode}), commune du Grand Besançon`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 460px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-center gap-2.5 text-legende text-calcaire-ombre">
                  <span aria-hidden="true" className="h-px w-5 shrink-0 bg-laiton-franc" />
                  {zone.orientation
                    ? `${zone.name}, ${zone.orientation.toLowerCase()} de ${siteConfig.city}`
                    : `${zone.name}, Grand Besançon`}
                </figcaption>
              </figure>
            ) : (
              /* Plaque de repérage, en attendant le visuel dédié de la commune. */
              <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-socle border border-calcaire-neige/10 bg-fonte-abysse/60 p-7">
                <div aria-hidden="true" className="trame-graduee-fine absolute inset-0 opacity-60" />
                <div className="relative">
                  <p className="surtitre text-calcaire-ombre">Commune desservie</p>
                  <p className="mt-3 font-titre text-titre-l font-semibold text-calcaire-neige">
                    {zone.name}
                  </p>
                </div>
                <dl className="relative grid grid-cols-2 gap-4 border-t border-fonte-brut/70 pt-5 text-legende">
                  <div>
                    <dt className="text-calcaire-roche">Code postal</dt>
                    <dd className="chiffre mt-1 font-medium text-laiton-clair">
                      {zone.postalCode}
                    </dd>
                  </div>
                  {zone.orientation && (
                    <div>
                      <dt className="text-calcaire-roche">Position</dt>
                      <dd className="mt-1 font-medium text-calcaire-neige">
                        {zone.orientation} de {siteConfig.city}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      <article className="bg-calcaire-neige py-14 lg:py-20">
        <div className="enceinte max-w-colonne">
          {zone.blocks.length > 0 && (
            <div className="corps-edito space-y-10">
              {zone.blocks.map((bloc) => (
                <ServiceBlock key={bloc.heading} block={bloc} />
              ))}
            </div>
          )}

          <AnimatedSection className="mt-14">
            <h2 className="text-titre-m">Nos prestations à {zone.name}</h2>
            <ul className="mt-5 border-t border-calcaire-pierre">
              {prestations.map((prestation) => (
                <li key={prestation.slug}>
                  <Link
                    href={`/services/${prestation.slug}`}
                    className="group flex items-center gap-4 border-b border-calcaire-pierre py-4 transition-colors hover:bg-calcaire-voile"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-module border border-calcaire-brume text-jura-franc transition-colors group-hover:border-laiton-franc/50 group-hover:text-laiton-patine">
                      <ServiceIcon icon={prestation.icon} className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <span className="flex-1 font-titre font-medium text-fonte-nuit transition-colors group-hover:text-jura-dense">
                      {prestation.navTitle}
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-calcaire-ombre transition-all duration-300 ease-thermique group-hover:translate-x-1 group-hover:text-laiton-patine"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {zone.neighbours.length > 0 && (
            <AnimatedSection className="mt-14">
              <h2 className="text-titre-m">Autres communes desservies dans le secteur</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {zone.neighbours.map((voisine) => {
                  const page = communes.find((c) => c.name === voisine)
                  return (
                    <li key={voisine}>
                      {page ? (
                        <Link
                          href={`/zones/${page.slug}`}
                          className="inline-flex rounded-module border border-calcaire-brume bg-calcaire-voile px-3.5 py-2 text-legende text-calcaire-basalte transition-colors hover:border-jura-franc hover:text-jura-dense"
                        >
                          {voisine}
                        </Link>
                      ) : (
                        <span className="inline-flex rounded-module border border-calcaire-pierre bg-calcaire-voile px-3.5 py-2 text-legende text-calcaire-roche">
                          {voisine}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </AnimatedSection>
          )}
        </div>
      </article>

      <Faq items={zone.faq} eyebrow={zone.name} />

      <CtaBanner
        title={`Panne de chauffage à ${zone.name} ?`}
        subtitle={`Nous intervenons à ${zone.name} et dans les communes voisines. Appelez, nous vous donnons la piste, le tarif et un créneau réaliste.`}
      />
    </>
  )
}
