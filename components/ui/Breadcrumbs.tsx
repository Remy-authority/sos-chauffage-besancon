import Link from 'next/link'
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/seo'

/**
 * Fil d'Ariane posé sous l'en-tête fixe. Traitement T3 : une ligne de relevé,
 * séparateurs en barre oblique fine, page courante en laiton patiné. Émet aussi
 * le BreadcrumbList JSON-LD correspondant.
 */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className="border-b border-calcaire-pierre bg-calcaire-voile pt-24 lg:pt-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(items)) }}
      />
      <ol className="enceinte flex flex-wrap items-center gap-x-2.5 gap-y-1 py-3.5 text-legende text-calcaire-roche">
        {items.map((item, i) => {
          const dernier = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-calcaire-brume">
                  /
                </span>
              )}
              {dernier ? (
                <span
                  className="max-w-[20rem] truncate font-medium text-laiton-patine"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-jura-franc">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
