import {
  BadgeCheck,
  Bath,
  Fan,
  Flame,
  Fuel,
  Gauge,
  Hammer,
  PhoneCall,
  Radiation,
  Snowflake,
  Stethoscope,
  Thermometer,
  ThermometerSnowflake,
  Timer,
  Waves,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

/**
 * Correspondance entre les clés `icon` du contenu JSON / de la config et les
 * pictogrammes. Le contenu ne connaît jamais lucide-react : la table est le seul
 * point de contact entre le vocabulaire métier et la bibliothèque d'icônes.
 */
const PICTOGRAMMES: Record<string, LucideIcon> = {
  // Prestations
  'chaudiere-gaz': Flame,
  'chaudiere-fioul': Fuel,
  entretien: BadgeCheck,
  electrique: Zap,
  pac: Fan,
  ballon: Bath,
  desembouage: Waves,
  remplacement: Hammer,
  // Symptômes et repères
  froid: ThermometerSnowflake,
  securite: Radiation,
  bruit: Waves,
  pression: Gauge,
  odeur: Stethoscope,
  thermometre: Thermometer,
  gel: Snowflake,
  appel: PhoneCall,
  outil: Wrench,
  delai: Timer,
}

export function resolveIcon(icon: string): LucideIcon {
  return PICTOGRAMMES[icon] ?? Thermometer
}

export function ServiceIcon({
  icon,
  className = 'h-6 w-6',
  strokeWidth = 1.6,
}: {
  icon: string
  className?: string
  strokeWidth?: number
}) {
  const Icone = resolveIcon(icon)
  return <Icone className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}

export default ServiceIcon
