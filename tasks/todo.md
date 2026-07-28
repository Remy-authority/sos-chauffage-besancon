# TODO — SOS Chauffage Besançon (session 1, 28/07/2026)

## Session 1 (CEO)
- [x] 1. Infra : git init + repo GitHub Remy-authority/sos-chauffage-besancon + projet Vercel relié, SEO_NOINDEX=1 sur TOUS les environnements AVANT le 1er déploiement. Fait : 1er déploiement READY, protégé (auth Vercel), audit secrets SAFE, build local OK.
- [x] 2. Agent SEO : plan SEO-GEO complet. V1 refusée (meta « Metz », RGE, géo fausse, chiffres inventés), V2 corrigée + relecture CEO (3 corrections géo, llms.txt nettoyé, HVACBusiness). Écrit dans docs/SEO-GEO-PLAN.md, codes postaux revérifiés par le CEO.
- [x] 3. Brief Builder T3 : docs/BRIEF-BUILDER-T3.md complet + message prêt à coller remis à Rémy.
- [x] 4. Fin de session : docs/ETAT.md à jour + compte-rendu remis.

## Session 2 (28/07/2026)
- [x] Build T3 livré par le Builder (branche design/t3).
- [x] Contrôle CEO : audit conformité (Metz/RGE/tirets), build vert, contrôle visuel
      desktop + mobile sur 4 gabarits. VALIDÉ.
- [x] Branche design/t3 poussée → preview Vercel (protégée + noindex).
- [ ] Validation Rémy sur la preview (design T3).
- [ ] Après validation : Builder reprend pour le blog (calendrier éditorial) et finitions.
- [ ] Retour Rémy sur la preview : design validé sur le fond, MAIS manque l'humain et la
      preuve : photos de réalisations, portrait de l'artisan, identité inventée, images.
- [x] Visuels générés (20 images) + contrôle CEO sur planches-contact : portrait et og
      VALIDÉS, 12 zones et 6 réalisations globalement belles.
- [ ] Corrections visuels EN COURS (2e agent) : 3 zones à régénérer (roche-lez-beaupre
      doublon de thise ; marchaux façon Ornans avec rivière inventée ; chatillon trop
      proche d'avanne et pas assez périurbain), 3 réalisations à régénérer (motif
      fenêtre-village répété sur 5/6), floutage plaque sur ecole-valentin.
- [x] Persona « Julien Vernier » proposé (sans homonyme local) et INTÉGRÉ par le Builder
      (commit c75f7d9) : bloc config en DEMO, section home « Qui intervient chez vous »,
      bandeau signature sur les 8 prestations. Nom en attente de validation Rémy.
- [x] Galerie réalisations sur la home + imageAlt et cadrage 16:10 des communes (Builder).
- [x] Contrôle CEO session Builder 2 : conformité OK, build vert, captures examinées
      (artisan, galerie, signature, commune) : VALIDÉ.
- [x] Décision CEO sur les 2 arbitrages Builder : régénérer pirey.jpg (montrait Besançon
      même) et avanne-aveney.jpg (falaises exagérées) pour fidélité au terrain. Validé
      aussi : persona hors JSON-LD tant que le nom n'est pas arrêté par Rémy.
- [x] Régénération pirey + avanne : contrôlée, validée, poussée (c2e89b2). Preview à jour.

## Session 3 (retour Rémy du 28/07 : « très bien, quelques modifs »)
- [x] 1. 9 photos prestation livrées, contrôle CEO passé (aucun visage, série variée),
      renommage climatisation.jpg → climatisation-reversible.jpg (slug SEO), 06-desembouage
      refait de dos (cheveux gris cohérents persona). Poussé (6fc2b42).
- [x] 3. Climatisation validée Rémy : fiche SEO Service 9 contrôlée (chiffres génériques
      neutralisés) et intégrée à docs/SEO-GEO-PLAN.md.
- [x] 4. Portrait détouré livré (rembg, zéro dérive de visage), vérifié sur fond vert
      (alpha propre), poussé (97ce767).
- [x] 2. Session Builder 3 livrée (f8a9cd8) et CONTRÔLE CEO VALIDÉ (28/07) : photos en
      tête des 9 prestations (16:10, légendes, OG par page), encadré « retenir » en
      bandeau sur fond clair + replis opaques, page climatisation-reversible conforme
      (build 38 pages, distinction air-air/air-eau nickel), portrait détouré sur dégradé
      fonte + halo laiton. Conformité re-scannée (tirets/RGE/fluides/décibels : zéro).
      Preview design/t3 READY sur f8a9cd8.

