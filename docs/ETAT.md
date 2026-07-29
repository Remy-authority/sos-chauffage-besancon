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
- [x] **Build T3 livré (Builder, branche `design/t3`)**.
- [x] **Contrôle visuel CEO : VALIDÉ (28/07/2026)**. Audit de conformité passé (zéro reste
      Metz, zéro RGE hors commentaire de règle, zéro tiret cadratin), build vert re-vérifié
      par le CEO, captures Playwright desktop + mobile examinées (home, prestation gaz,
      zone saint-vit, hub zones) : aucune erreur JS, aucun débordement, en-tête sticky OK
      au scroll (le chevauchement vu sur les captures fullPage est un artefact Playwright,
      vérifié par captures viewport). Branche `design/t3` poussée pour preview Vercel
      (protégée + noindex). EN ATTENTE : validation Rémy sur la preview.
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

**Visuels : PRODUITS et contrôlés (28/07/2026, commit c317a89 sur design/t3)**.
Retour Rémy sur la preview : design validé sur le fond mais manque d'humain et de preuve
(photos, artisan, identité). Réponse : 20 images générées (agent visual-asset-generator,
Nano Banana 2 via API Gemini), contrôle CEO comparatif sur planches-contact, 6 images
refusées et régénérées (3 zones en doublon d'archétype ou infidèles au terrain, 3
réalisations qui répétaient le même motif fenêtre-village), 1 plaque d'immatriculation
floutée. Livré : `public/og.jpg` (câblé d'office via defaultOgImage), `public/artisan.jpg`
(portrait persona), `public/realisations/01-06.jpg`, `public/zones/<slug>.jpg` x12
(détectées automatiquement par les pages zones).
**Persona proposé par le CEO : « Julien Vernier », chauffagiste, ~45 ans** (vérifié sans
homonyme chauffagiste local ; « Maillard » écarté, trop proche du concurrent réel Ets
Paillard). En attente : validation Rémy du nom.

**Contrôle CEO session Builder 2 : VALIDÉ (28/07/2026, poussé en c2e89b2)**. Conformité
(tirets/RGE/chiffres) OK, build vert, captures examinées : section « Qui intervient chez
vous », galerie « À quoi ressemble le travail », bandeau signature prestation, commune en
16:10 avec légende. Les 2 arbitrages du Builder tranchés par le CEO : pirey.jpg et
avanne-aveney.jpg régénérées pour fidélité au terrain (Pirey montrait Besançon même ;
Avanne avait des falaises de reculée exagérées), contrôlées et validées. Persona maintenu
HORS JSON-LD tant que le nom n'est pas validé par Rémy (à ajouter ensuite).
Branche design/t3 complète poussée, preview à jour. RESTE : validation Rémy du nom du
persona et de l'ensemble, puis blog (calendrier éditorial) côté Builder.

## Intégration persona, galerie et finitions visuelles (session Builder 2, `design/t3`)

- **Persona intégré** dans `config/site.config.ts` (bloc `persona`, 7 marqueurs DEMO) :
  nom, rôle, portrait, accroche, citation, parcours en 3 étapes et 3 engagements.
  Parcours raconté en ÉTAPES et jamais en années, aucune certification, aucun chiffre.
- **Section `QuiIntervient`** sur la home (fond calcaire, entre l'hiver comtois et la carte
  des communes) : portrait en plaque 4:5 avec cartouche d'identité en débord, citation,
  parcours numéroté, téléphone et engagements.
- **Section `Realisations`** sur la home (fond fonte, juste après les prestations) :
  les 6 photos en grille 4:3, `loading="lazy"`, alt descriptifs, légendes par TYPE
  d'intervention. Aucun client, aucune commune, aucune date sous une photo.
- **`SignatureArtisan`** sur les 8 pages prestation : bandeau compact en fin de corps
  éditorial (vignette, une phrase, lien vers la section d'accueil, bouton d'appel).
  Volontairement sans récit ni citation, pour que le persona ne prenne pas le pas sur
  le contenu utile.
- **Communes** : champ `imageAlt` ajouté aux 12 fiches, chaque alt décrivant le décor
  réellement photographié. Cadrage passé de 4:3 à **16:10**, le format natif des visuels
  livrés (le 4:3 rognait environ 17 % de la largeur), et légende d'orientation sous
  l'image. La plaque de repli suit le même format.

**Vérifications** : `npm run build` vert (37 pages). Contrôle Playwright sur 14 pages
(home, prestation, les 12 communes) en desktop ET mobile : aucune erreur JS, aucun
débordement horizontal, **toutes les images chargées et toutes pourvues d'un alt**, aucun
bloc bloqué invisible. Aucun texte n'est posé sur une image, la question du contraste
sur photo ne se pose donc nulle part.

**⚠️ Deux visuels de commune à revoir (décision CEO)** :
- `public/zones/pirey.jpg` montre le centre de Besançon dominé par la citadelle, ce n'est
  pas Pirey. Un habitant du secteur le verra immédiatement.
- `public/zones/avanne-aveney.jpg` montre un village encaissé sous de hautes falaises
  calcaires, plus proche d'une reculée jurassienne que de la vallée du Doubs à Avanne.
Les alt écrits décrivent honnêtement ce qui est visible, sans affirmer la localisation.
Le Builder n'a pas remplacé ces images de sa propre initiative.

**Non fait volontairement** : le persona n'est PAS injecté dans le JSON-LD (pas de
`employee` ni de `founder` sur `HVACBusiness`). Tant que le nom n'est pas validé par Rémy,
il n'a rien à faire dans des données structurées lues par les moteurs.

