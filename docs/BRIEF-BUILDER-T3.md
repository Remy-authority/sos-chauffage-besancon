# BRIEF BUILDER — SOS Chauffage Besançon (template T3)

> Brief préparé par le CEO (session 1, 28/07/2026). Le Builder travaille sur Opus.
> À lire AVANT : `CLAUDE.md` du repo (règles), `docs/SEO-GEO-PLAN.md` (structure et contenus).
> Statut : [EN ATTENTE DU PLAN SEO, section 7 à compléter]

## 1. Mission

Tu es le Builder du site n°6 du portefeuille : sos-chauffage-besancon.fr, dépannage
chauffage et chaudière à Besançon (25). Le dossier contient le socle TECHNIQUE de
sos-debouchage-metz.fr (Next.js 14, config, LeadForm, API contact, lib SEO). Ta mission :

1. Créer le TEMPLATE T3 : identité visuelle et structurelle entièrement NOUVELLE.
2. Réécrire 100 % du contenu Metz (débouchage) en contenu chauffage Besançon,
   en suivant `docs/SEO-GEO-PLAN.md`.
3. Le site ne doit JAMAIS être servi avec du contenu Metz, même en preview.

## 2. Pourquoi T3 (contexte obligatoire)

Le portefeuille n'a que 2 systèmes de design. T1 = Angers + Annecy. T2 « PROTEC-DARD » =
Metz + Dijon + Reims (cluster PLEIN, 3 sites). Règle : aucun cluster ne dépasse 2-3 sites.
Besançon INAUGURE T3. Tu conserves le socle technique, tu remplaces l'identité.

## 3. Exigences T3 (non négociables, CLAUDE.md §2)

- **Home inédite** : ordre ET nature des sections différents du squelette T2
  (Hero→TrustBar→About→Services→Process interdit). Inventer des sections propres au
  chauffage, par exemple : diagnostic par symptôme (« ma chaudière fait du bruit »,
  « plus d'eau chaude », « radiateurs froids »), parcours urgence vs entretien,
  marques de chaudières couvertes, préparation hiver Franche-Comté.
- **`tailwind.config.ts` RESTRUCTURÉ** : noms d'échelles et de tokens DIFFÉRENTS de T2
  (anti-fingerprint : les 3 sites T2 partagent un config identique ; T3 casse cette
  signature, structure ET valeurs).
- **Typographie** : PAS le duo Inter + Fraunces de T2. Choisir un pairing distinct,
  même exigence de qualité (display avec du caractère + texte très lisible).
- **Palette propre au chauffage à Besançon**, différente des 5 existantes :
  Angers (bleu eau/orange), Annecy (navy/ambre), Metz (pétrole/crème/brique),
  Dijon (prune/cuivre/framboise), Reims (brun fumé/craie/bleu de flamme/braise).
  Piste (libre) : univers chaleur/froid hivernal comtois, mais éviter tout ce qui
  rappelle Reims (flamme/braise déjà pris).
- **Composant + animation SIGNATURE** propres au site, niveau Dijon minimum.
- **Référence de QUALITÉ (pas de structure)** : PROTEC-DARD, code source en lecture seule
  `/Users/zaouiremy/Desktop/Claude code/Template siteweb/Prospects/Deratisation/PROTEC-DARD/`.
  S'en inspirer pour l'exigence typo, le motion design, le rythme. NE PAS copier sa structure.

## 4. Interdits absolus

- Design générique ou template reconnaissable ; toute ressemblance avec un des 5 sites.
- Pages 100 % texte, sections plates copiées-collées, vide/trou asymétrique.
- Le tiret cadratin « — » dans les textes (virgule ou point à la place).
- Chiffres inventés, fausses certifications (PAS de mention RGE), faux avis,
  bourrage de mots-clés. Valeur non confirmée = marquée `DEMO`.
- Fiche Google Business / avis : ne jamais en parler.

## 5. Contenu et SEO (source : docs/SEO-GEO-PLAN.md)

- 1 home, 8 pages services, 12 pages communes, blog conseils, pages légales conformes.
- FAQ sur CHAQUE page (données structurées FAQPage).
- Schema JSON-LD : adapter le type hérité (Plumber) au métier chauffagiste
  (voir la doctrine GEO du plan SEO), llms.txt réécrit chauffage Besançon.
- **Images uniques par page commune** : chaque commune a SA propre image de tête
  (`public/zones/<slug>.jpg`), décor réellement différencié. Pools partagés interdits.
- Saisonnalité hivernale assumée : le site doit respirer l'urgence hiver (pannes,
  dépannage) tout en portant l'offre entretien annuel pour l'été.
- Config : `config/site.config.ts` entièrement réécrit (businessName, phone en attente
  du 09 Twilio : laisser la valeur `DEMO` actuelle tant que le portefeuille n'a pas
  fourni le numéro, email contact@sos-chauffage-besancon.fr, canonicalBase = URL Vercel
  d'abord).
- `package.json` : renommer le projet (`sos-chauffage-besancon`).

## 6. Garde-fous techniques

- `SEO_NOINDEX=1` est posé sur TOUS les environnements Vercel : ne pas y toucher.
  Le noindex ne sera levé que par Rémy à la mise en ligne.
- Travailler sur une branche (`design/t3`), jamais de merge sur `main` sans validation
  explicite de Rémy après contrôle visuel CEO.
- `npm run build` doit passer avant toute demande de review.
- Ne pas toucher à `.github/workflows/publish-article.yml` (autoblog, fonctionne tel quel).

## 7. Structure détaillée des pages

[À COMPLÉTER : injecter ici le résumé du plan SEO une fois docs/SEO-GEO-PLAN.md livré,
avec les slugs exacts des 8 services et des 12 communes.]
