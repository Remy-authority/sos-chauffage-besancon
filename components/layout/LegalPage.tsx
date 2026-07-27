import type { ReactNode } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'

/**
 * Coquille commune des pages légales : même bandeau sombre que le reste du site,
 * puis une colonne de lecture stricte, dans le gabarit éditorial du template.
 */
export function LegalPage({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <>
      <PageHeader eyebrow="Informations légales" title={title} subtitle={subtitle} />
      <section className="bg-calcaire-neige py-14 lg:py-20">
        <div className="enceinte max-w-colonne">
          <div className="corps-edito space-y-10">{children}</div>
        </div>
      </section>
    </>
  )
}

export default LegalPage
