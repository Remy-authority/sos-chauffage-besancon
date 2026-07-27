import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { getRelatedArticles, getService, getServices, getZones } from '@/lib/content'
import { buildMetadata, jsonLdScript, serviceJsonLd } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { ServiceQuickFacts } from '@/components/ui/ServiceQuickFacts'
import { ServiceBlock } from '@/components/ui/ServiceBlock'
import { SignatureArtisan } from '@/components/ui/SignatureArtisan'
import { HaloThermique } from '@/components/ui/HaloThermique'

// 100 % SSG : une page statique par prestation.
export const dynamicParams = false

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug)
  if (!service) return {}
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    ogImage: service.image,
  })
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  if (!service) notFound()

  const liees = getServices().filter((s) => service.relatedServices.includes(s.slug))
  const articles = getRelatedArticles(service.slug)
  const communes = getZones().slice(0, 8)
  const premiereImage = service.blocks.findIndex((b) => b.image)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(serviceJsonLd(service)) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Prestations', path: '/#prestations' },
          { name: service.navTitle, path: `/services/${service.slug}` },
        ]}
      />

      {/* En-tête de la prestation */}
      <section className="grain relative overflow-hidden bg-fonte-nuit py-14 lg:py-20">
        <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
        <HaloThermique className="-right-24 -top-16" teinte="jura" taille={440} />
        <HaloThermique className="-bottom-20 left-1/4" teinte="laiton" taille={300} decalage={-8} />

        <div className="enceinte relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-module border border-laiton-franc/40 bg-laiton-franc/10 text-laiton-clair">
              <ServiceIcon icon={service.icon} className="h-[1.35rem] w-[1.35rem]" />
            </span>
            <h1 className="mt-6 text-titre-l text-calcaire-neige md:text-titre-xl">{service.h1}</h1>
            <p className="mt-5 max-w-lecture text-chapo text-calcaire-brume">{service.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`tel:${siteConfig.phone}`} variant="laiton" size="ample">
                <PhoneCall size={18} strokeWidth={2.2} />
                {siteConfig.phoneDisplay}
              </Button>
              <Button href="/contact#formulaire" variant="verre" size="ample">
                Décrire ma situation
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            {service.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-socle border border-calcaire-neige/10">
                <Image
                  src={service.image}
                  alt={service.h1}
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              /* Pas de visuel dédié : on remplit la colonne avec les repères de la
                 prestation plutôt que de laisser un vide asymétrique. */
              <div className="relative overflow-hidden rounded-socle border border-calcaire-neige/10 bg-fonte-abysse/45 p-7">
                <div aria-hidden="true" className="trame-graduee-fine absolute inset-0 opacity-60" />
                <div className="relative">
                  <p className="surtitre text-calcaire-ombre">Ce qu’il faut retenir</p>
                  <ol className="mt-5 border-t border-fonte-brut/70">
                    {service.bullets.map((repere, i) => (
                      <li
                        key={repere}
                        className="flex items-baseline gap-4 border-b border-fonte-brut/70 py-3.5"
                      >
                        <span className="chiffre shrink-0 font-titre text-legende text-laiton-patine">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-titre text-[0.9375rem] font-medium text-calcaire-neige">
                          {repere}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 text-legende leading-relaxed text-calcaire-ombre">
                    Sur {siteConfig.city} et les communes du Grand Besançon, ligne ouverte{' '}
                    {siteConfig.availability}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <article className="bg-calcaire-neige py-14 lg:py-20">
        <div className="enceinte max-w-colonne">
          {/* Les repères ne sont rappelés ici que si l'en-tête porte un visuel :
              sinon ils occupent déjà la colonne de droite, inutile de les répéter. */}
          {service.image && <ServiceQuickFacts bullets={service.bullets} />}

          {service.blocks.length > 0 && (
            <div className="corps-edito space-y-10">
              {service.blocks.map((bloc, i) => (
                <ServiceBlock key={bloc.heading} block={bloc} eager={i === premiereImage} />
              ))}
            </div>
          )}

          <SignatureArtisan prestation={service.navTitle} />

          {liees.length > 0 && (
            <AnimatedSection className="mt-16">
              <h2 className="text-titre-m">Prestations liées</h2>
              <ul className="mt-5 border-t border-calcaire-pierre">
                {liees.map((liee) => (
                  <li key={liee.slug}>
                    <Link
                      href={`/services/${liee.slug}`}
                      className="group flex items-center gap-4 border-b border-calcaire-pierre py-4 transition-colors hover:bg-calcaire-voile"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-module border border-calcaire-brume text-jura-franc transition-colors group-hover:border-laiton-franc/50 group-hover:text-laiton-patine">
                        <ServiceIcon icon={liee.icon} className="h-[1.1rem] w-[1.1rem]" />
                      </span>
                      <span className="flex-1 font-titre font-medium text-fonte-nuit transition-colors group-hover:text-jura-dense">
                        {liee.navTitle}
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
          )}

          <AnimatedSection className="mt-14">
            <h2 className="text-titre-m">Cette prestation, près de chez vous</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {communes.map((commune) => (
                <li key={commune.slug}>
                  <Link
                    href={`/zones/${commune.slug}`}
                    className="inline-flex rounded-module border border-calcaire-brume bg-calcaire-voile px-3.5 py-2 text-legende text-calcaire-basalte transition-colors hover:border-jura-franc hover:text-jura-dense"
                  >
                    {commune.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/zones"
                  className="inline-flex rounded-module border border-jura-franc bg-jura-franc/10 px-3.5 py-2 text-legende font-medium text-jura-dense transition-colors hover:bg-jura-franc/15"
                >
                  Toutes les communes
                </Link>
              </li>
            </ul>
          </AnimatedSection>

          {articles.length > 0 && (
            <AnimatedSection className="mt-14 rounded-socle border border-calcaire-pierre bg-calcaire-voile p-7">
              <h2 className="text-titre-s">À lire aussi</h2>
              <ul className="mt-4 space-y-2">
                {articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/conseils/${article.slug}`}
                      className="font-medium text-jura-dense underline decoration-jura-mousse underline-offset-4 hover:text-jura-franc"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          )}
        </div>
      </article>

      <Faq items={service.faq} eyebrow={service.navTitle} />

      <CtaBanner
        title={`${service.navTitle} à ${siteConfig.city} ?`}
        subtitle="Appelez pour une estimation immédiate, ou décrivez la situation en ligne et nous vous rappelons."
      />
    </>
  )
}