## Session Builder 3 (28/07/2026, branche `design/t3`) : photos prestation, encadré, clim, portrait

**Livré, EN ATTENTE du contrôle visuel CEO :**

1. **Photos sur les 9 pages prestation.** Détection au build sur le modèle des communes
   (`existsSync` sur `public/services/<slug>.jpg`), photo en tête de page dans la colonne
   droite du hero, cadrée en **16:10 natif** (leçon des communes), avec légende filet
   laiton. `imageAlt` ajouté aux 9 fiches JSON : chaque alt décrit le GESTE réellement
   photographié (vérifié image par image par le Builder). L'OG image de chaque prestation
   reprend sa photo. La plaque de repères reste le repli si un fichier disparaît.
2. **Encadré « Ce qu'il faut retenir » assaini** (retour Rémy) : les repères vivent
   désormais en bandeau titré dans le corps clair (`ServiceQuickFacts`, plus rien ne les
   concurrence), et les plaques de repli (prestations ET communes) sont passées en fond
   **opaque** sans trame interne : les filets horizontaux ne se mélangent plus aux
   graduations verticales du hero. Vérifié par captures en masquant temporairement deux
   visuels (désembouage, Pirey) pour forcer les replis.
3. **Page climatisation réversible** (`/services/climatisation-reversible`, Service 9 du
   plan SEO) : title/meta/H1/FAQ conformes à la spec, AUCUNE mention RGE ni attestation
   fluides, aucun rendement chiffré ni décibel (qualitatif). Bloc de distinction et liens
   croisés avec la page dépannage PAC (relatedServices dans les deux sens + phrase de
   renvoi dans l'intro PAC). Icône `clim` (AirVent). Menu, schema (`serviceType` via
   `serviceJsonLd`, OfferCatalog, `knowsAbout` : « Climatisation réversible air-air »),
   sitemap et **llms.txt vérifiés** (la page y figure ; paragraphe Activité et
   saisonnalité mis à jour). `PrestationsReleve` passe à « Neuf interventions » et ne
   dit plus « ni climatisation seule ». Section « Deux saisons » : le bloc été mentionne
   la clim posée au printemps + lien secondaire vers la page.
4. **Portrait détouré** dans « Qui intervient chez vous » : `artisan-detoure.png`
   (alpha réel vérifié : 72 % transparent) posé sur un dégradé de fonte + trame graduée +
   halo laiton, cartouche d'identité conservé, alt propre au sujet détouré. AUCUN badge,
   aucun chiffre. `artisan.jpg` reste sur la vignette du bandeau signature.

**Vérifications** : zéro tiret cadratin, zéro RGE/fluides/décibels sur la nouvelle page,
JSON valides, `npm run build` vert (38 pages dont la nouvelle), contrôle Playwright
desktop + mobile sur home, clim, gaz, désembouage (repli), Pirey (repli), Saint-Vit :
aucune erreur JS, aucun débordement, aucune image cassée, tous les alt présents.
Persona toujours DEMO et HORS JSON-LD. Variables Vercel et autoblog non touchés.

## Session Builder 4 (28/07/2026, branche `design/t3`) : persona définitif + blog

**Livré, EN ATTENTE du contrôle CEO :**

