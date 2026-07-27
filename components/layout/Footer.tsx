import Link from 'next/link'
import { Clock, Mail, MapPin, PhoneCall } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { LiveDot } from '@/components/ui/LiveDot'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'

export function Footer() {
  const annee = new Date().getFullYear()
  const services = getServices()
  const zones = getZones()

  return (
    <footer className="relative bg-fonte-abysse text-calcaire-brume">
      <div aria-hidden="true" className="filet-laiton absolute inset-x-0 top-0" />
      <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-40" />

      <div className="enceinte relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-legende leading-relaxed text-calcaire-ombre">
              Dépannage et entretien du chauffage à {siteConfig.city} et dans les communes du Grand
              Besançon. Chaudière gaz, chaudière fioul, pompe à chaleur, ballon d’eau chaude,
              circuit de chauffage central.
            </p>
            <LiveDot className="mt-7">Ligne urgence ouverte {siteConfig.availability}</LiveDot>
          </div>

          <div className="lg:col-span-3">
            <h2 className="surtitre mb-5 text-laiton-clair">Prestations</h2>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-legende text-calcaire-brume transition-colors hover:text-laiton-clair"
                  >
                    {service.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="surtitre mb-5 text-laiton-clair">Communes</h2>
            <ul className="space-y-2.5">
              {zones.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={`/zones/${zone.slug}`}
                    className="text-legende text-calcaire-brume transition-colors hover:text-laiton-clair"
                  >
                    {zone.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="surtitre mb-5 text-laiton-clair">Contact</h2>
            <ul className="space-y-4 text-legende">
              <li className="flex items-start gap-3">
                <PhoneCall size={15} className="mt-0.5 shrink-0 text-laiton-franc" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-calcaire-neige transition-colors hover:text-laiton-clair"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 shrink-0 text-laiton-franc" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-calcaire-neige transition-colors hover:text-laiton-clair"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-laiton-franc" />
                <span className="text-calcaire-ombre">
                  {siteConfig.city} et le Grand Besançon
                  <br />
                  {siteConfig.departmentName} ({siteConfig.department}), {siteConfig.region}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="mt-0.5 shrink-0 text-laiton-franc" />
                <span className="text-calcaire-ombre">{siteConfig.availability}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-fonte-brut/60 pt-7 text-legende text-calcaire-roche md:flex-row md:items-center md:justify-between">
          <p>
            © {annee} {siteConfig.businessName}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="transition-colors hover:text-laiton-clair">
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="transition-colors hover:text-laiton-clair"
            >
              Confidentialité
            </Link>
            <Link href="/politique-cookies" className="transition-colors hover:text-laiton-clair">
              Cookies
            </Link>
            <Link href="/cgu" className="transition-colors hover:text-laiton-clair">
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
