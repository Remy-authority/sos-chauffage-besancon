# CLAUDE.md — SOS Chauffage Besançon

> Fichier de règles du projet. Toute session (CEO, Builder, SEO) le lit AVANT de toucher au repo.
> Les règles ici priment sur tout comportement par défaut.

---

## 1. CONTEXTE DU PROJET

- **Modèle économique : rank & rent.** On construit un site local, on le classe en SEO
  (référencement naturel + citations par les IA), on capte des demandes de clients, puis on
  **loue** le site à un artisan de la zone. On ne vend pas de prestation nous-mêmes.
- **Ce site : dépannage chauffage et chaudière à Besançon (25), site n°6 du portefeuille.**
  Domaine `sos-chauffage-besancon.fr` **ACHETÉ le 28/07/2026** (OVH, commande 22189052).
  Dupliqué le 28/07/2026 depuis le socle technique de `sos-debouchage-metz.fr` (site n°3).
  ⏰ IMPÉRATIF CALENDAIRE : mise en ligne AVANT FIN SEPTEMBRE 2026 pour être mûr au pic de la
  saison de chauffe (octobre-novembre), climat froid de Franche-Comté.
- **Benchmark validé (28/07/2026, `RENT & RANK/docs/BENCHMARK-VAGUE-3.md`)** : page 1
  Google = annuaires + plateformes nationales (Depanneo, Savelys/ENGIE, Axenergie). Le seul
  vrai artisan local, Ets Paillard (depuis 1923, RGE), a un site daté au SEO minimal. Verdict
  boulevard. Volume estimé 400-550 recherches/mois, CPC 8-12 €. Forte saisonnalité hivernale :
  l'ASSUMER et la documenter (contenu entretien/été pour lisser).

---

## 2. STANDARD DE DESIGN — CE SITE INAUGURE LE TEMPLATE T3 (NON NÉGOCIABLE)

- **Contexte (audit portefeuille 27/07/2026)** : le portefeuille n'a que 2 systèmes de design.
  T1 = Angers + Annecy. T2 « PROTEC-DARD » = Metz + Dijon + Reims (déjà 3 sites, cluster PLEIN).
  Règle portefeuille : aucun cluster de template ne dépasse 2-3 sites.
  → **Besançon crée le template T3.** Le socle TECHNIQUE hérité de Metz (Next.js, config,
  LeadForm, API contact, lib) est conservé, mais l'IDENTITÉ VISUELLE ET STRUCTURELLE doit
  être NOUVELLE.
- **Référence de QUALITÉ (pas de structure)** : l'ADN PROTEC-DARD, code source local
  `/Users/zaouiremy/Desktop/Claude code/Template siteweb/Prospects/Deratisation/PROTEC-DARD/`
  (lecture seule) : niveau d'exigence typo, motion design, rythme. S'en inspirer pour la
  QUALITÉ, PAS pour reproduire la même structure de page que Metz/Dijon/Reims.
- **Exigences T3 précises pour le Builder :**
  - ORDRE ET NATURE DES SECTIONS de la home inédits (pas le squelette
    Hero→TrustBar→About→Services→Process de T2 ; inventer des sections propres au chauffage,
    ex. diagnostic par symptôme, urgence vs entretien, marques de chaudières couvertes).
  - `tailwind.config.ts` RESTRUCTURÉ : noms d'échelles et de tokens différents de T2
    (anti-fingerprint : les 3 sites T2 partagent un config identique, un crawler peut les
    relier ; T3 doit casser cette signature, structure ET valeurs).
  - Typographie : PAS le duo Inter + Fraunces de T2 (choisir un pairing distinct, même
    exigence de qualité).
  - Palette PROPRE au métier chauffage à Besançon, différente des 5 existantes :
    Angers (bleu eau/orange), Annecy (navy/ambre), Metz (pétrole/crème/brique),
    Dijon (prune/cuivre/framboise), Reims (brun fumé/craie/bleu de flamme/braise).
  - Composant + animation SIGNATURE propres au site (niveau Dijon minimum).
