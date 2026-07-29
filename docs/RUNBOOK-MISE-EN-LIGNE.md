# RUNBOOK MISE EN LIGNE, sos-chauffage-besancon.fr

> Préparé par le CEO le 29/07/2026. À dérouler DANS L'ORDRE, uniquement après le
> sign-off explicite de Rémy. Chaque étape est vérifiée avant de passer à la suivante.

## Préconditions (état au 29/07/2026, fin de journée)

| # | Précondition | État | Responsable |
|---|--------------|------|-------------|
| P1 | Contenu 100 % chauffage Besançon, validé Rémy (+ dotation 11 publiés / 78 brouillons) | ✅ FAIT | CEO site |
| P2 | Zone DNS OVH active (NS répondent) | ✅ FAIT (29/07, vérifié dig) | CEO-portefeuille |
| P3 | Redirection ForwardEmail contact@ → remy@remyzaoui.com | ✅ FAIT (29/07, 2 emails reçus, rangés par filtre Gmail sous « VoltaPro/CRM & RDV ») | CEO-portefeuille |
| P4 | RESEND_API_KEY + RESEND_FROM posées (production) | ✅ FAIT (noms vérifiés, valeurs sensitive → validées par le lead de test de l'étape 3) | CEO-portefeuille |
| P5 | Chaîne formulaire testée de bout en bout (+ chemin d'échec LEAD-FAIL durci et testé) | ✅ FAIT (29/07) | CEO site |
| P6 | ~~Numéro 09 Twilio~~ BASCULÉ EN POST-LANCEMENT (décision Rémy 29/07, précédent Reims : lancement avec numéro DEMO affiché, remplacement à l'arrivée du 09 : Builder patch site.config.ts + cockpit) | ⏳ file Twilio, NON bloquant | CEO-portefeuille |
| P7 | (fusionné avec P6, post-lancement) | — | Builder |
| P8 | Sign-off EXPLICITE de Rémy | ⏳ SEUL RESTANT | Rémy |

⚠️ Vigilance ajoutée au lead de test (étape 3) : vérifier OÙ atterrit l'email dans Gmail.
Si l'expéditeur de prod est un @voltapro.io, le filtre Gmail de Rémy classera les vrais
leads hors inbox → adapter le filtre (ou l'expéditeur) avant de valider l'étape.

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
