# RUNBOOK MISE EN LIGNE, sos-chauffage-besancon.fr

> Préparé par le CEO le 29/07/2026. À dérouler DANS L'ORDRE, uniquement après le
> sign-off explicite de Rémy. Chaque étape est vérifiée avant de passer à la suivante.

## Préconditions (toutes obligatoires, état au 29/07/2026)

| # | Précondition | État | Responsable |
|---|--------------|------|-------------|
| P1 | Contenu 100 % chauffage Besançon, validé Rémy | ✅ FAIT (28/07) | CEO site |
| P2 | Zone DNS OVH active (NS répondent) | ⏳ AFNIC en cours | CEO-portefeuille |
| P3 | Redirection ForwardEmail contact@ → remy@remyzaoui.com | ⏳ attend P2 | CEO-portefeuille |
| P4 | RESEND_API_KEY + RESEND_FROM posées (production) | ✅ FAIT (28/07, 06:09) | CEO-portefeuille |
| P5 | Chaîne Resend testée (envoi réel reçu par Rémy) | ✅ FAIT (29/07, test API), à RE-tester via le formulaire après P3 | CEO site |
| P6 | Numéro 09 Twilio dédié, VoiceUrl vérifié | ⏳ file d'attente stock 09 | CEO-portefeuille |
| P7 | Numéro reporté dans config/site.config.ts (fin du DEMO) + cockpit | ⏳ attend P6 | Builder puis CEO-portefeuille |
| P8 | Sign-off EXPLICITE de Rémy | ⏳ | Rémy |

## Séquence de mise en ligne (jour J)

1. **Merge `design/t3` → `main`** (via PR ou merge direct, après build vert local).
   ⚠️ Déclenche le déploiement production ET la première publication autoblog
   (comportement attendu, documenté par le Builder).
2. **Vérifier le déploiement production** : state READY, une page répond (pas juste
   l'état, leçon du 28/07), contenu Besançon servi.
3. **Test formulaire de bout en bout** : lead de test depuis le site (URL vercel.app,
   auth Vercel), email reçu dans la boîte de Rémy via contact@ (P3). Sinon STOP.
4. **Ajouter le domaine** `sos-chauffage-besancon.fr` + `www` au projet Vercel
   (Production). NE PAS le faire avant le merge : avec la protection
   `all_except_custom_domains`, un domaine actif servirait l'ancien déploiement SANS
   protection.
5. **DNS OVH** (CEO-portefeuille ou CEO site selon accès) : apex A `76.76.21.21`,
   `www` CNAME `cname.vercel-dns.com.` (supprimer tout TXT/A préexistant sur www).
   Attendre la vérification Vercel des deux domaines.
6. **canonicalBase** : Builder passe `seo.canonicalBase` au domaine final (version
   exacte : www ou apex selon la redirection choisie), commit + merge.
7. **Retirer la protection Vercel** (ssoProtection → null) une fois le domaine servi
   et contrôlé visuellement (trois formats, règle permanente).
8. **Lever le noindex EN DERNIER** : supprimer SEO_NOINDEX de l'environnement
   production UNIQUEMENT (la garder sur preview/development), redéployer, vérifier
   robots.txt (Allow + sitemap) et la balise robots des pages.
9. **Google Search Console** : propriété Domaine, TXT de validation (DNS OVH),
   soumettre le sitemap.
10. **Test manuel de l'Action autoblog** (Run workflow) et vérification de l'article.
11. **Cockpit** : statut, URL, date online, numéro (CEO-portefeuille).
12. **ETAT.md + tasks/todo.md** : passage en mode exploitation (suivi SEO, autoblog).

## Contrôles post-mise en ligne (J+1 à J+7)
- robots.txt et sitemap accessibles depuis le domaine final.
- Search Console : couverture, aucune erreur de serveur.
- Un lead de test téléphonique (appel du 09 → renvoi vérifié).
- Publication autoblog du lundi/mercredi/vendredi effective.
