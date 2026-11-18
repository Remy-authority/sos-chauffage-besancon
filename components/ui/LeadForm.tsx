'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { siteConfig } from '@/config/site.config'
import { Picto, type PictoNom } from './Picto'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LE FORMULAIRE DE DEMANDE, en 3 étapes (formulaire court, Rémy 13/11/2026,
 *  `tasks/regle-formulaire.md`, kickoff du 16/11/2026). Remplace le formulaire à
 *  8 cases (étape 2 : commune tapée + urgence ; étape 3 : email et précisions).
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⛔ INTOUCHABLE : les noms de champs et l'ORDRE des clés du corps envoyé (`VIDE`
 *  ci-dessous, puis `company`), les valeurs des pannes AU CARACTÈRE PRÈS, le piège
 *  `company`, `data-clic-formulaire` et `data-lead-form` (compteur `SuiviVisite`).
 *
 *   - Étape 1 : « Quelle est votre urgence ? » (Rémy 18/11), 4 pannes en 2 x 2, un clic avance. Les autres
 *     valeurs d'avant (« Plus d'eau chaude », « Autre situation »…) ne sont plus proposées,
 *     la route les accepte toujours.
 *   - Étape 2 : « Que fait l'appareil ? », 4 réponses en 2 x 2, un clic avance ; la réponse
 *     part en tête de `message`.
 *   - Étape 3 : Nom | Prénom (envoyés ensemble dans `nom`), Téléphone | Code postal, puis
 *     « Précisions (facultatif) » à la suite dans `message`. La commune se trouve toute seule
 *     par le code postal (public/cp/, copié de Poitou) et part dans `ville` (« Besançon 25000 »).
 *   - Partent VIDES (plus demandés à l'écran) : urgence, email.
 *   - Bouton d'envoi toujours actif : au clic, les cases manquantes s'allument en rouge.
 *   - UN seul dessin partout. `ecran1` : carte posée sur la photo du bloc 1, translucide à
 *     l'arrivée puis noire pleine au premier choix ; ailleurs, noire.
 *   - Chaque étape atteinte (2 puis 3) envoie `rr-etape`, compté par `SuiviVisite`.
 *   - `memoire` (bloc 1 de l'accueil) : l'état survit au passage du film à l'écran fixe, et
 *     le premier choix envoie `leadform:touche` pour que le film s'arrête pour de bon.
 *
 *  Chauffage David, signé le 18/11/2026 (Rémy) : chaudières gaz, fioul et électrique, dépannage
 *  et entretien, PAS de pompe à chaleur ; 30 km autour de Besançon ; 8 h-18 h, 7 jours sur 7.
 *   - Étape 1 : gaz, fioul, électrique, entretien (pompe à chaleur et radiateurs retirés).
 *   - Étape 2, panne : « propriétaire ou locataire ? » d'abord (modèle SOS Chauffage Reims) ;
 *     un locataire est arrêté, rien n'est envoyé ; puis ce que fait l'appareil.
 *     Étape 2, entretien : quelle chaudière (l'entretien est à la charge de l'occupant).
 *   - Étape 3 : commune hors des 30 km (public/zone-30km.json, scripts/zone-30km.py) = arrêtée,
 *     rien n'est envoyé ; avant 8 h ou après 18 h, le rappel à 8 h est annoncé et écrit dans
 *     `message` pour le technicien.
 */

type Etape = 1 | 2 | 3

interface Champs {
  probleme: string
  ville: string
  urgence: string
  nom: string
  telephone: string
  email: string
  message: string
}

/** Ordre des clés = ordre du corps JSON envoyé (inchangé). Ne pas le changer. */
const VIDE: Champs = {
  probleme: '',
  ville: '',
  urgence: '',
  nom: '',
  telephone: '',
  email: '',
  message: '',
}

/** `id` = valeur envoyée, jamais changée ; `label` = texte affiché. */
const PANNES: readonly { id: string; label: string; picto: PictoNom }[] = [
  { id: 'Chaudière gaz en panne', label: 'Chaudière gaz', picto: 'chaudiere' },
  { id: 'Chaudière fioul en panne', label: 'Chaudière fioul', picto: 'fioul' },
  { id: 'Chaudière électrique en panne', label: 'Chaudière électrique', picto: 'eclair' },
  { id: 'Entretien de chaudière', label: 'Entretien', picto: 'entretien' },
]

/** L'entretien n'a pas de symptôme : on demande la chaudière (« Entretien… » en tête, lu par Rank OS). */
const ENTRETIEN = 'Entretien de chaudière'
const CHAUDIERES: readonly { id: string; picto: PictoNom | null }[] = [
  { id: 'Gaz', picto: 'chaudiere' },
  { id: 'Fioul', picto: 'fioul' },
  { id: 'Électrique', picto: 'eclair' },
  { id: 'Je ne sais pas', picto: null },
]

/**
 * Une panne n'est commandée que par le propriétaire (Rémy 18/11/2026, comme à Reims), ou par
 * l'agence immobilière qui gère le logement (Rémy 18/11/2026, la 1re demande de Nicolas David).
 */
const OCCUPANTS: readonly { id: string; label: string; picto: PictoNom }[] = [
  { id: 'Propriétaire', label: 'Je suis propriétaire', picto: 'maison' },
  { id: 'Locataire', label: 'Je suis locataire', picto: 'immeuble' },
  { id: 'Agence immobilière', label: 'Agence immobilière', picto: 'agence' },
]

/** Le propriétaire et l'agence passent ; le locataire est arrêté. */
const peutCommander = (o: string) => o === 'Propriétaire' || o === 'Agence immobilière'

/** Horaires du technicien, à l'heure de Paris : 8 h-18 h, 7 jours sur 7. */
const OUVERTURE_MINUTES = 8 * 60
const FERMETURE_MINUTES = 18 * 60

/** `null` pendant les horaires ; sinon le jour du rappel. */
function rappelHorsHoraires(maintenant = new Date()): "aujourd'hui" | 'demain' | null {
  const [h, m] = maintenant
    .toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false })
    .split(':')
    .map(Number)
  const minutes = h * 60 + m
  if (minutes < OUVERTURE_MINUTES) return "aujourd'hui"
  if (minutes >= FERMETURE_MINUTES) return 'demain'
  return null
}