1. **Persona définitif.** « Julien Vernier » validé par Rémy : marqueurs DEMO retirés du
   bloc persona de `config/site.config.ts` (le téléphone RESTE DEMO tant que le 09 Twilio
   n'est pas fourni). JSON-LD : propriété `employee` ajoutée au `HVACBusiness`
   (Person minimale : name + jobTitle, RIEN d'autre, vérifiée dans le DOM rendu).
2. **Hub /conseils contrôlé en DA T3** aux trois formats (1440 / iPad 820 / mobile 390),
   états vide ET rempli. Un défaut trouvé et corrigé : la grille à filets montrait une
   cellule vide grise quand le nombre de cartes ne remplissait pas la rangée (trou
   asymétrique interdit). Correction pérenne : la dernière carte s'étire (col-span calculé
   par breakpoint), robuste aux publications autoblog. Même correction sur la grille
   « À lire aussi » des articles. Leçon consignée dans tasks/lessons.md.
3. **3 premiers articles publiés** dans `content/conseils/` (dates échelonnées 15/22/28
   juillet 2026, signés Julien Vernier, FAQ + liens internes vers les prestations) :
   obligation-entretien-annuel-chaudiere, preparer-chauffage-hiver,
   desembouage-circuit-chauffage.
4. **6 drafts autoblog** dans `content/drafts/` (format exact de l'Action vérifié dans
   scripts/publish-next-draft.mjs : préfixe NNN- retiré, date réécrite au jour de
   publication) : 001 signes de panne, 002 monoxyde de carbone, 003 qui appeler,
   004 gaz/fioul/PAC froid comtois, 005 grand froid, 006 gestes de premier secours.
   L'Action publish-article n'a PAS été modifiée.

**Vérifications** : zéro tiret cadratin, zéro RGE/fluides/certification, aucun prix ni
pourcentage (seuls chiffres : 4-400 kW déjà validés, numéros publics GRDF 0 800 47 33 33
et 112, décennies), build vert (40 pages), Playwright 3 formats sur hub + article :
aucune erreur JS, aucun débordement. Le seul DEMO restant dans la config est le téléphone.

## Historique
- 28/07/2026 : création du dossier, achat domaine, CLAUDE.md T3, journal initialisé
  (session CEO-portefeuille).
- 28/07/2026 (session 1 CEO site) : infra complète (repo GitHub + Vercel + noindex +
  protection), plan SEO-GEO livré et contrôlé, brief Builder T3 prêt. Le plan SEO V1 de
  l'agent a été refusé (meta « Metz », mention RGE, géographie fausse sur 7 communes,
  chiffres inventés) puis corrigé en V2 + relecture CEO. Prochaine étape : Rémy lance le
  Builder avec le message fourni.
- 28/07/2026 (session Builder 3) : photos câblées sur les 9 pages prestation, encadré
  « Ce qu'il faut retenir » corrigé (retour Rémy), page climatisation réversible créée
  (menu, schema, llms.txt), portrait détouré intégré. Build vert, contrôle Playwright
  passé. En attente du contrôle visuel CEO.
- 28/07/2026 (session Builder) : template T3 créé et contenu chauffage Besançon intégralement
  rédigé, sur la branche `design/t3`. Build vert, contrôle visuel Playwright passé. Deux
  défauts trouvés et corrigés en cours de route : opacités Tailwind hors échelle qui rendaient
  le fond de l'en-tête invisible au scroll, et vide asymétrique à droite de l'en-tête des
  pages prestation en l'absence de photo. En attente du contrôle visuel CEO avant de traiter
  le blog et les visuels.
- 28/07/2026 (fin de journée, session CEO) : CONTRÔLE CEO DE LA SESSION BUILDER 4 VALIDÉ.
  Le site est COMPLET côté contenu : home T3, 9 prestations avec photos (dont climatisation
  réversible validée par Rémy), 12 communes avec images uniques, persona Julien Vernier
  définitif (validé Rémy, employee dans le JSON-LD, seul le téléphone reste DEMO), galerie
  réalisations, blog lancé (3 articles publiés + 6 drafts autoblog), 41 pages, build vert.
  Ensemble validé par Rémy sur preview aux trois formats. Journée marquée par deux règles
  permanentes issues de retours Rémy, gravées au CLAUDE.md du site, au CLAUDE.md du
  portefeuille et en mémoire CEO : contrôle visuel trois formats (desktop/mobile 390/iPad
  820) et contrôle anatomique en zoom des images générées (déclencheur : 3 mains sur la
  photo électrique, régénérée et re-contrôlée).
  PROCHAINE SESSION : infra de mise en ligne. Dépend du CEO-portefeuille : 09 Twilio
  (puis remplacement du numéro DEMO via Builder), Resend + lead de test, redirection
  email contact@. Puis sign-off Rémy explicite avant : merge main (déclenchera la 1re
  publication autoblog), domaine + DNS OVH, retrait protection Vercel, canonicalBase,
  levée du noindex EN DERNIER. Rien sans validation explicite de Rémy.
