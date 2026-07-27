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
- [ ] Build T3 (Builder sur Opus, branche design/t3) : EN ATTENTE lancement par Rémy.
- [ ] Redirection email contact@ (DNS OVH) : CEO-portefeuille, vérifier avant mise en ligne.
- [ ] Numéro 09 Twilio : en file d'attente (portefeuille). config/site.config.ts garde le
      numéro DEMO tant que non fourni.
- [ ] Infra leads avant mise en ligne (Resend + RESEND_FROM + lead de test, cf. CLAUDE.md §4).
- [ ] package.json porte encore le nom « sos-fuite-angers » : au Builder de le renommer.

## Historique
- 28/07/2026 : création du dossier, achat domaine, CLAUDE.md T3, journal initialisé
  (session CEO-portefeuille).
- 28/07/2026 (session 1 CEO site) : infra complète (repo GitHub + Vercel + noindex +
  protection), plan SEO-GEO livré et contrôlé, brief Builder T3 prêt. Le plan SEO V1 de
  l'agent a été refusé (meta « Metz », mention RGE, géographie fausse sur 7 communes,
  chiffres inventés) puis corrigé en V2 + relecture CEO. Prochaine étape : Rémy lance le
  Builder avec le message fourni.
