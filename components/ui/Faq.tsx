import type { ReactNode } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { faqJsonLd, jsonLdScript } from '@/lib/seo'
import type { FaqItem } from '@/lib/content'

/**
 * Bloc FAQ : accordéon + données structurées FAQPage.
 *
 * Levier GEO central du site (docs/SEO-GEO-PLAN.md §5) : chaque réponse doit
 * rester compréhensible citée seule, hors du contexte de la page.
 */
export function Faq({
  items,
  title,
  eyebrow = 'Questions fréquentes',
  subtitle,
}: {
  items: FaqItem[]
  title?: ReactNode
  eyebrow?: string
  subtitle?: string
}) {
  if (!items?.length) return null

  return (
    <section id="faq" className="plage bg-calcaire-neige" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(items)) }}
      />
      <div className="enceinte">
        <div className="max-w-colonne">
          <SectionHeader
            id="faq-title"
            eyebrow={eyebrow}
            title={title ?? <>Ce qu’on nous demande le plus souvent</>}
            subtitle={subtitle}
          />
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  )
}

export default Faq
