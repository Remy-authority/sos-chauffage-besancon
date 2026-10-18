import Link from 'next/link'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'
import { Logo } from '@/components/ui/Logo'
import { LiveDot } from '@/components/ui/LiveDot'
import { VoletPied } from '@/components/layout/VoletPied'

/**
 * Pied de page T3 (réécrit à la mise à jour n°1, 18/10/2026) : volets fermés au
 * téléphone, colonnes alignées au pixel sur ordinateur (#R69), toutes les communes
 * reliées, Tarifs relié ici (jamais au menu, #R46), logo centré au téléphone (#R53).
 */
const LIEN = 'block leading-6 text-legende text-calcaire-brume transition-colors hover:text-laiton-clair'

export function Footer() {
  const services = getServices()
  const zones = getZones()
  const annee = new Date().getFullYear()

  return (
    <footer className="relative bg-fonte-abysse text-calcaire-brume">
      <div className="filet-laiton absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="trame-graduee pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="enceinte relative py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="text-center lg:col-span-4 lg:text-left">
            <Link href="/" className="inline-flex" aria-label={`${siteConfig.businessName}, accueil`}>
              <Logo tone="light" empile />
            </Link>
            <p className="mx-auto mt-5 max-w-xs text-legende leading-6 text-calcaire-brume lg:mx-0">
              Dépannage de chaudière, de chauffage et d’eau chaude à {siteConfig.city} et dans le Grand Besançon. Le tarif est annoncé avant de venir.
            </p>
            <div className="mt-6 flex justify-center lg:justify-start">
              <LiveDot tone="light">Ligne urgence ouverte {siteConfig.availability}</LiveDot>
            </div>
          </div>

          <div className="lg:col-span-3">
            <VoletPied titre="Prestations">
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={LIEN}>{s.navTitle}</Link>
                  </li>
                ))}
                <li><Link href="/tarifs" className={LIEN}>Nos tarifs</Link></li>
                <li><Link href="/services" className={`${LIEN} font-semibold text-laiton-clair`}>Toutes les prestations</Link></li>
              </ul>
            </VoletPied>
          </div>

          <div className="lg:col-span-3">
            <VoletPied titre="Communes" plus={<Link href="/zones" className="text-calcaire-brume hover:text-laiton-clair">Voir tout</Link>}>
              <ul className="space-y-2 lg:columns-2 lg:gap-6">
                {zones.map((z) => (
                  <li key={z.slug} className="break-inside-avoid">
                    <Link href={`/zones/${z.slug}`} className={LIEN}>{z.name}</Link>
                  </li>
                ))}
                <li className="break-inside-avoid lg:hidden"><Link href="/zones" className={`${LIEN} font-semibold text-laiton-clair`}>Toutes les communes</Link></li>
              </ul>
            </VoletPied>
          </div>

          <div className="lg:col-span-2">
            <VoletPied titre="Contact">
              <ul className="space-y-2">
                <li><Link href="/contact" className={LIEN}>Nous écrire</Link></li>
                <li><Link href="/conseils" className={LIEN}>Conseils chauffage</Link></li>
                <li><a href={`mailto:${siteConfig.email}`} className={LIEN}>{siteConfig.email}</a></li>
                <li className={`${LIEN} hover:text-calcaire-brume`}>{siteConfig.city}, {siteConfig.departmentName} ({siteConfig.department})</li>
                <li className={`${LIEN} hover:text-calcaire-brume`}>Ouvert {siteConfig.availability}</li>
              </ul>
            </VoletPied>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 text-center text-xs text-calcaire-brume/80 lg:mt-14 lg:flex-row lg:justify-between lg:border-t lg:border-fonte-brut/60 lg:pt-7 lg:text-left">
          <p>© {annee} {siteConfig.businessName}. Chauffagiste à {siteConfig.city}.</p>
          <nav aria-label="Pages légales" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-laiton-clair">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-laiton-clair">Confidentialité</Link>
            <Link href="/politique-cookies" className="hover:text-laiton-clair">Cookies</Link>
            <Link href="/cgu" className="hover:text-laiton-clair">CGU</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
