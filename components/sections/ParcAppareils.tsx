import { Bath, Fan, Flame, Fuel, Thermometer, Waves, Zap, type LucideIcon } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Le parc d'appareils réellement pris en charge.
 *
 * Choix éditorial : on décrit des TYPES d'appareils, pas des marques. Annoncer
 * une liste de marques laisserait entendre un agrément constructeur que nous
 * n'avons pas, alors que la compétence réelle porte sur des technologies. La
 * section dit aussi, explicitement, ce qui sort du périmètre : c'est ce qui
 * évite les appels perdus et ce qui rend le reste crédible.
 */
type Appareil = { icone: LucideIcon; nom: string; precision: string }

const PARC: Appareil[] = [
  {
    icone: Flame,
    nom: 'Chaudière gaz',
    precision:
      'Murale ou au sol, classique ou à condensation. Corps de chauffe, brûleur, sonde, vanne trois voies, circulateur.',
  },
  {
    icone: Fuel,
    nom: 'Chaudière fioul',
    precision:
      'Encore très présente en périphérie et en secteur rural. Brûleur, gicleur, ligne d’alimentation, filtre, cuve.',
  },
  {
    icone: Fan,
    nom: 'Pompe à chaleur',
    precision:
      'Air-eau et air-air, y compris les modèles réversibles. Unité extérieure, dégivrage, appoint par grand froid.',
  },
  {
    icone: Bath,
    nom: 'Ballon d’eau chaude',
    precision:
      'Chauffe-eau électrique, ballon thermodynamique, production intégrée à la chaudière. Résistance, thermostat, anode.',
  },
  {
    icone: Waves,
    nom: 'Circuit et radiateurs',
    precision:
      'Radiateurs fonte, acier ou plancher chauffant. Purge, équilibrage, désembouage, remplacement de robinet.',
  },
  {
    icone: Zap,
    nom: 'Chauffage électrique',
    precision:
      'Convecteurs, panneaux rayonnants, radiateurs à inertie. Résistance, thermostat, fil pilote, programmation.',
  },
]

const HORS_PERIMETRE = [
  'Plomberie générale et robinetterie sanitaire',
  'Installation électrique du logement',
  'Ramonage de conduit et poêle à bois',
]

export function ParcAppareils() {
  return (
    <section className="plage bg-calcaire-neige" aria-labelledby="parc-titre">
      <div className="enceinte">
        <SectionHeader
          id="parc-titre"
          eyebrow="Appareils couverts"
          title={<>Sur quoi nous intervenons vraiment</>}
          subtitle="Nous raisonnons par technologie, pas par marque : c’est le type d’appareil et la pièce en cause qui déterminent l’intervention, pas le logo sur la façade."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-socle border border-calcaire-pierre bg-calcaire-pierre sm:grid-cols-2 lg:grid-cols-3">
          {PARC.map(({ icone: Icone, nom, precision }, i) => (
            <AnimatedSection
              key={nom}
              delay={Math.min(i, 4) * 0.05}
              className="group bg-calcaire-neige p-7 transition-colors duration-300 ease-thermique hover:bg-calcaire-voile"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-module border border-calcaire-brume text-jura-franc transition-colors duration-300 group-hover:border-laiton-franc/50 group-hover:text-laiton-patine">
                <Icone className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-titre-s">{nom}</h3>
              <p className="mt-2.5 text-legende leading-relaxed text-calcaire-roche">{precision}</p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-8 flex flex-col gap-5 rounded-socle border border-calcaire-pierre bg-calcaire-voile p-7 md:flex-row md:items-center md:gap-10">
          <div className="flex items-center gap-3.5">
            <Thermometer
              size={20}
              strokeWidth={1.7}
              className="shrink-0 text-laiton-patine"
              aria-hidden="true"
            />
            <p className="font-titre text-[1.0625rem] font-medium text-fonte-abysse">
              Notre périmètre s’arrête là
            </p>
          </div>
          <ul className="flex flex-1 flex-wrap gap-x-8 gap-y-2 text-legende text-calcaire-basalte">
            {HORS_PERIMETRE.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-px w-4 shrink-0 bg-calcaire-ombre" />
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default ParcAppareils
