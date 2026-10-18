import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/lib/content'
import { Picto, type PictoNom } from '@/components/ui/Picto'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Bloc 4 de l'accueil : les neuf prestations UNE PAR UNE, empilées (jamais un
 * carrousel, #R71), chacune avec la photo de la prestation (`public/services/<slug>.jpg`,
 * la même que sa page), picto dessiné animé, une phrase de 15 mots au plus (#R67).
 * Le paragraphe des tarifs, en bas, est le SEUL lien vers /tarifs dans le corps
 * de l'accueil (#R46, #R50) : jamais au menu ni au bloc 1.
 */
const PICTOS: Record<string, PictoNom> = {
  'chaudiere-gaz': 'flamme',
  'chaudiere-fioul': 'fioul',
  entretien: 'entretien',
  electrique: 'eclair',
  pac: 'ventilateur',
  ballon: 'ballon',
  desembouage: 'desembouage',
  remplacement: 'remplacement',
  clim: 'climatisation',
}

const PHRASES: Record<string, string> = {
  'depannage-chaudiere-gaz': 'Code erreur, allumage, pression ou fuite, la chaudière gaz repart le plus souvent le jour même.',
  'depannage-chaudiere-fioul': 'Brûleur, gicleur, pompe ou cellule, nous remettons la chaudière fioul en marche et la réglons.',
  'entretien-annuel-chaudiere': 'La visite annuelle obligatoire, avec attestation remise, pour une chaudière sûre et économe.',
  'depannage-chauffage-electrique': 'Radiateur froid, disjoncteur qui saute ou thermostat muet, nous trouvons la cause.',
  'depannage-pompe-chaleur': 'Unité extérieure arrêtée, givre ou code défaut, nous dépannons les pompes à chaleur air-eau.',
  'depannage-ballon-eau-chaude': 'Plus d’eau chaude, eau tiède, fuite ou bruit, nous dépannons ou remplaçons le ballon.',
  'desembouage-chauffage': 'Radiateurs tièdes en bas ou bruits de circulation, le circuit est nettoyé et rééquilibré.',
  'remplacement-chaudiere': 'Quand réparer ne vaut plus le coup, nous posons la chaudière adaptée à votre logement.',
  'climatisation-reversible': 'Installation, entretien et dépannage de la climatisation réversible, été comme hiver.',
}

export function PrestationsEmpilees({ services }: { services: Service[] }) {
  return (
    <section id="prestations" className="plage bg-calcaire-voile" aria-labelledby="prestations-titre">
      <div className="enceinte">
        <SectionHeader
          id="prestations-titre"
          align="center"
          eyebrow="Ce que nous faisons"
          title="Nos prestations de chauffage à Besançon"
        />
        <ol className="mx-auto mt-12 grid max-w-colonne gap-5 sm:gap-4 lg:mt-16">
          {services.map((s, k) => (
            <li key={s.slug} className="entree" style={{ ['--decal' as string]: `${k * 0.06}s` }}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid overflow-hidden rounded-plaque border border-calcaire-pierre bg-calcaire-neige transition-colors duration-300 hover:border-laiton-patine sm:grid-cols-[15rem_1fr_auto] sm:items-center"
              >
                <span className="relative block aspect-[16/9] overflow-hidden bg-fonte-abysse sm:aspect-[8/5] sm:h-full">
                  <Image
                    src={`/services/${s.slug}.jpg`}
                    alt={s.imageAlt ?? ''}
                    fill
                    sizes="(min-width: 640px) 240px, (min-width: 520px) 480px, 100vw"
                    quality={60}
                    className="object-cover transition-transform duration-700 ease-thermique group-hover:scale-[1.04]"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex h-11 w-11 items-center justify-center rounded-plaque bg-fonte-abysse/90 text-laiton-clair sm:hidden">
                    <Picto nom={PICTOS[s.icon] ?? 'flamme'} className="h-6 w-6" />
                  </span>
                </span>
                <span className="block px-5 pb-6 pt-4 sm:px-6 sm:py-5">
                  <span className="flex items-center gap-3">
                    <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-plaque bg-fonte-abysse text-laiton-clair sm:inline-flex">
                      <Picto nom={PICTOS[s.icon] ?? 'flamme'} className="h-6 w-6" delai={`${0.15 + k * 0.06}s`} />
                    </span>
                    <span className="chiffre font-titre text-sm text-laiton-patine">{String(k + 1).padStart(2, '0')}</span>
                    <h3 className="font-titre text-titre-s text-fonte-abysse">{s.navTitle}</h3>
                  </span>
                  <p className="mt-2 text-lecture text-calcaire-basalte">{PHRASES[s.slug] ?? s.intro}</p>
                </span>
                <ArrowRight
                  size={18}
                  className="mr-6 hidden text-laiton-patine transition-transform duration-300 group-hover:translate-x-1 sm:block"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-10 max-w-colonne text-center text-lecture text-calcaire-basalte">
          Chaque prestation a un prix annoncé avant de venir. Les fourchettes sont publiées sur{' '}
          <Link href="/tarifs" className="font-semibold text-fonte-abysse underline decoration-laiton-franc decoration-2 underline-offset-4">
            la page des tarifs
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

export default PrestationsEmpilees
