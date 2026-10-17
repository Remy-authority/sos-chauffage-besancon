import { Picto, type PictoNom } from '@/components/ui/Picto'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Bloc 5 de l'accueil, sombre : quatre raisons concrètes, chacune avec son picto
 * dessiné animé (#R71). Aucun chiffre inventé, aucune certification, aucun avis.
 */
const RAISONS: { picto: PictoNom; titre: string; texte: string }[] = [
  { picto: 'telephone', titre: 'La panne se cerne au téléphone', texte: 'Trois questions sur ce que fait l’appareil, et la pièce probable part avec nous.' },
  { picto: 'devis', titre: 'Le tarif avant de venir', texte: 'Déplacement et diagnostic annoncés à l’appel, le reste confirmé sur place avant de commencer.' },
  { picto: 'local', titre: 'Un chauffagiste de Besançon', texte: 'Nous connaissons les immeubles de la Boucle comme les pavillons de Saint-Ferjeux.' },
  { picto: 'horloge', titre: 'Ouvert quand il fait froid', texte: 'Soir, week-end et jours fériés aussi, une chaudière qui lâche en janvier n’attend pas lundi.' },
]

export function PourquoiNous() {
  return (
    <section id="pourquoi" className="grain plage relative overflow-hidden bg-fonte-abysse" aria-labelledby="pourquoi-titre">
      <div className="trame-graduee pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="enceinte relative">
        <SectionHeader id="pourquoi-titre" align="center" variant="dark" eyebrow="Pourquoi nous appeler" title="Ce qui change avec nous" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {RAISONS.map((r, k) => (
            <li
              key={r.titre}
              className="entree flex flex-col rounded-plaque border border-calcaire-neige/10 bg-fonte-coulee/60 p-6 backdrop-blur-sm"
              style={{ ['--decal' as string]: `${k * 0.1}s` }}
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-plaque bg-laiton-franc text-fonte-abysse">
                <Picto nom={r.picto} className="h-8 w-8" delai={`${0.2 + k * 0.1}s`} />
              </span>
              <h3 className="mt-5 font-titre text-titre-s text-calcaire-neige">{r.titre}</h3>
              <p className="mt-2 text-lecture text-calcaire-brume">{r.texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PourquoiNous
