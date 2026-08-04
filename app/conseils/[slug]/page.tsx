import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowRight, Clock } from 'lucide-react'
import {
  getArticle,
  getArticles,
  getRelatedConseils,
  getServices,
  readingTimeMinutes,
} from '@/lib/content'
import { articleJsonLd, buildMetadata, jsonLdScript } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ArticleImage } from '@/components/ui/ArticleImage'
import { FigureArticle } from '@/components/ui/FigureArticle'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { HaloThermique } from '@/components/ui/HaloThermique'

export const dynamicParams = false

export function generateStaticParams() {
  if (!siteConfig.features.blog) return []
  return getArticles().map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug)
  if (!article) return {}
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/conseils/${article.slug}`,
    ogImage: article.cover,
  })
}

const MOIS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]

/** « 2026-09-24 » → « 24 septembre 2026 » (déterministe, sans fuseau horaire). */
function formatDateFr(iso: string): string {
  const [a, m, j] = iso.split('-').map(Number)
  if (!a || !m || !j || m < 1 || m > 12) return iso
  return `${j} ${MOIS[m - 1]} ${a}`
}

const composantsMdx = { img: ArticleImage, Figure: FigureArticle }

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const prestations = getServices().filter((s) => article.relatedServices.includes(s.slug))
  const aLireAussi = getRelatedConseils(article, 3)
  const minutes = readingTimeMinutes(article.content)

  // Même règle que sur le hub : la grille « À lire aussi » (1 à 3 cartes) ne
  // doit jamais montrer de cellule vide, la dernière carte complète sa rangée.
  const nAutres = aLireAussi.length
  const etirementDerniere = [
    nAutres % 2 === 1 ? 'sm:col-span-2' : '',
    nAutres % 3 === 1 ? 'lg:col-span-3' : nAutres % 3 === 2 ? 'lg:col-span-2' : 'lg:col-span-1',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd(article)) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Conseils', path: '/conseils' },
          { name: article.title, path: `/conseils/${article.slug}` },
        ]}
      />

      <section className="grain relative overflow-hidden bg-fonte-nuit py-14 lg:py-20">
        <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-70" />
        <HaloThermique className="-right-20 -top-16" teinte="jura" taille={400} />

        <div className="enceinte relative max-w-colonne">
          <p className="surtitre flex items-center gap-3 text-laiton-clair">
            <span aria-hidden="true" className="h-px w-8 bg-laiton-franc" />
            {article.category}
          </p>
          <h1 className="mt-5 text-titre-l text-calcaire-neige md:text-titre-xl">{article.title}</h1>
          <p className="mt-5 max-w-lecture text-chapo text-calcaire-brume">{article.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-legende text-calcaire-ombre">
            <time dateTime={article.date}>{formatDateFr(article.date)}</time>
            <span aria-hidden="true" className="h-px w-4 bg-calcaire-roche" />
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} aria-hidden="true" />
              {minutes} min de lecture
            </span>
          </div>
        </div>
      </section>

      <article className="bg-calcaire-neige py-14 lg:py-20">
        <div className="enceinte max-w-colonne">
          {article.cover && (
            <figure className="mb-12">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-socle border border-calcaire-pierre shadow-pose">
                <Image
                  src={article.cover}
                  alt={article.coverAlt ?? ''}
                  fill
                  priority
                  sizes="(min-width: 1024px) 704px, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          )}

          <div className="corps-article">
            <MDXRemote source={article.content} components={composantsMdx} />
          </div>

          {prestations.length > 0 && (
            <AnimatedSection className="mt-14 rounded-socle border-l-2 border-laiton-franc bg-calcaire-voile p-7">
              <h2 className="text-titre-s">Nos prestations sur ce sujet</h2>
              <ul className="mt-5 border-t border-calcaire-pierre">
                {prestations.map((prestation) => (
                  <li key={prestation.slug}>
                    <Link
                      href={`/services/${prestation.slug}`}
                      className="group flex items-center gap-4 border-b border-calcaire-pierre py-3.5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-module border border-calcaire-brume bg-calcaire-neige text-jura-franc transition-colors group-hover:border-laiton-franc/50 group-hover:text-laiton-patine">
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
          )}
        </div>
      </article>

      <Faq items={article.faq} eyebrow="Questions sur cet article" />

      {aLireAussi.length > 0 && (
        <section
          className="border-t border-calcaire-pierre bg-calcaire-voile py-14 lg:py-20"
          aria-labelledby="a-lire-aussi"
        >
          <div className="enceinte">
            <h2 id="a-lire-aussi" className="text-titre-m">
              À lire aussi
            </h2>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-socle border border-calcaire-pierre bg-calcaire-pierre sm:grid-cols-2 lg:grid-cols-3">
              {aLireAussi.map((autre, i) => (
                <AnimatedSection
                  key={autre.slug}
                  delay={Math.min(i, 3) * 0.05}
                  as="li"
                  className={`bg-calcaire-neige ${i === nAutres - 1 ? etirementDerniere : ''}`}
                >
                  <Link
                    href={`/conseils/${autre.slug}`}
                    className="group flex h-full flex-col transition-colors duration-300 ease-thermique hover:bg-calcaire-voile"
                  >
                    {autre.cover && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-calcaire-voile">
                        <Image
                          src={autre.cover}
                          alt={autre.coverAlt ?? ''}
                          fill
                          sizes="(min-width: 1024px) 380px, 50vw"
                          className="object-cover transition-transform duration-500 ease-thermique group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="surtitre text-laiton-patine">{autre.category}</span>
                      <h3 className="mt-2.5 font-titre text-titre-s font-medium leading-snug text-fonte-abysse transition-colors group-hover:text-jura-dense">
                        {autre.title}
                      </h3>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  )
}