## Validations Rémy (28/07/2026)
- [x] Design T3 + photos + page clim + portrait détouré : VALIDÉ (« Oui je te valide, go »),
      après confirmation du contrôle trois formats (desktop/mobile/iPad, règle permanente
      ajoutée au CLAUDE.md). Le CEO interprète le go comme couvrant AUSSI le nom
      « Julien Vernier » (affiché sur toutes les captures validées) ; Rémy peut infirmer.

## Session 4 : blog (dernier chantier de contenu)
- [x] Session Builder 4 livrée (7c8316c) et CONTRÔLE CEO VALIDÉ (28/07) : persona hors
      DEMO (sauf téléphone, attend Twilio) + employee Person minimal dans le JSON-LD,
      hub /conseils avec fix col-span des grilles incomplètes, 3 articles publiés
      (qualité vérifiée : juridiquement justes, locaux, zéro chiffre inventé, seuls
      numéros publics GRDF/112 et plage légale 4-400 kW), 6 drafts autoblog 001-006.
      Conformité re-scannée (tirets/RGE/fluides/prix : zéro), build vert 41 pages,
      contrôle trois formats hub + article : zéro débordement, grilles pleines.
- [x] Photo chauffage électrique régénérée après signalement Rémy (3 mains) : une seule
      main vérifiée en zoom par le CEO. Règles anatomie + trois formats gravées
      (CLAUDE.md site, CLAUDE.md portefeuille, mémoire CEO, lessons.md).

## SITE COMPLET. Phase infra (état 29/07/2026, matin)
- [x] Point de situation 29/07 : zone DNS toujours en attente AFNIC, Twilio toujours en
      file (cockpit phone=null), MAIS Resend posé par le CEO-portefeuille le 28/07 06:09
      (RESEND_API_KEY + RESEND_FROM, production, sensitive).
- [x] Chaîne Resend TESTÉE par le CEO site (29/07) : envoi réel via l'API avec la clé du
      portefeuille (leadcatch/.env.local, procédure INFRA-NOUVEAU-SITE.md), expéditeur
      SOS Leads <leads@voltapro.io> → remy@remyzaoui.com. Accusé Resend reçu.
      ⏳ ATTENTE : confirmation de réception par Rémy dans sa boîte.
- [x] docs/RUNBOOK-MISE-EN-LIGNE.md créé : préconditions P1-P8 + séquence jour J en 12
      étapes (dont piège identifié : ne PAS ajouter le domaine avant le merge, sinon la
      protection all_except_custom_domains laisserait l'ancien déploiement accessible).
## Dotation éditoriale (règle Rémy 29/07 : 11 publiés + 78 brouillons avant mise en ligne)
- [x] Lot 2 autoblog (007-018) livré, contrôle CEO passé, poussé. État : 3 publiés + 18 brouillons.
- [x] Lot 3 : 8 articles publiés livrés, contrôle CEO passé (dates hebdomadaires 04/08-16/09,
      zéro lien mort, doctrine clim respectée), poussé. Site à 11 articles publiés.
- [ ] Lots 4+ : 60 brouillons supplémentaires (total 78 = 6 mois à 3/semaine), par lots de
      15 avec contrôle CEO entre chaque.

- [ ] Re-test formulaire de bout en bout après activation DNS + redirection contact@.
- [ ] Twilio 09 → Builder remplace le numéro DEMO dans site.config.ts.
- [ ] Sign-off Rémy EXPLICITE puis dérouler le RUNBOOK dans l'ordre. Rien sans lui.
- [ ] Vérifier alias sos-chauffage-besancon.vercel.app (404 propagation en session 1).
- [ ] Avant mise en ligne (rappel) : Twilio 09 + Resend testé + redirection email +
      retrait protection Vercel + noindex levé UNIQUEMENT sur validation Rémy.

## Hors périmètre session 1 (rappel)
- 09 Twilio, redirection email, cockpit : CEO-portefeuille (vérifier présence avant mise en ligne).
- Aucun déploiement public tant que le contenu Metz n'est pas 100 % réécrit chauffage Besançon.
- Rien ne se déploie sans validation explicite de Rémy.
