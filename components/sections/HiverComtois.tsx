import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HaloThermique } from '@/components/ui/HaloThermique'
import { siteConfig } from '@/config/site.config'

/**
 * Ancrage local : ce que l'hiver de Franche-Comté impose au chauffage.
 *
 * Section éditoriale, sans chiffre. Toutes les affirmations sont qualitatives et
 * vérifiables (climat rigoureux, relief, diversité du bâti bisontin) : aucune
 * température, aucune durée, aucune statistique inventée. C'est ici que le site
 * cesse d'être interchangeable avec n'importe quelle autre ville.
 */
const CONTRAINTES = [
  {
    titre: 'Une saison de chauffe longue',
    texte:
      'Entre la position de la ville dans la vallée du Doubs et la proximité du premier plateau du Jura, le chauffage tourne ici plus longtemps que dans la plupart des villes de plaine. Une installation fatiguée le montre dès les premiers vrais froids.',
  },
  {
    titre: 'Des appareils très sollicités',
    texte:
      'Une chaudière qui fonctionne des mois d’affilée à plein régime use ses pièces d’usure au rythme de la saison. Les pannes n’arrivent presque jamais en septembre : elles arrivent quand la demande est maximale, c’est-à-dire au pire moment.',
  },
  {
    titre: 'Un bâti très hétérogène',
    texte:
      'La Boucle et Battant alignent des immeubles anciens en pierre avec des installations souvent collectives, quand la couronne périurbaine juxtapose pavillons des années soixante-dix au fioul et constructions récentes équipées de pompes à chaleur. Le diagnostic ne part jamais du même point.',
  },
  {
    titre: 'Le gel comme facteur aggravant',
    texte:
      'Un épisode de gel prolongé transforme une panne banale en urgence : sans chauffage, un logement se refroidit vite et le réseau d’eau devient vulnérable. C’est la raison pour laquelle nous tenons une ligne ouverte les week-ends et les jours fériés.',
  },
]

export function HiverComtois() {
  return (
    <section className="grain relative overflow-hidden bg-fonte-abysse" aria-labelledby="hiver-titre">
      <div aria-hidden="true" className="trame-graduee absolute inset-0 opacity-60" />
      <HaloThermique className="-left-32 top-1/4" teinte="jura" taille={520} />
      <HaloThermique className="-right-20 bottom-0" teinte="laiton" taille={380} decalage={-7} />

      <div className="enceinte relative plage">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <AnimatedSection>
              <p className="surtitre mb-5 flex items-center gap-3 text-laiton-clair">
                <span aria-hidden="true" className="h-px w-8 bg-laiton-franc" />
                Chauffer à {siteConfig.city}
              </p>
              <h2 className="text-titre-l text-calcaire-neige md:text-titre-xl">
                Un hiver comtois
                <br />
                ne pardonne pas
                <br />
                <span className="mot-laiton">une installation fatiguée.</span>
              </h2>
              <p className="mt-6 max-w-lecture text-chapo text-calcaire-brume">
                Nous travaillons sur un territoire où le chauffage n’est pas un confort d’appoint
                mais un équipement de première nécessité, plusieurs mois par an. Cela change la
                manière de diagnostiquer, et cela change l’urgence d’une panne.
              </p>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-fonte-brut/70">
              {CONTRAINTES.map((contrainte, i) => (
                <AnimatedSection
                  key={contrainte.titre}
                  as="li"
                  delay={i * 0.06}
                  className="flex gap-6 border-b border-fonte-brut/70 py-7"
                >
                  <span className="chiffre shrink-0 pt-1 font-titre text-legende text-laiton-patine">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-titre-s text-calcaire-neige">{contrainte.titre}</h3>
                    <p className="mt-2.5 max-w-lecture text-lecture text-calcaire-ombre">
                      {contrainte.texte}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HiverComtois
