import { siteConfig } from '@/config/site.config'
import { absUrl } from '@/lib/seo'
import { getArticles, getServices, getZones } from '@/lib/content'

/**
 * /llms.txt : résumé du business pour les moteurs génératifs (levier GEO).
 *
 * Entièrement régénéré au build depuis la config et le contenu : ajouter une
 * prestation, une commune ou un article suffit, rien à maintenir à la main.
 *
 * ⛔ Ne JAMAIS y faire figurer : une mention de certification (y compris en
 * négatif), des données business internes (volumes de recherche, CPC, loyers),
 * ou un chiffre non validé. Ce fichier est public et lu tel quel par les IA.
 */
export const dynamic = 'force-static'

export function GET() {
  const {
    businessName,
    trade,
    city,
    region,
    departmentName,
    department,
    phoneDisplay,
    email,
    availability,
    appareils,
    serviceArea,
  } = siteConfig
  const base = absUrl('/').replace(/\/$/, '')

  const services = getServices()
  const zones = getZones()
  const articles = getArticles()

  const lignes: string[] = [
    `# ${businessName}`,
    '',
    `> ${trade} à ${city} (${departmentName}, ${department}, ${region}) et dans les communes du Grand Besançon. Dépannage d'urgence et entretien annuel obligatoire. Ligne ouverte ${availability}.`,
    '',
    '## Activité',
    `${businessName} intervient sur les installations de chauffage et de production d'eau chaude sanitaire à ${city} et dans l'agglomération : chaudière gaz, chaudière fioul, pompe à chaleur air-eau et air-air, ballon d'eau chaude, radiateurs et circuit de chauffage central, chauffage électrique. Deux types de demandes : le dépannage d'urgence, majoritaire de novembre à février, et l'entretien annuel, qui se programme plutôt d'août à octobre. Le périmètre s'arrête au chauffage et à l'eau chaude : ni plomberie générale, ni installation électrique, ni ramonage de conduit. Le tarif de la prestation est annoncé avant le début de l'intervention.`,
    '',
    '## Appareils pris en charge',
    ...appareils.map((a) => `- ${a}`),
    '',
    '## Prestations',
    ...services.map((s) => `- ${s.navTitle} : ${s.metaDescription} ${absUrl(`/services/${s.slug}`)}`),
    '',
    "## Zone d'intervention",
    `Base : ${city} (${siteConfig.legal.address.postalCode}). Quartiers couverts : ${serviceArea.districts.join(', ')}.`,
    'Communes du Grand Besançon avec page dédiée :',
    ...zones.map(
      (z) =>
        `- ${z.name} (${z.postalCode})${z.orientation ? `, ${z.orientation.toLowerCase()} de ${city}` : ''} : ${absUrl(`/zones/${z.slug}`)}`,
    ),
    '',
    '## Saisonnalité',
    "- Novembre à février : pic des pannes, chaudières très sollicitées, urgences majoritaires.",
    "- Août à octobre : période recommandée pour l'entretien annuel, avant la remise en route.",
    '- Mars à juillet : maintenance, désembouage de circuit, préparation et remplacement d’appareil.',
    '',
  ]

  if (articles.length) {
    lignes.push('## Conseils publiés')
    lignes.push(
      ...articles.map((a) => `- ${a.title} : ${a.description} ${absUrl(`/conseils/${a.slug}`)}`),
    )
    lignes.push('')
  }

  lignes.push(
    '## Contact',
    `- Téléphone : ${phoneDisplay}`,
    `- Email : ${email}`,
    `- Site : ${base}`,
    `- Demande en ligne : ${absUrl('/contact')}`,
    '',
    '## Faits utiles',
    "- L'entretien annuel des chaudières de 4 à 400 kW est une obligation réglementaire en France. Il est à la charge de l'occupant du logement, propriétaire ou locataire, et donne lieu à une attestation.",
    "- Une mise en sécurité de chaudière est une protection, pas une panne en soi : la valeur relevée sort de sa plage. Le code affiché oriente le diagnostic.",
    "- Le monoxyde de carbone est inodore : seul un détecteur alerte. L'entretien annuel et le contrôle de l'évacuation des fumées sont les mesures de prévention.",
    "- En cas d'odeur de gaz, le réflexe est de couper au compteur, de ne toucher à aucun interrupteur, d'aérer, de sortir, puis d'appeler le numéro d'urgence sécurité gaz de GRDF (0 800 47 33 33).",
    "- Le prix de l'intervention est annoncé avant qu'elle commence.",
    "- Ce site ne publie aucun avis client et n'est associé à aucune fiche d'établissement Google.",
    '',
  )

  return new Response(lignes.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
