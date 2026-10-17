import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/lib/content'
import { Picto, type PictoNom } from '@/components/ui/Picto'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Bloc 4 de l'accueil : les neuf prestations UNE PAR UNE, empilées (jamais un
 * carrousel, #R71), picto dessiné animé, une phrase de 15 mots au plus (#R67).
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
        <ol className="mx-auto mt-12 max-w-colonne divide-y divide-calcaire-pierre border-y border-calcaire-pierre lg:mt-16">
          {services.map((s, k) => (
            <li key={s.slug} className="entree" style={{ ['--decal' as string]: `${k * 0.06}s` }}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid grid-cols-[3.25rem_1fr] items-start gap-4 py-6 transition-colors duration-300 hover:bg-calcaire-neige sm:grid-cols-[3.25rem_4rem_1fr_auto] sm:items-center sm:gap-6 lg:py-7"
              >
                <span className="chiffre pt-1 font-titre text-sm text-laiton-patine sm:pt-0">{String(k + 1).padStart(2, '0')}</span>
                <span className="hidden h-16 w-16 items-center justify-center rounded-plaque bg-fonte-abysse text-laiton-clair sm:inline-flex">
                  <Picto nom={PICTOS[s.icon] ?? 'flamme'} className="h-9 w-9" delai={`${0.15 + k * 0.06}s`} />
                </span>
                <span>
                  <span className="flex items-center gap-3 sm:block">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-plaque bg-fonte-abysse text-laiton-clair sm:hidden">
                      <Picto nom={PICTOS[s.icon] ?? 'flamme'} className="h-6 w-6" />
                    </span>
                    <h3 className="font-titre text-titre-s text-fonte-abysse">{s.navTitle}</h3>
                  </span>
                  <p className="mt-2 text-lecture text-calcaire-basalte">{PHRASES[s.slug] ?? s.intro}</p>
                </span>
                <ArrowRight
                  size={18}
                  className="hidden text-laiton-patine transition-transform duration-300 group-hover:translate-x-1 sm:block"
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
