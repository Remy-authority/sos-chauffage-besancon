import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PhoneCall } from 'lucide-react'
import { getTarifs } from '@/lib/content'
import type { SourceRef } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { PageHeader } from '@/components/layout/PageHeader'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { Faq } from '@/components/ui/Faq'
import { LeadForm } from '@/components/ui/LeadForm'
import { ServiceBlock } from '@/components/ui/ServiceBlock'

/**
 * /tarifs : fourchettes de prix, toutes sourcées (nom, date, lien), lues dans
 * content/tarifs.json. Aucun prix dans le JSON-LD, aucun priceRange : la seule
 * donnée structurée de la page est la FAQ. Reliée depuis le pied de page, le
 * paragraphe des prestations de l'accueil et un paragraphe des pages
 * prestation seulement : jamais depuis le menu ni le bloc 1.
 */
export function generateMetadata(): Metadata {
  const t = getTarifs()
  if (!t) return {}
  return buildMetadata({ title: t.metaTitle, description: t.metaDescription, path: '/tarifs' })
}

function Source({ source }: { source: SourceRef }) {
  return (
    <span className="text-legende leading-relaxed text-calcaire-ombre">
      Source{' '}
      {source.url ? (
        <a
          href={source.url}
          target="_blank"
          rel="nofollow noopener"
          className="font-medium text-jura-dense underline decoration-jura-mousse underline-offset-2 hover:text-jura-franc"
        >
          {source.nom}
        </a>
      ) : (
        <span className="font-medium text-jura-dense">{source.nom}</span>
      )}
      {source.date && <>, {source.date}</>}
    </span>
  )
}

