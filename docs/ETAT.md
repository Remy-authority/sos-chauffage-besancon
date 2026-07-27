# ETAT.md — SOS Chauffage Besançon (journal de bord)

> Journal unique du projet. Lu en début de session, mis à jour en fin de session.

## Identité
- Site n°6 du portefeuille rank & rent. Dépannage chauffage/chaudière, Besançon (25).
- Domaine : sos-chauffage-besancon.fr, ACHETÉ le 28/07/2026 (OVH CA, commande 22189052).
- Template : **T3 à créer** (socle technique Metz, identité visuelle et structure NOUVELLES,
  voir CLAUDE.md §2). Cluster T2 plein (Metz/Dijon/Reims), interdiction d'y ressembler.
- Échéance : EN LIGNE avant fin septembre 2026 (saison de chauffe).

## État courant (28/07/2026, fin de session 1 CEO site)
- [x] Opportunité validée par Rémy (BENCHMARK-VAGUE-3.md : verdict boulevard).
- [x] Dossier créé par duplication du socle Metz (sans .git). ⚠️ Contenu Metz encore présent.
- [x] Domaine acheté. Zone DNS OVH en cours de création (enregistrement AFNIC).
- [x] Repo GitHub : Remy-authority/sos-chauffage-besancon (public, audit secrets SAFE avant
      1er push, .gitignore renforcé). Vercel : projet sos-chauffage-besancon relié au repo
      (team remy-2817s-projects), déploiement auto sur main.
- [x] noindex : SEO_NOINDEX=1 posé sur les 3 environnements Vercel AVANT le 1er déploiement.
      1er déploiement production : READY. PROTECTION VERCEL ACTIVE (ssoProtection
      all_except_custom_domains) car contenu Metz encore servi : toute URL de déploiement
      exige une authentification Vercel. La lever seulement quand le contenu sera 100 %
      chauffage Besançon (et le noindex seulement sur validation Rémy).
      Note : l'alias sos-chauffage-besancon.vercel.app renvoyait encore 404 en fin de
      session (propagation), l'URL de déploiement directe répond bien (302 vers auth).
- [x] Build local vérifié (npm run build OK). Cache npm global corrompu (EACCES) :
      contourné avec --cache vers le scratchpad, à savoir pour les prochains builds.
- [x] Plan SEO/GEO : docs/SEO-GEO-PLAN.md (agent SEO V2 + corrections CEO : géographie,
      RGE, chiffres DEMO ; 12 codes postaux revérifiés par le CEO via geo.api.gouv.fr).
- [x] Brief Builder T3 : docs/BRIEF-BUILDER-T3.md. Message prêt à coller transmis à Rémy.
- [x] **Build T3 livré (Builder, branche `design/t3`)**, en attente du contrôle visuel CEO.
- [x] package.json renommé « sos-chauffage-besancon ».
- [ ] Redirection email contact@ (DNS OVH) : CEO-portefeuille, vérifier avant mise en ligne.
- [ ] Numéro 09 Twilio : en file d'attente (portefeuille). config/site.config.ts garde le
      numéro DEMO tant que non fourni (`phoneIsDemo: true`).
- [ ] Infra leads avant mise en ligne (Resend + RESEND_FROM + lead de test, cf. CLAUDE.md §4).
- [ ] **Visuels à produire** (seul manque du build T3, voir ci-dessous).

## Build T3, état livré par le Builder (28/07/2026, branche `design/t3`)

**Identité (template T3, inaugurée par ce site)**
- Palette « fonte et laiton », 4 familles nommées par matière avec des échelles en MOTS :
  `fonte` (anthracite chaud), `calcaire` (neutres pierre de Besançon), `jura` (vert forestier
  désaturé), `laiton` (or chaud, réservé à l'action). Aucun rouge d'urgence : l'or profond
  porte les CTA, ce qui distingue T3 des 5 sites existants.
- `tailwind.config.ts` restructuré : classes du type `bg-fonte-nuit`, `text-calcaire-neige`,
  rayons courts (`plaque`, `module`, `bloc`, `socle`), échelle typo nommée (`titre-xl`,
  `chapo`, `lecture`, `surtitre`), courbe `ease-thermique`. Signature de tokens sans aucun
  recoupement avec le config partagé du cluster T2.
- Typographie : **Bricolage Grotesque** (titres, axe optique poussé à 48) + **IBM Plex Sans**
  (corps). Ni Inter ni Fraunces.
- Composant signature : `JaugeThermique`, colonne graduée qui se remplit du vert Jura au
  laiton, présente dans le hero.
- Section signature : `DiagnosticThermique`, diagnostic par symptôme (6 plaintes réelles →
  cause probable + geste avant appel + prestation liée).
- Ordre de home inédit : Hero-triage → Diagnostic → Deux saisons → Prestations en relevé →
  Parc d'appareils → Hiver comtois → Carte des communes → Formulaire → FAQ → Appel.

**Contenu**
- 100 % du contenu Metz supprimé (services, communes, conseils, images, config, llms.txt).
- 8 prestations et 12 communes rédigées, FAQ sur chaque page, orientations géographiques
  conformes au plan SEO. Aucun chiffre non validé, aucune certification, aucun tarif inventé.
- Schema `HVACBusiness` (13 villes en `areaServed`, `openingHoursSpecification`, sans
  `address` ni avis), `Service` avec `availableChannel`, `FAQPage` partout, llms.txt réécrit.

**Vérifications faites** : `npm run build` OK (37 pages), robots en noindex confirmé,
contrôle visuel Playwright desktop et mobile sur home, prestation, commune et hub
(aucune erreur JS, aucun débordement horizontal, aucun bloc bloqué invisible).

**Reste à produire (bloquant pour la mise en ligne, pas pour la validation du design)** :
les visuels. `public/` a été vidé des images Metz. Sont attendus : `og.jpg`, les 12 images
de tête de commune `public/zones/<slug>.jpg` (règle : une image UNIQUE par commune, pools
partagés interdits) et, optionnellement, les visuels de prestation. En leur absence, les
pages n'affichent aucune image cassée : les gabarits basculent sur une plaque graphique
construite sur les données réelles de la page.

## Historique
- 28/07/2026 : création du dossier, achat domaine, CLAUDE.md T3, journal initialisé
  (session CEO-portefeuille).
- 28/07/2026 (session 1 CEO site) : infra complète (repo GitHub + Vercel + noindex +
  protection), plan SEO-GEO livré et contrôlé, brief Builder T3 prêt. Le plan SEO V1 de
  l'agent a été refusé (meta « Metz », mention RGE, géographie fausse sur 7 communes,
  chiffres inventés) puis corrigé en V2 + relecture CEO. Prochaine étape : Rémy lance le
  Builder avec le message fourni.
- 28/07/2026 (session Builder) : template T3 créé et contenu chauffage Besançon intégralement
  rédigé, sur la branche `design/t3`. Build vert, contrôle visuel Playwright passé. Deux
  défauts trouvés et corrigés en cours de route : opacités Tailwind hors échelle qui rendaient
  le fond de l'en-tête invisible au scroll, et vide asymétrique à droite de l'en-tête des
  pages prestation en l'absence de photo. En attente du contrôle visuel CEO avant de traiter
  le blog et les visuels.
