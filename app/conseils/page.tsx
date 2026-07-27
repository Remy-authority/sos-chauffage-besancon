import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock } from 'lucide-react'
import { getArticles, readingTimeMinutes } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { PageHeader } from '@/components/layout/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CtaBanner } from '@/components/ui/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: `Conseils chauffage et chaudière, ${siteConfig.city} et le Doubs`,
  description: `Guides pratiques sur le chauffage : entretien annuel obligatoire, pannes de chaudière, préparation de l'hiver, désembouage et pompe à chaleur à ${siteConfig.city}.`,
  path: '/conseils',
})

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

function formatDateFr(iso: string): string {
  const [a, m, j] = iso.split('-').map(Number)
  if (!a || !m || !j || m < 1 || m > 12) return iso
  return `${j} ${MOIS[m - 1]} ${a}`
}

export default function ConseilsListing() {
  if (!siteConfig.features.blog) notFound()
  const articles = getArticles()

  return (
    <>
      <PageHeader
        eyebrow="Conseils"
        title={
          <>
            Comprendre
            <br />
            <span className="mot-laiton">son chauffage</span>
          </>
        }
        subtitle="Ce qu’il faut vérifier avant d’appeler, ce qu’il ne faut surtout pas faire, et comment traverser l’hiver comtois sans se retrouver sans chauffage."
      />

      <section className="bg-calcaire-neige py-14 lg:py-20">
        <div className="enceinte">
          {articles.length === 0 ? (
            <AnimatedSection className="max-w-colonne rounded-socle border-l-2 border-laiton-franc bg-calcaire-voile p-8">
              <p className="font-titre text-titre-m text-fonte-abysse">
                Les premiers conseils arrivent bientôt
              </p>
              <p className="mt-4 max-w-lecture text-lecture text-calcaire-basalte">
                En attendant, une question sur une chaudière qui se met en sécurité ou sur des
                radiateurs qui ne chauffent plus ? Appelez, nous répondons directement, sans passer
                par un formulaire.
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="chiffre group mt-6 inline-flex items-center gap-2.5 font-titre text-titre-s font-medium text-jura-dense transition-colors hover:text-jura-franc"
              >
                {siteConfig.phoneDisplay}
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 ease-thermique group-hover:translate-x-1"
                />
              </a>
            </AnimatedSection>
          ) : (
            <ul className="grid gap-px overflow-hidden rounded-socle border border-calcaire-pierre bg-calcaire-pierre md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <AnimatedSection
                  key={article.slug}
                  delay={Math.min(i, 5) * 0.04}
                  as="li"
                  className="bg-calcaire-neige"
                >
                  <Link
                    href={`/conseils/${article.slug}`}
                    className="group flex h-full flex-col transition-colors duration-300 ease-thermique hover:bg-calcaire-voile"
                  >
                    {article.cover && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-calcaire-voile">
                        <Image
                          src={article.cover}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 ease-thermique group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7">
                      <div className="surtitre flex items-center gap-3 text-calcaire-roche">
                        <time dateTime={article.date}>{formatDateFr(article.date)}</time>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={12} aria-hidden="true" />
                          {readingTimeMinutes(article.content)} min
                        </span>
                      </div>
                      <h2 className="mt-3.5 font-titre text-titre-s font-medium text-fonte-abysse transition-colors group-hover:text-jura-dense">
                        {article.title}
                      </h2>
                      <p className="mt-3 flex-1 text-legende leading-relaxed text-calcaire-roche">
                        {article.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-legende font-medium text-jura-dense transition-all duration-300 ease-thermique group-hover:gap-3">
                        Lire l’article
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
