/**
 * Les six temps d'un dépannage de chauffage chez le client, dans l'ordre réel
 * (bloc 3 de l'accueil, mise à jour n°1 du 18/10/2026, #R66 et #R71). Chaque texte
 * tient en une phrase, 15 mots au plus (#R67). Aucun délai chiffré, aucune promesse.
 */
export interface EtapeIntervention {
  titre: string
  texte: string
}

export const ETAPES: readonly EtapeIntervention[] = [
  { titre: 'L’appel cerne la panne', texte: 'Vous décrivez ce que fait l’appareil, le code erreur et la pression orientent déjà.' },
  { titre: 'Le tarif avant de venir', texte: 'Le prix du déplacement et du diagnostic est annoncé au téléphone, sans surprise.' },
  { titre: 'Nous arrivons équipés', texte: 'Les pièces courantes des marques les plus posées sont déjà dans le véhicule.' },
  { titre: 'Le diagnostic sur l’appareil', texte: 'Pression, allumage, sondes et échangeur passés en revue, la cause est trouvée et expliquée.' },
  { titre: 'La réparation sur place', texte: 'La pièce défectueuse est remplacée, le plus souvent le jour même.' },
  { titre: 'La remise en route contrôlée', texte: 'Chauffage et eau chaude vérifiés, réglages notés, conseils laissés par écrit.' },
]

/** Cadre du dessin sur ordinateur et au téléphone (recadré au centre). */
export const COUPE_VB_LARGE = { x: 0, w: 1200, h: 800 }
export const COUPE_VB_SERRE = { x: 150, w: 900, h: 800 }
