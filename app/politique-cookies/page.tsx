import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { LegalPage } from '@/components/layout/LegalPage'

export const metadata: Metadata = buildMetadata({
  title: 'Cookies du site SOS Chauffage Besançon, ce qui est déposé',
  description: `Quels cookies le site ${siteConfig.businessName} dépose sur votre appareil, à quoi ils servent et comment les refuser depuis votre navigateur.`,
  path: '/politique-cookies',
  noindex: true,
})

export default function PolitiqueCookies() {
  return (
    <LegalPage
      title="Politique de cookies"
      subtitle="Ce site ne dépose aucun cookie publicitaire ni traceur tiers."
    >
      <section>
        <h2>Qu&apos;est-ce qu&apos;un cookie</h2>
        <p>
          Un cookie est un court fichier que le navigateur garde sur votre appareil quand vous
          visitez un site. Il sert par exemple à retenir une préférence ou à faire tourner une
          fonction technique.
        </p>
      </section>
      <section>
        <h2>Cookies utilisés sur ce site</h2>
        <p>
          Ce site ne pose que les cookies indispensables à son fonctionnement.
          <strong> Aucun cookie publicitaire, aucun traceur tiers, aucune mesure d&apos;audience</strong>{' '}
          n&apos;est utilisé en l&apos;état.
        </p>
      </section>
      <section>
        <h2>Gérer les cookies</h2>
        <p>
          Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti de leur
          dépôt. La navigation sur le site reste possible.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question sur ce point :{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </section>
    </LegalPage>
  )
}
