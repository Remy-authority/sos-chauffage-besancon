/**
 * lib/seo.ts, helpers Metadata API + constructeurs JSON-LD.
 *
 * Règles du site (docs/SEO-GEO-PLAN.md §5) :
 *  - Schema LocalBusiness → sous-type **HVACBusiness**, le type schema.org dédié
 *    aux entreprises de chauffage et de climatisation. Avec `areaServed` couvrant
 *    Besançon et les communes ayant une page.
 *  - **PAS d'`address`** par défaut (siteConfig.legal.showAddress=false) tant que
 *    Rémy n'a pas tranché l'adresse.
 *  - **Aucun `AggregateRating` / `Review`** : le site n'affiche pas d'avis.
 *  - **Aucune certification déclarée** : rien dans le schema ne doit laisser
 *    entendre une qualification que nous n'avons pas.
 *  - Canonical absolu partout ; preview => noindex via env (voir robots.ts).
 */
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'
import type { Article, Service, Zone } from '@/lib/content'

const BASE = siteConfig.seo.canonicalBase.replace(/\/$/, '')

/** URL absolue à partir d'un chemin relatif. */
export function absUrl(path = '/'): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Sur les previews Vercel (ou quand SEO_NOINDEX=1) on bloque l'indexation pour
 * ne jamais exposer un site non validé aux moteurs. En prod : indexable.
 */
export const IS_NOINDEX =
  process.env.SEO_NOINDEX === '1' ||
  (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production')

type ArgsMeta = {
  title: string
  description: string
  path: string
  /** Force noindex sur une page utilitaire (merci, cgu, cookies…). */
  noindex?: boolean
  ogImage?: string
}

/** Fabrique une Metadata Next complète (canonical, OG, robots). */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  ogImage,
}: ArgsMeta): Metadata {
  const url = absUrl(path)
  const indexable = !noindex && !IS_NOINDEX
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: siteConfig.seo.locale,
      siteName: siteConfig.businessName,
      images: [{ url: absUrl(ogImage || siteConfig.seo.defaultOgImage) }],
    },
    robots: {
      index: indexable,
      follow: true, // toujours follow, même sur les pages noindex
      googleBot: { index: indexable, follow: true },
    },
  }
}

/* ────────────────────────────── JSON-LD ────────────────────────────── */

const ID_ENTREPRISE = `${BASE}/#business`

/**
 * L'entreprise (nœud global, posé dans le layout).
 *
 * Type `HVACBusiness` : schema.org propose un sous-type exact pour les métiers du
 * chauffage et de la climatisation, on l'utilise plutôt qu'un type générique.
 * `areaServed` est construit depuis le contenu (Besançon + communes publiées),
 * jamais écrit en dur.
 */
export function localBusinessJsonLd() {
  const zones = getZones()
  const services = getServices()

  const noeud: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': ID_ENTREPRISE,
    name: siteConfig.businessName,
    description: `${siteConfig.trade} à ${siteConfig.city} et dans le Grand Besançon : dépannage de chaudière gaz et fioul, pompe à chaleur, ballon d'eau chaude, radiateurs, entretien annuel obligatoire et climatisation réversible air-air.`,
    url: BASE,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absUrl(siteConfig.seo.defaultOgImage),
    priceRange: '€€',
    areaServed: [
      { '@type': 'City', name: siteConfig.serviceArea.base },
      ...zones.map((z) => ({
        '@type': 'City',
        name: z.name,
        ...(z.postalCode ? { postalCode: z.postalCode } : {}),
      })),
    ],
    // Nom de propriété correct pour les horaires (et non « hoursOfOperation »).
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    knowsAbout: siteConfig.appareils,
  }

  // address UNIQUEMENT si Rémy a tranché (showAddress=true).
  if (siteConfig.legal.showAddress) {
    noeud.address = {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.legal.address.street,
      postalCode: siteConfig.legal.address.postalCode,
      addressLocality: siteConfig.legal.address.city,
      addressCountry: 'FR',
    }
  }

  // Catalogue de prestations : lu depuis content/services, jamais écrit en dur.
  if (services.length) {
    noeud.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `Prestations de chauffage à ${siteConfig.city}`,
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.navTitle,
          url: absUrl(`/services/${s.slug}`),
        },
      })),
    }
  }

  // ⛔ Aucun aggregateRating / review tant que features.reviews=false.
  return noeud
}

export function serviceJsonLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    serviceType: service.navTitle,
    description: service.metaDescription,
    provider: { '@id': ID_ENTREPRISE },
    areaServed: { '@type': 'City', name: siteConfig.serviceArea.base },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'Dépannage chauffage',
        areaServed: 'FR',
        availableLanguage: 'French',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      },
      serviceUrl: absUrl('/contact'),
    },
    url: absUrl(`/services/${service.slug}`),
  }
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  if (!faq?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  }
}

export function zoneJsonLd(zone: Zone) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: zone.h1,
    serviceType: siteConfig.trade,
    description: zone.metaDescription,
    provider: { '@id': ID_ENTREPRISE },
    areaServed: {
      '@type': 'City',
      name: zone.name,
      ...(zone.postalCode ? { postalCode: zone.postalCode } : {}),
    },
    url: absUrl(`/zones/${zone.slug}`),
  }
}

export function articleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: siteConfig.businessName },
    publisher: { '@id': ID_ENTREPRISE },
    mainEntityOfPage: absUrl(`/conseils/${article.slug}`),
    ...(article.cover ? { image: absUrl(article.cover) } : {}),
  }
}

/** Sérialise un ou plusieurs nœuds JSON-LD pour <script>. */
export function jsonLdScript(...nodes: (object | null)[]): string {
  const propres = nodes.filter(Boolean)
  return JSON.stringify(propres.length === 1 ? propres[0] : propres)
}
