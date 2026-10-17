import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { Picto, type PictoNom } from '@/components/ui/Picto'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Bloc 2 de l'accueil : ce que le client constate, en six pictos dessinés du
 * métier qui s'animent à l'apparition, une phrase par cas, un lien vers la
 * prestation (#R67, #R71). Titre centré (bloc sans visuel, #R61).
 */
const PICTOS: Record<string, PictoNom> = {
  froid: 'radiateur',
  securite: 'ecran',
  'eau-chaude': 'ballon',
  bruit: 'onde',
  pression: 'manometre',
  odeur: 'alerte',
}

export function Symptomes({ services }: { services: { slug: string; navTitle: string }[] }) {
  const titreDe = (slug: string) => services.find((s) => s.slug === slug)?.navTitle ?? 'Voir la prestation'

  return (
    <section id="symptomes" className="plage bg-calcaire-neige" aria-labelledby="symptomes-titre">
      <div className="enceinte">
        <SectionHeader
          id="symptomes-titre"
          align="center"
          eyebrow="Au téléphone"
          title="Dites-nous ce que vous constatez"
          subtitle="Chaque symptôme oriente la panne. Le dire au téléphone fait gagner la première demi-heure."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {siteConfig.symptomes.map((s, k) => (
            <li key={s.id} className="entree flex" style={{ ['--decal' as string]: `${k * 0.08}s` }}>
              <Link
                href={`/services/${s.service}`}
                className="group flex w-full flex-col justify-between rounded-plaque border border-calcaire-pierre bg-calcaire-voile p-6 transition-all duration-300 ease-thermique hover:-translate-y-0.5 hover:border-laiton-franc/60 hover:shadow-releve"
              >
                <div>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-plaque bg-fonte-abysse text-laiton-clair">
                    <Picto nom={PICTOS[s.id] ?? 'flamme'} className="h-8 w-8" delai={`${0.2 + k * 0.08}s`} />
                  </span>
                  <h3 className="mt-5 font-titre text-titre-s text-fonte-abysse">{s.plainte}</h3>
                  <p className="mt-2 text-lecture text-calcaire-basalte">{s.indice}.</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-laiton-patine">
                  {titreDe(s.service)}
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Symptomes