- 29/07/2026 (session CEO, phase infra) : point de situation. Zone DNS toujours en
  enregistrement AFNIC (NS muets), Twilio toujours en file d'attente (cockpit phone null).
  Resend posé par le CEO-portefeuille le 28/07 à 06:09 (production, sensitive) : chaîne
  d'envoi TESTÉE par le CEO site (envoi réel API Resend, expéditeur leads@voltapro.io,
  vers remy@remyzaoui.com, accusé reçu ; confirmation de réception Rémy en attente).
  docs/RUNBOOK-MISE-EN-LIGNE.md créé (préconditions + séquence jour J en 12 étapes,
  piège domaine/protection documenté). Bloquants restants hors périmètre site : zone DNS
  (→ redirection email + re-test formulaire) et numéro 09.
- 29/07/2026 (suite, dotation éditoriale) : règle permanente Rémy enregistrée (CLAUDE.md
  site §3, CLAUDE.md portefeuille, mémoire CEO) : 11 articles publiés au lancement + 78
  brouillons autoblog (6 mois à 3/semaine) constitués AVANT mise en ligne. Exécution par
  l'agent autoblog en conversation, par lots, contrôle CEO entre chaque : lot 2 (007-018,
  nov-jan) VALIDÉ ; lot 3 (8 articles publiés, site à 11) VALIDÉ ; lot 4 (019-033, cœur
  de l'hiver) VALIDÉ ; lot 5 (034-048, grand froid) VALIDÉ ; lot 6 (049-063, sortie
  d'hiver) VALIDÉ ; lot 7 (064-078, printemps) VALIDÉ (voir ci-dessous).
  Méthode de contrôle CEO éprouvée sur chaque lot : scans (tirets, RGE/fluides, prix/%),
  unicité des sujets, liens uniquement vers publiés ou préfixes inférieurs, lecture de
  fond des articles sensibles (sécurité gaz, dégel, technique), build vert, brouillons
  invisibles (11 pages articles rendues), push après validation.
- 29/07/2026 (suite) : **DOTATION ÉDITORIALE COMPLÈTE : 11 articles publiés + 78 brouillons
  autoblog (001-078)**, soit six mois à 3 articles/semaine. Lot 7 contrôlé par le CEO en
  lecture INTÉGRALE des 15 fichiers : article aides publiques (069) exemplaire (aucun
  montant, aucun dispositif nommé, aucune promesse d'éligibilité, renvoi exclusif aux
  organismes officiels), frontières nettes (072 filtres intérieurs vs 055 unité extérieure ;
  bucket remplacement 067-071 = après-décision, renvoie vers « réparer ou remplacer »
  publié sans le doublonner ; 066 maintient l'obligation légale malgré l'hiver sans
  incident), points techniques vérifiés (cuve fioul réglementée, desserte gaz, émetteurs
  PAC, condensats, eau stagnante au retour de vacances), 39 liens internes vérifiés un par
  un (publiés, préfixes strictement inférieurs, 6 slugs services existants), 4 questions
  FAQ partout, dates 14/05-16/06/2027 à 3/semaine, catégories dans la taxonomie existante,
  build vert avec les seuls 11 articles rendus. Un défaut trouvé : coquille « coupler »
  (078 l.35), corrigée par l'agent autoblog (45da719), re-contrôlée (diff limité à la
  ligne), poussée avec le lot (f336696 + 45da719 sur design/t3).
  RESTE AVANT MISE EN LIGNE : DNS OVH (NS toujours muets au 29/07) → redirection contact@
  + re-test formulaire ; numéro 09 Twilio (cockpit phone null) → message Builder pour
  remplacer le DEMO de site.config.ts ; puis sign-off Rémy EXPLICITE et déroulé strict du
  RUNBOOK-MISE-EN-LIGNE.md (noindex levé en DERNIER).
