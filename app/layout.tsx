import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site.config'
import { themeCssVars } from '@/lib/theme'
import { buildMetadata, jsonLdScript, localBusinessJsonLd } from '@/lib/seo'
import { getServices } from '@/lib/content'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyCTA } from '@/components/layout/StickyCTA'

/**
 * Duo typographique du template T3.
 *
 *  - Bricolage Grotesque pour les titres : une grotesque contemporaine à l'axe
 *    optique variable, qui resserre ses contreformes en grand corps. Elle donne
 *    au site un display affirmé sans passer par une serif.
 *  - IBM Plex Sans pour le corps et l'interface : dessinée pour la documentation
 *    technique, très lisible en petit corps, cohérente avec l'ancrage
 *    microtechnique de Besançon.
 *
 * Les deux sont auto-hébergées au build par next/font (aucune requête Google au
 * runtime, pas de FOUT).
 */
const policeTitre = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--police-titre',
  display: 'swap',
  axes: ['opsz'],
})

const policeTexte = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--police-texte',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const titreAccueil = `Dépannage chauffage et chaudière à ${siteConfig.city}, urgence 24h/24`
const descriptionAccueil = `Chauffagiste à ${siteConfig.city} et dans le Grand Besançon : dépannage de chaudière gaz et fioul, pompe à chaleur, ballon d'eau chaude, radiateurs froids, entretien annuel obligatoire. Ligne ouverte 7j/7.`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.canonicalBase),
  title: {
    default: titreAccueil,
    template: `%s, ${siteConfig.businessName}`,
  },
  ...buildMetadata({ title: titreAccueil, description: descriptionAccueil, path: '/' }),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteConfig.colors.light },
    { media: '(prefers-color-scheme: dark)', color: siteConfig.colors.dark },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const services = getServices().map((s) => ({ slug: s.slug, navTitle: s.navTitle }))

  return (
    <html
      lang={siteConfig.seo.lang}
      className={`${policeTitre.variable} ${policeTexte.variable}`}
      style={themeCssVars()}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(localBusinessJsonLd()) }}
        />
      </head>
      <body className="bg-calcaire-neige">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-module focus:bg-fonte-abysse focus:px-5 focus:py-3 focus:text-calcaire-neige"
        >
          Aller au contenu
        </a>
        <Header services={services} />
        <main id="main">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  )
}