export default function TarifsPage() {
  const t = getTarifs()
  if (!t) notFound()

  return (
    <>
      <Breadcrumbs items={[{ name: 'Accueil', path: '/' }, { name: 'Tarifs', path: '/tarifs' }]} />

      <PageHeader eyebrow="Tarifs" title={t.h1} subtitle={t.intro}>
        <p className="mt-7 flex items-center justify-center gap-3 text-legende text-calcaire-ombre lg:justify-start">
          <span aria-hidden="true" className="h-px w-6 bg-laiton-franc" />
          Fourchettes relevées le {t.miseAJour}
        </p>
      </PageHeader>

      {/* Grille, un tableau par famille. Au téléphone, chaque ligne devient une
          carte empilée et centrée : aucun défilement horizontal. */}
      <section className="plage bg-calcaire-neige" aria-label="Grille de prix">
        <div className="enceinte space-y-16">
          {t.groupes.map((g) => (
            <AnimatedSection key={g.titre} as="section" aria-labelledby={`groupe-${g.lignes[0]?.id}`}>
              <h2
                id={`groupe-${g.lignes[0]?.id}`}
                className="text-center text-titre-m text-fonte-abysse lg:text-left"
              >
                {g.titre}
              </h2>
              <table className="mt-6 block w-full border-collapse text-left lg:table">
                <thead className="hidden lg:table-header-group">
                  <tr className="border-b-2 border-fonte-abysse">
                    <th scope="col" className="surtitre py-3 pr-5 text-calcaire-basalte">Poste</th>
                    <th scope="col" className="surtitre py-3 pr-5 text-calcaire-basalte">Prix constaté</th>
                    <th scope="col" className="surtitre py-3 pr-5 text-calcaire-basalte">À savoir</th>
                    <th scope="col" className="surtitre py-3 text-calcaire-basalte">Source</th>
                  </tr>
                </thead>
                <tbody className="block space-y-3 lg:table-row-group lg:space-y-0">
                  {g.lignes.map((l) => (
                    <tr
                      key={l.id}
                      id={`tarif-${l.id}`}
                      className="block rounded-module border border-calcaire-pierre bg-calcaire-voile p-5 text-center shadow-pose lg:table-row lg:rounded-none lg:border-0 lg:border-b lg:border-calcaire-pierre lg:bg-transparent lg:p-0 lg:text-left lg:shadow-none"
                    >
                      <th
                        scope="row"
                        className="block font-titre text-[1.0625rem] font-semibold text-fonte-abysse lg:table-cell lg:w-[30%] lg:py-4 lg:pr-5 lg:align-top"
                      >
                        {l.poste}
                      </th>
                      <td className="mt-2 block lg:mt-0 lg:table-cell lg:whitespace-nowrap lg:py-4 lg:pr-5 lg:align-top">
                        <span className="chiffre font-titre text-titre-s font-semibold text-laiton-patine">{l.prix}</span>
                        {l.unite && <span className="ml-1.5 text-legende text-calcaire-basalte">{l.unite}</span>}
                      </td>
                      <td className="mt-2 block text-lecture text-calcaire-basalte lg:mt-0 lg:table-cell lg:py-4 lg:pr-5 lg:align-top">
                        {l.note}
                      </td>
                      <td className="mt-3 block border-t border-calcaire-pierre pt-3 lg:mt-0 lg:table-cell lg:border-0 lg:py-4 lg:align-top">
                        <Source source={l.source} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AnimatedSection>
          ))}
          <p className="mx-auto max-w-lecture text-center text-legende leading-relaxed text-calcaire-basalte">
            Chaque fourchette renvoie à sa source et à sa date de relevé. Elles ne remplacent pas un devis.
            Le prix de votre intervention est dit au téléphone, avant le déplacement.
          </p>
        </div>
      </section>

      {t.blocks.length > 0 && (
        <article className="bg-calcaire-voile py-14 lg:py-20">
          <div className="enceinte max-w-colonne">
            <div className="corps-edito space-y-10">
              {t.blocks.map((b) => (
                <ServiceBlock key={b.heading} block={b} />
              ))}
            </div>
          </div>
        </article>
      )}

      {t.cas.length > 0 && (
        <section className="plage bg-calcaire-neige" aria-labelledby="cas-concrets">
          <div className="enceinte">
            <h2 id="cas-concrets" className="text-center text-titre-l text-fonte-abysse lg:text-left">
              Trois situations, chiffrées avec ces fourchettes
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
              {t.cas.map((c, idx) => (
                <AnimatedSection
                  key={c.titre}
                  as="li"
                  delay={(idx % 3) * 0.07}
                  className="flex h-full flex-col rounded-module border border-calcaire-pierre bg-calcaire-voile p-6 text-center shadow-pose lg:text-left"
                >
                  <h3 className="font-titre text-titre-s font-semibold text-fonte-abysse">{c.titre}</h3>
                  <p className="mt-3 text-lecture text-calcaire-basalte">{c.situation}</p>
                  <ul className="mt-5 flex-1 divide-y divide-calcaire-pierre border-y border-calcaire-pierre text-lecture">
                    {c.lignes.map(([poste, montant]) => (
                      <li key={poste} className="flex items-baseline justify-between gap-4 py-2.5 text-left">
                        <span className="text-calcaire-basalte">{poste}</span>
                        <span className="chiffre shrink-0 font-medium text-fonte-abysse">{montant}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-baseline justify-between gap-4 text-left">
                    <span className="surtitre text-calcaire-basalte">Total</span>
                    <span className="chiffre font-titre text-titre-s font-semibold text-laiton-patine">{c.total}</span>
                  </div>
                </AnimatedSection>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Faq items={t.faq} eyebrow="Tarifs" title={<>Ce qu’on nous demande sur les prix</>} />

      <section className="plage bg-calcaire-voile" aria-labelledby="demande-prix">
        <div className="enceinte grid gap-12 lg:grid-cols-12">
          <div className="text-center lg:col-span-5 lg:text-left">
            <h2 id="demande-prix" className="text-titre-l text-fonte-abysse">
              Le prix de votre panne, avant tout déplacement
            </h2>
            <p className="mt-5 max-w-lecture text-lecture text-calcaire-basalte lg:mx-0">
              Donnez-nous la marque et le code affiché, vous recevez une estimation en retour.
              Maison déjà froide ? Le téléphone va plus vite.
            </p>
            <div className="mt-7 flex justify-center lg:justify-start">
              <Button href={`tel:${siteConfig.phone}`} variant="laiton" size="ample">
                <PhoneCall size={18} strokeWidth={2.2} />
                {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div id="formulaire" className="scroll-mt-28">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