- Exigences : **direction artistique forte, rendu premium, ancrage local.**
- **Interdits absolus** : design générique/template reconnaissable ; pages 100 % texte ;
  sections plates copiées-collées ; tout rendu ressemblant à un des 5 sites existants.
- **Pas de vide/trou asymétrique.**
- **Images UNIQUES par page locale (règle permanente, décision Rémy 27/07/2026)** : chaque
  page de commune a SA propre image de tête (`public/zones/<slug>.jpg`), décor réellement
  différencié. Interdiction des pools d'images partagées. Contrôle visuel CEO comparatif.
- **Typographie — INTERDIT : le tiret cadratin « — ».** Virgule ou point à la place.

---

## 3. DOCTRINE SEO

- **Pas de fiche Google Business, pas d'avis clients.** Tout repose sur le **SEO organique**
  et le **GEO** (être cité par les IA : ChatGPT, Perplexity, AI Overviews).
- **Structure du site :** 1 accueil, 1 page par service, 1 page par commune voisine,
  1 blog conseils, mentions légales conformes (droit français).
- **FAQ sur chaque page.**
- **Interdits absolus** : bourrage de mots-clés, chiffres inventés non validés par Rémy,
  fausses certifications (NE PAS prétendre RGE), phrases creuses.
- Contenu vrai, précis, local. Donnée non confirmée → on ne l'affiche pas.
- ⚠️ Contenu hérité de Metz (débouchage) ENCORE PRÉSENT dans `content/` et `config/` :
  TOUT réécrire (services chauffage, communes du Grand Besançon, config) avant tout déploiement
  public. Le site ne doit JAMAIS être servi avec le contenu Metz.

---

## 4. INFRA OBLIGATOIRE AVANT MISE EN LIGNE (leçon des sites 1-4)

Suivre `RENT & RANK/docs/INFRA-NOUVEAU-SITE.md` :
1. **Numéro 09 Twilio dédié** avec renvoi d'appel configuré (VoiceUrl VÉRIFIÉ après achat).
2. **Resend actif** sur le projet Vercel (`RESEND_API_KEY` + `RESEND_FROM`) + redéploiement
   + LEAD DE TEST reçu dans la boîte de Rémy. Sans ça, les leads formulaire sont PERDUS.
3. Redirection email `contact@sos-chauffage-besancon.fr` → remy@remyzaoui.com (DNS OVH).
4. Numéro + statut reportés dans `cockpit/data/sites.json` (via le CEO-portefeuille).

---

## 5. RÈGLE DE MÉMOIRE & DÉPLOIEMENT

- **À chaque session : lire `docs/ETAT.md` en arrivant, le mettre à jour avant de finir.**
- **Rien ne se déploie (merge sur `main` / mise en prod) sans validation explicite de Rémy.**
- Valeurs non confirmées marquées `DEMO`.
- `robots` en noindex tant que Rémy n'a pas validé la mise en ligne.

---

## 6. FONCTIONNEMENT DES RÔLES

- **CEO (coordinateur)** : **NE CODE JAMAIS le site (code produit = Builder, TOUJOURS).**
  Pilote, audite, coordonne, prépare des messages prêts à coller entre balises
  `=== MESSAGE POUR [AGENT] ===`. Langage simple, zéro jargon.
- **ZÉRO fainéantise du CEO.** Le CEO utilise ses propres accès (git, gh, build, APIs) et ne
  demande à Rémy QUE ce que lui seul peut faire (validations, paiements).
- **Ce que le CEO PEUT faire** : git (branches, push de preview), builds de vérification,
  infos via gh/API. Interdiction absolue : écrire/modifier `app/`, `components/`, `lib/`,
  `content/`, `config/` → Builder.
- **Builder** : tout le code (design T3 + intégration + contenu structuré), sur Opus.
- **SEO** : carte mots-clés, plan services/communes, calendrier éditorial, doctrine §3.