/** Communes à 30 km au plus de Besançon, par code postal (lu une fois, à l'étape 3). */
let ZONE: Promise<Record<string, string[]>> | null = null
function zone(): Promise<Record<string, string[]>> {
  ZONE ??= fetch('/zone-30km.json')
    .then((r) => (r.ok ? (r.json() as Promise<Record<string, string[]>>) : {}))
    .catch(() => ({}))
  return ZONE
}

const INCONNU: ReactNode = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8 0c0 1.6-2.4 2-2.4 3.6" />
    <path d="M12 16.6h.01" />
  </svg>
)

/** La question du métier : ce que fait l'appareil, pour que le dépanneur sache quoi apporter. */
const SYMPTOMES: readonly { id: string; picto: PictoNom | null }[] = [
  { id: 'Ne démarre plus', picto: 'alerte' },
  { id: 'Code erreur affiché', picto: 'ecran' },
  { id: 'Fuite ou bruit', picto: 'goutte' },
  { id: 'Je ne sais pas', picto: null },
]

const TITRES: Record<Etape, { titre: string; aide: string }> = {
  1: { titre: 'Quelle est votre urgence ?', aide: 'Devis gratuit en 30 secondes.' },
  2: { titre: 'Que fait l’appareil ?', aide: 'Le technicien saura quoi apporter.' },
  3: { titre: 'Où vous rappeler ?', aide: 'Nous vous rappelons au plus vite.' },
}

const TITRE_OCCUPANT = { titre: 'Qui fait la demande ?', aide: 'Le propriétaire ou son agence commande le dépannage.' }
const TITRE_CHAUDIERE = { titre: 'Quelle chaudière ?', aide: 'Le technicien saura quoi apporter.' }

type Manque = 'nom' | 'telephone' | 'lieu'
const NOM_DU_MANQUE: Record<Manque, string> = {
  nom: 'votre nom',
  telephone: 'un téléphone valide',
  lieu: 'votre code postal et votre commune',
}

/** Évènement du premier choix (bloc 1 de l'accueil) : le film s'arrête pour de bon. */
export const EVENEMENT_TOUCHE = 'leadform:touche'