- 29/07/2026 (infra domaine, posée par le CEO-portefeuille, VÉRIFIÉE par le CEO site) :
  domaine LIVRÉ (KYC OVH validé), zone DNS ACTIVE (NS ns10/dns10.ovh.ca répondent,
  vérifié par dig), redirection email ACTIVE (MX mx1/mx2.forwardemail.net + TXT
  forward-email=contact:remy@remyzaoui.com + SPF forwardemail, vérifiés), Search Console
  et Bing vérifiés (TXT google-site-verification présent), Resend en place sur Vercel
  (noms RESEND_API_KEY + RESEND_FROM confirmés en production via vercel env ls ; valeurs
  ILLISIBLES car sensitive, elles ne seront réellement validées que par le lead de test
  du runbook), framework Vercel OK. L'apex pointe encore vers OVH (213.186.33.5) :
  le pointage vers Vercel se fera AU GO-LIVE par le CEO-portefeuille, sur validation Rémy.
  Le 09 Twilio reste en file (surveillance auto du stock, achat auto).
  TESTS CEO du 29/07 : formulaire de bout en bout re-testé en LOCAL (build design/t3,
  clé Resend du coffre leadcatch + expéditeur hello@voltapro.io) → réponse ok ; envoi
  direct API vers contact@ ACCEPTÉ par Resend (accusé id 23040263-bff1-4722-aa81-435451d8fd2b)
  → la chaîne Resend → contact@ → ForwardEmail est engagée. ⏳ ATTENTE : confirmation par
  Rémy de la réception des DEUX emails de test dans sa boîte (preuve finale de la
  redirection). Premier essai de test invalidé par le CEO lui-même : export cassé par
  xargs + nom de variable différent dans le coffre (RESEND_FROM_EMAIL vs RESEND_FROM),
  la route ayant alors envoyé via onboarding@resend.dev sans le signaler (leçon consignée).
  ⚠️ Fragilité relevée dans app/api/contact/route.ts : deliver() n'inspecte PAS la réponse
  Resend (un envoi refusé, ex. RESEND_FROM vide ou invalide en prod, serait avalé en
  silence avec un ok:true renvoyé au visiteur = lead perdu sans trace). Durcissement à
  proposer au Builder avant mise en ligne (vérifier response.ok + console.error du corps
  d'erreur pour les logs Vercel).
- 29/07/2026 (durcissement route contact) : livré par le Builder (ea2ed09, périmètre
  strict deliver() de app/api/contact/route.ts) et CONTRÔLE CEO VALIDÉ : diff relu
  (response.ok inspecté + try/catch réseau, réponse visiteur inchangée, fallback sans
  clé intact, zéro tiret cadratin), build vert (49 pages), et TEST RÉEL du chemin
  d'échec en local avec clé volontairement fausse : le visiteur reçoit ok, le log
  serveur trace [LEAD-FAIL] 401 avec le corps d'erreur Resend ET le lead complet
  (récupérable en cherchant LEAD-FAIL dans les logs Vercel). Chemin nominal validé le
  même jour par l'accusé Resend. La protection anti-leads-perdus est complète.
- 29/07/2026 (réception confirmée + point de vigilance Gmail) : Rémy ne voyait pas les
  emails de test → vérification directe dans Gmail par le CEO : les DEUX emails (lead
  formulaire « Nouveau lead, SOS Chauffage Besançon » et accusé direct) sont bien ARRIVÉS
  le 29/07 à 10:28 UTC. La redirection contact@ → remy@remyzaoui.com est VALIDÉE de bout
  en bout. Mais un filtre Gmail de Rémy classe les emails d'expéditeur voltapro.io hors
  boîte de réception (libellé « 🟠 VoltaPro/CRM & RDV »), d'où l'impression de non-réception.
  ⚠️ RISQUE PROD : si le RESEND_FROM de production est aussi un @voltapro.io, les vrais
  leads seront invisibles dans l'inbox. Au go-live : vérifier où atterrit le lead de test
  et adapter le filtre Gmail (ou l'expéditeur) AVANT de considérer la chaîne comme bonne.
  RAPPEL D'ÉTAT (question Rémy « le site est en ligne ? ») : NON. Site complet mais
  design/t3 non mergée, protection Vercel active, noindex posé, domaine pointé vers OVH.
  Manquent : 09 Twilio (file), sign-off Rémy, déroulé du runbook.
