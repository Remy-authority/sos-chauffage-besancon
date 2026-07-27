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
- [ ] Régénération pirey + avanne EN COURS (agent visuel), contrôle CEO puis push.
- [ ] Vérifier alias sos-chauffage-besancon.vercel.app (404 propagation en session 1).
- [ ] Avant mise en ligne (rappel) : Twilio 09 + Resend testé + redirection email +
      retrait protection Vercel + noindex levé UNIQUEMENT sur validation Rémy.

## Hors périmètre session 1 (rappel)
- 09 Twilio, redirection email, cockpit : CEO-portefeuille (vérifier présence avant mise en ligne).
- Aucun déploiement public tant que le contenu Metz n'est pas 100 % réécrit chauffage Besançon.
- Rien ne se déploie sans validation explicite de Rémy.