// Communes par code postal, rangées dans le site (public/cp/<2 chiffres>.json, tirées de
// geo.api.gouv.fr) : réponse immédiate, aucun service extérieur. Un fichier lu une seule fois.
const COMMUNES_DU_DEPARTEMENT = new Map<string, Promise<Record<string, string[]>>>()

function communesDuDepartement(deux: string): Promise<Record<string, string[]>> {
  let lu = COMMUNES_DU_DEPARTEMENT.get(deux)
  if (!lu) {
    lu = fetch(`/cp/${deux}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<Record<string, string[]>>) : {}))
      .catch(() => ({}))
    COMMUNES_DU_DEPARTEMENT.set(deux, lu)
  }
  return lu
}

/** État d'un formulaire `memoire`, gardé hors de React (le bloc 1 le remonte ailleurs). */
interface Etat {
  etape: Etape
  probleme: string
  occupant: string
  symptome: string
  nom: string
  prenom: string
  telephone: string
  lieu: string
  precision: string
  commune: string
}
const MEMOIRE = new Map<string, Etat>()

export function LeadForm({
  idPrefix = '',
  ecran1 = false,
  memoire = false,
}: {
  /** Ancien réglage de taille, sans effet : un seul dessin partout. */
  variante?: 'normal' | 'compact'
  /** Évite les doublons d'`id` entre deux instances d'une même page. */
  idPrefix?: string
  /** Carte posée sur la photo du bloc 1 : translucide, puis noire au premier choix. */
  ecran1?: boolean
  /** Bloc 1 de l'accueil : état gardé au remontage, premier choix signalé au film. */
  memoire?: boolean
} = {}) {
  const cle = idPrefix || 'formulaire'
  const depart = memoire ? MEMOIRE.get(cle) : undefined
  const [etape, setEtape] = useState<Etape>(depart?.etape ?? 1)
  const [probleme, setProbleme] = useState(depart?.probleme ?? '')
  const [occupant, setOccupant] = useState(depart?.occupant ?? '')
  const [symptome, setSymptome] = useState(depart?.symptome ?? '')
  const [nom, setNom] = useState(depart?.nom ?? '')
  const [prenom, setPrenom] = useState(depart?.prenom ?? '')
  const [telephone, setTelephone] = useState(depart?.telephone ?? '')
  const [lieu, setLieu] = useState(depart?.lieu ?? '')
  const [precision, setPrecision] = useState(depart?.precision ?? '')
  const [commune, setCommune] = useState(depart?.commune ?? '')
  const [propositions, setPropositions] = useState<string[]>([])
  const [manques, setManques] = useState<Manque[]>([])
  const [statut, setStatut] = useState<'repos' | 'envoi' | 'erreur'>('repos')
  const [horsHoraires, setHorsHoraires] = useState<"aujourd'hui" | 'demain' | null>(null)
  const [horsZone, setHorsZone] = useState(false)
  const entretien = probleme === ENTRETIEN
  const demandeOccupant = etape === 2 && !entretien && !peutCommander(occupant)

  // Bloc 1 : l'état est recopié à chaque changement, AVANT l'effet d'étape ci-dessous (ordre
  // des effets) ; le film peut donc remonter le formulaire juste après le premier choix.
  useEffect(() => {
    if (memoire) MEMOIRE.set(cle, { etape, probleme, occupant, symptome, nom, prenom, telephone, lieu, precision, commune })
  }, [memoire, cle, etape, probleme, occupant, symptome, nom, prenom, telephone, lieu, precision, commune])

  // L'heure se lit dans le navigateur (jamais au rendu serveur : la page est statique).
  useEffect(() => {
    if (etape === 3) setHorsHoraires(rappelHorsHoraires())
  }, [etape])

  // Secteur de 30 km : code postal hors liste = dehors ; code postal mixte = jugé sur la commune.
  useEffect(() => {
    if (lieu.length !== 5) return setHorsZone(false)
    let annule = false
    zone().then((z) => {
      if (annule) return
      const dedans = z[lieu] ?? []
      const nomCommune = commune ? commune.slice(0, -6) : ''
      setHorsZone(dedans.length === 0 || (nomCommune !== '' && !dedans.includes(nomCommune)))
    })
    return () => {
      annule = true
    }
  }, [lieu, commune])

  // À chaque étape : le titre reçoit le focus (lecteurs d'écran) sans faire défiler, l'étape
  // atteinte est comptée (`rr-etape`), et la carte revient entière à l'écran si elle en sort.
  const racineRef = useRef<HTMLDivElement>(null)
  const titreRef = useRef<HTMLHeadingElement>(null)
  const aBouge = useRef(false)
  useEffect(() => {
    if (!aBouge.current) return
    titreRef.current?.focus({ preventScroll: true })
    if (etape > 1) window.dispatchEvent(new CustomEvent('rr-etape', { detail: etape }))
    if (memoire && etape === 2) window.dispatchEvent(new CustomEvent(EVENEMENT_TOUCHE, { detail: cle }))
  }, [etape, memoire, cle])
  useEffect(() => {
    if (!aBouge.current) return
    const carte = racineRef.current
    if (!carte) return
    const r = carte.getBoundingClientRect()
    // La barre fixe du bas, au téléphone et à la tablette seulement (StickyCTA).
    const barreDuBas = window.innerWidth < 1024 ? 72 : 12
    if (r.top < 64 || r.bottom > window.innerHeight - barreDuBas) {
      carte.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'nearest' })
    }
  }, [etape, occupant, manques.length, propositions.length, commune, horsZone])

  function allerA(n: Etape) {
    aBouge.current = true
    setEtape(n)
  }

  // Dès les deux premiers chiffres la liste du département se charge, au cinquième la commune
  // est trouvée (une seule : retenue ; plusieurs : proposées).
  useEffect(() => {
    if (lieu.length < 2) return
    let annule = false
    communesDuDepartement(lieu.slice(0, 2)).then((codes) => {
      if (annule || lieu.length !== 5 || commune) return
      const noms = codes[lieu] ?? []
      if (noms.length === 1) setCommune(`${noms[0]} ${lieu}`)
      else setPropositions(noms)
    })
    return () => {
      annule = true
    }
  }, [lieu, commune])

  const id = (c: string) => `${idPrefix}${c}`

  function choisirPanne(valeur: string) {
    if (valeur !== probleme) setSymptome('')
    setOccupant('')
    setProbleme(valeur)
    allerA(2)
  }

  function choisirOccupant(valeur: string) {
    aBouge.current = true
    setOccupant(valeur)
  }

  function choisirSymptome(valeur: string) {
    setSymptome(valeur)
    allerA(3)
  }

  function saisirLieu(valeur: string) {
    setLieu(valeur.replace(/\D/g, '').slice(0, 5))
    setCommune('')
    setPropositions([])
    retirerManque('lieu')
  }

  function retenirCommune(nomCommune: string) {
    setCommune(`${nomCommune} ${lieu}`)
    setPropositions([])
  }

  function retirerManque(c: Manque) {
    setManques((prev) => (prev.includes(c) ? prev.filter((m) => m !== c) : prev))
  }

  async function envoyer() {
    const saisie = lieu.trim()
    const oublis: Manque[] = []
    if (!nom.trim()) oublis.push('nom')
    if (telephone.replace(/\D/g, '').length < 8) oublis.push('telephone')
    // Code postal à plusieurs communes : la commune se touche (le secteur se juge sur elle).
    if (saisie.length !== 5 || (!commune && propositions.length > 1)) oublis.push('lieu')
    setManques(oublis)
    if (oublis.length > 0) {
      document.getElementById(id(oublis[0]))?.focus()
      return
    }
    if (!probleme) return allerA(1)
    if (!entretien && !peutCommander(occupant)) return allerA(2)
    if (!symptome) return allerA(2)
    if (horsZone) return

    const champs: Champs = {
      ...VIDE,
      probleme,
      ville: commune || saisie,
      nom: [prenom.trim(), nom.trim()].filter(Boolean).join(' '),
      telephone: telephone.trim(),
      // Tout voyage dans `message` (le technicien lit cette ligne), comme à Reims.
      message: [
        entretien ? `Chaudière : ${symptome}` : `Ce que fait l'appareil : ${symptome}`,
        entretien ? '' : occupant,
        horsHoraires ? `envoyée hors horaires, rappel ${horsHoraires} à partir de 8 h` : '',
        precision.trim(),
      ]
        .filter(Boolean)
        .join('. '),
    }

    setStatut('envoi')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...champs, company: '' }),
      })
      if (!res.ok) throw new Error()
      if (memoire) MEMOIRE.delete(cle)
      window.location.href = '/merci'
    } catch {
      setStatut('erreur')
    }
  }

  // ── Habillage : un seul dessin sur tout le site ─────────────────────────────
  const carte = `rounded-plaque border p-5 text-center text-calcaire-neige shadow-[0_30px_70px_-30px_rgb(0_0_0/0.8)] max-[359px]:px-3.5 max-[359px]:py-4 sm:p-7 lg:text-left ${
    ecran1
      ? `transition-colors duration-300 ${
          probleme ? 'border-calcaire-neige/15 bg-fonte-abysse' : 'border-calcaire-neige/25 bg-fonte-abysse/55 backdrop-blur-[3px]'
        }`
      : 'border-calcaire-neige/10 bg-fonte-abysse'
  }`

  const champClasse = (c?: Manque) =>
    `w-full rounded-plaque border bg-calcaire-neige/[0.07] px-3 py-2.5 text-[16px] text-calcaire-neige transition focus:border-laiton-franc focus:outline-none focus:ring-2 focus:ring-laiton-franc/25 ${
      c && manques.includes(c) ? 'border-red-400 ring-1 ring-red-400' : 'border-calcaire-neige/25'
    }`
  const labelClasse = 'mb-1.5 block text-left text-[13px] font-semibold text-calcaire-brume'

  // Tuile pleine (jamais transparente), picto au-dessus du libellé ; la tuile choisie prend le
  // laiton. Survol réservé à la souris : au doigt, la tuile suivante ne paraît pas choisie.
  const tuile = (choisi: boolean) =>
    `flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-plaque border px-1.5 py-2.5 text-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laiton-franc max-[359px]:min-h-[62px] sm:min-h-[88px] sm:gap-2 sm:px-2 sm:py-3.5 lg:items-start lg:px-4 lg:text-left ${
      choisi
        ? 'border-laiton-franc bg-laiton-franc text-fonte-abysse [&_svg]:text-fonte-abysse'
        : 'border-laiton-franc/45 bg-fonte-trempe text-calcaire-neige [@media(hover:hover)]:hover:border-laiton-franc [@media(hover:hover)]:hover:bg-fonte-brut'
    }`
  const libelleClasse = 'font-semibold leading-tight text-[clamp(12.5px,3.7vw,14.5px)] [text-wrap:balance]'
  const pictoClasse = 'h-[26px] w-[26px] text-laiton-clair sm:h-7 sm:w-7'
  const titres = etape !== 2 ? TITRES[etape] : entretien ? TITRE_CHAUDIERE : demandeOccupant ? TITRE_OCCUPANT : TITRES[2]
  const avis = 'mt-4 rounded-plaque border border-laiton-franc/35 bg-laiton-franc/10 p-4 text-left text-[14px] leading-relaxed text-calcaire-neige'

  return (
    <div
      ref={racineRef}
      data-clic-formulaire
      data-lead-form={cle}
      className={`${carte} scroll-mb-24 scroll-mt-24`}
      role="region"
      aria-label="Formulaire de demande"
    >
      {/* Piège à robots, invisible pour les humains */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" readOnly />
      </div>

      {/* Progression, avec « Retour » dès l'étape 2 */}
      <div className="flex min-h-[20px] items-center gap-3">
        {etape > 1 && (
          <button
            type="button"
            onClick={() => {
              if (etape === 2 && !entretien && peutCommander(occupant)) return choisirOccupant('')
              if (etape === 3 && !entretien && !peutCommander(occupant)) setOccupant('Propriétaire')
              allerA((etape - 1) as Etape)
            }}
            className="-my-2 -ml-1 inline-flex shrink-0 items-center gap-1 rounded-plaque py-2 pl-1 pr-1.5 text-[13px] font-semibold text-calcaire-brume transition-colors hover:text-calcaire-neige"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour
          </button>
        )}
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {([1, 2, 3] as Etape[]).map((n) => (
            <span
              key={n}
              className={`h-1 flex-1 rounded-[2px] transition-colors duration-300 ${
                n < etape ? 'bg-laiton-patine' : n === etape ? 'bg-laiton-franc' : 'bg-calcaire-neige/15'
              }`}
            />
          ))}
        </div>
        <span className="shrink-0 text-[11.5px] font-bold uppercase tracking-[0.14em] text-calcaire-ombre">Étape {etape}/3</span>
      </div>

      <h3
        ref={titreRef}
        tabIndex={-1}
        className={`mt-4 font-titre text-[clamp(1.3rem,6.4vw,1.75rem)] font-semibold leading-tight tracking-tight text-calcaire-neige outline-none max-[359px]:mt-3 sm:mt-5 ${
          etape === 1 ? 'whitespace-nowrap' : '[text-wrap:balance]'
        }`}
      >
        {titres.titre}
      </h3>
      <p className="mt-1 text-[13.5px] text-calcaire-brume [text-wrap:balance]">{titres.aide}</p>

      {/* ── Étape 1 : la panne, un clic avance ──────────────────────────────── */}
      {etape === 1 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-2.5" role="group" aria-label="Votre projet">
          {PANNES.map((p) => {
            const choisi = probleme === p.id
            return (
              <button
                data-clic-formulaire
                key={p.id}
                type="button"
                onClick={() => choisirPanne(p.id)}
                aria-pressed={choisi}
                className={tuile(choisi)}
              >
                <Picto nom={p.picto} className={pictoClasse} />
                <span className={libelleClasse}>{p.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* ── Étape 2 : ce que fait l'appareil, un clic avance ────────────────── */}
      {demandeOccupant && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-2.5" role="group" aria-label="Qui fait la demande">
            {OCCUPANTS.map((o) => {
              const choisi = occupant === o.id
              return (
                <button
                  data-clic-formulaire
                  key={o.id}
                  type="button"
                  onClick={() => choisirOccupant(o.id)}
                  aria-pressed={choisi}
                  className={`${tuile(choisi)}${o.picto === 'agence' ? ' col-span-2' : ''}`}
                >
                  <Picto nom={o.picto} className={pictoClasse} />
                  <span className={libelleClasse}>{o.label}</span>
                </button>
              )
            })}
          </div>
          {occupant === 'Locataire' && (
            <p role="status" className={avis}>
              Une panne de chaudière se règle avec le propriétaire du logement : prévenez-le et donnez-lui
              l’adresse de notre site, c’est lui qui nous fera la demande. Rien n’a été envoyé.
            </p>
          )}
        </>
      )}

      {etape === 2 && !demandeOccupant && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-2.5" role="group" aria-label={entretien ? 'Votre chaudière' : 'Ce que fait l’appareil'}>
          {(entretien ? CHAUDIERES : SYMPTOMES).map((s) => {
            const choisi = symptome === s.id
            return (
              <button
                data-clic-formulaire
                key={s.id}
                type="button"
                onClick={() => choisirSymptome(s.id)}
                aria-pressed={choisi}
                className={tuile(choisi)}
              >
                {s.picto ? (
                  <Picto nom={s.picto} className={pictoClasse} />
                ) : (
                  <span className={`block shrink-0 ${pictoClasse}`}>{INCONNU}</span>
                )}
                <span className={libelleClasse}>{s.id}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* ── Étape 3 : deux champs par ligne, deux lignes, puis l'envoi ──────── */}
      {etape === 3 && (
        <div className="mt-4 sm:mt-5">
          {horsHoraires && (
            <p role="status" className={`${avis} mb-4 mt-0`}>
              Notre technicien reprend {horsHoraires} à 8&nbsp;h. Votre demande sera bien enregistrée et il vous
              rappelle dès 8&nbsp;h.
            </p>
          )}
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-3">
            <div>
              <label htmlFor={id('nom')} className={labelClasse}>
                Nom
              </label>
              <input
                id={id('nom')}
                name="nom"
                type="text"
                autoComplete="family-name"
                autoCapitalize="words"
                aria-invalid={manques.includes('nom')}
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value)
                  retirerManque('nom')
                }}
                className={champClasse('nom')}
              />
            </div>
            <div>
              <label htmlFor={id('prenom')} className={labelClasse}>
                Prénom
              </label>
              <input
                id={id('prenom')}
                name="prenom"
                type="text"
                autoComplete="given-name"
                autoCapitalize="words"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className={champClasse()}
              />
            </div>
            <div>
              <label htmlFor={id('telephone')} className={labelClasse}>
                Téléphone
              </label>
              <input
                id={id('telephone')}
                name="telephone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={manques.includes('telephone')}
                value={telephone}
                onChange={(e) => {
                  setTelephone(e.target.value)
                  retirerManque('telephone')
                }}
                className={champClasse('telephone')}
              />
            </div>
            <div>
              <label htmlFor={id('lieu')} className={labelClasse}>
                Code postal
              </label>
              <input
                id={id('lieu')}
                name="ville"
                type="text"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={5}
                aria-invalid={manques.includes('lieu')}
                value={lieu}
                onChange={(e) => saisirLieu(e.target.value)}
                className={champClasse('lieu')}
              />
            </div>
          </div>

          {/* La commune trouvée, ou les communes du code postal à toucher (une ligne qui défile). */}
          {commune && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-laiton-clair lg:justify-end">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              {commune}
            </p>
          )}
          {!commune && propositions.length > 0 && (
            <div
              // w-0 + min-w-full : la ligne défile sans jamais élargir la carte ni la page.
              className="mt-2 flex w-0 min-w-full gap-1.5 overflow-x-auto pb-1"
              role="group"
              aria-label="Votre commune"
            >
              {propositions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => retenirCommune(p)}
                  className="shrink-0 whitespace-nowrap rounded-plaque border border-calcaire-neige/20 bg-calcaire-neige/[0.06] px-2.5 py-1.5 text-[13px] font-semibold text-calcaire-neige hover:border-laiton-franc"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {horsZone && (
            <p role="status" className={avis}>
              Nous intervenons à 30&nbsp;km autour de Besançon : votre commune est hors de notre secteur. Rien
              n’a été envoyé.
            </p>
          )}

          <div className="mt-3">
            <label htmlFor={id('precision')} className={labelClasse}>
              Précisions <span className="font-normal text-calcaire-ombre">(facultatif)</span>
            </label>
            <input
              id={id('precision')}
              name="message"
              type="text"
              maxLength={300}
              value={precision}
              onChange={(e) => setPrecision(e.target.value)}
              className={champClasse()}
            />
          </div>

          {manques.length > 0 && (
            <p role="alert" className="mt-3 text-[13px] font-semibold text-red-300">
              Complétez les cases en rouge.
              <span className="sr-only"> Il nous manque {manques.map((m) => NOM_DU_MANQUE[m]).join(' et ')}.</span>
            </p>
          )}
          {statut === 'erreur' && (
            <p role="alert" className="mt-3 rounded-plaque bg-red-500/15 px-4 py-3 text-[14px] font-medium text-red-200">
              L’envoi a échoué. Appelez-nous directement au {siteConfig.phoneDisplay}.
            </p>
          )}

          <button
            type="button"
            onClick={envoyer}
            disabled={statut === 'envoi' || horsZone}
            className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center whitespace-nowrap rounded-plaque bg-laiton-franc px-6 font-semibold text-fonte-abysse transition-colors hover:bg-laiton-clair disabled:opacity-70"
            data-cta={ecran1 ? 'devis-hero-carte' : 'devis-envoi'}
          >
            {statut === 'envoi' ? 'Envoi en cours…' : 'Demander mon rappel gratuit'}
          </button>
          <p className="mt-2.5 text-center text-[13px] text-calcaire-brume lg:text-left">
            ou appelez le{' '}
            <a href={`tel:${siteConfig.phone}`} data-cta="phone" className="chiffre whitespace-nowrap font-semibold text-calcaire-neige underline underline-offset-2 hover:text-laiton-clair">
              {siteConfig.phoneDisplay}
            </a>
          </p>
          <p className="mt-1.5 text-[12px] text-calcaire-ombre">
            Uniquement pour vous rappeler.{' '}
            <a href="/politique-confidentialite" className="underline underline-offset-2 hover:text-calcaire-brume">
              Confidentialité
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default LeadForm
