import Link from 'next/link'
import type { Zone } from '@/lib/content'
import { CARTE_VIEWBOX, COMMUNES_TRACEES } from '@/components/ui/graphiques/grand-besancon-geo'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ListeCommunes } from '@/components/sections/ListeCommunes'

/**
 * Bloc 7 de l'accueil : la CARTE DESSINÉE du Grand Besançon (#R60), Besançon et
 * les 12 communes du site, chacune cliquable vers sa page, la liste à côté.
 * Contours officiels (geo.api.gouv.fr) tracés par
 * scripts/generate-carte-grand-besancon.py. Jamais une grille de photos.
 */

/**
 * Décalages du libellé quand le centre officiel tombe trop près d'un voisin (vérifiés sur
 * capture à 390 et 1440 px) ; `filet` dessine le trait vers le centre officiel.
 */
const ETIQUETTES: Record<string, { dx?: number; dy?: number; ancre?: 'start' | 'end'; filet?: boolean }> = {
  besancon: { dy: 48 },
  'chatillon-le-duc': { dy: -42 },
  'miserey-salines': { dy: 8 },
  thise: { dy: -26 },
  'roche-lez-beaupre': { dy: 18 },
  franois: { dy: 14 },
}

const ORDRE = [...COMMUNES_TRACEES].sort((a, b) => {
  const c = COMMUNES_TRACEES.find((z) => z.slug === 'besancon')!
  return Math.hypot(a.cx - c.cx, a.cy - c.cy) - Math.hypot(b.cx - c.cx, b.cy - c.cy)
})
const RANG = new Map(ORDRE.map((z, k) => [z.slug, k]))

export function CarteGrandBesancon({ zones }: { zones: Zone[] }) {
  return (
    <section id="communes" className="plage bg-calcaire-neige" aria-labelledby="communes-titre">
      <div className="enceinte">
        <SectionHeader
          id="communes-titre"
          align="center"
          eyebrow="Où nous intervenons"
          title="Besançon et douze communes du Grand Besançon"
          subtitle="Cliquez sur une commune pour voir son habitat, ses pannes fréquentes et nos délais."
        />
        <div className="mt-12 grid items-stretch gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-14">
          <figure className="carte-communes vivant m-0">
            <svg viewBox={CARTE_VIEWBOX} role="img" aria-labelledby="communes-carte-titre" className="h-auto w-full">
              <title id="communes-carte-titre">Carte de Besançon et des douze communes où nous dépannons le chauffage</title>
              {COMMUNES_TRACEES.map((z) => (
                <Link
                  key={z.slug}
                  href={`/zones/${z.slug}`}
                  aria-label={`Dépannage chauffage à ${z.nom}`}
                  className="carte-lien"
                  style={{ ['--i' as string]: RANG.get(z.slug) ?? 0 }}
                >
                  <path d={z.d} className={z.slug === 'besancon' ? 'carte-centre' : 'carte-commune'} />
                </Link>
              ))}
              <g aria-hidden="true" className="carte-etiquettes">
                {COMMUNES_TRACEES.map((z) => {
                  const e = ETIQUETTES[z.slug] ?? {}
                  const x = z.cx + (e.dx ?? 0)
                  const y = z.cy + (e.dy ?? 0)
                  const coupe = z.nom.indexOf('-')
                  const morceaux = z.nom.length > 14 && coupe > 0 ? [z.nom.slice(0, coupe), z.nom.slice(coupe + 1)] : [z.nom]
                  return (
                    <g key={z.slug}>
                      {e.filet && <path className="carte-filet" d={`M${z.cx} ${z.cy}L${x} ${y}`} />}
                      {e.filet && <circle className="carte-point" cx={z.cx} cy={z.cy} r="4" />}
                      <text x={x} y={y} textAnchor={e.ancre ?? 'middle'} dominantBaseline="middle" className={z.slug === 'besancon' ? 'carte-nom carte-nom-centre' : 'carte-nom'}>
                        {morceaux.length === 2 ? (
                          <>
                            <tspan x={x} dy="-0.55em">{morceaux[0]}-</tspan>
                            <tspan x={x} dy="1.1em">{morceaux[1]}</tspan>
                          </>
                        ) : (
                          z.nom
                        )}
                      </text>
                    </g>
                  )
                })}
              </g>
            </svg>
            <figcaption className="mt-3 text-center text-legende text-calcaire-basalte">Contours officiels des communes (IGN, via geo.api.gouv.fr).</figcaption>
          </figure>
          <ListeCommunes communes={zones.map((z) => ({ slug: z.slug, name: z.name, postalCode: z.postalCode }))} />
        </div>
      </div>
    </section>
  )
}

export default CarteGrandBesancon
