# LESSONS — SOS Chauffage Besançon

> Format : [date] | ce qui a mal tourné | règle pour l'éviter

## Leçons de ce site
- [28/07/2026] | L'agent SEO a rendu une V1 avec une meta contenant « Metz », une mention RGE interdite, 7 orientations géographiques fausses et des volumes/CPC inventés par mot-clé | Toujours relire un livrable d'agent contre CLAUDE.md (RGE, chiffres, tirets) ET vérifier soi-même les faits géographiques/locaux avant de l'écrire dans docs/. Même la V2 a demandé 3 corrections géo (Miserey-Salines, Pirey, Franois).
- [28/07/2026] | npm install échoue (EACCES sur ~/.npm/_cacache, fichiers appartenant à un autre utilisateur) | Utiliser npm install --cache <scratchpad>/npm-cache dans ce projet, ne pas toucher au cache global.
- [28/07/2026] | vercel env add en mode non interactif boucle sur la question de branche pour l'env preview | Passer par l'API REST Vercel (POST /v10/projects/<id>/env) pour poser des variables multi-environnements.

## Leçons héritées du portefeuille (sites 1-5)
- [héritée] | Leads perdus sur les premiers sites faute d'infra | Twilio 09 (VoiceUrl vérifié) + Resend testé (lead reçu) AVANT toute mise en ligne.
- [héritée] | Sites indexés trop tôt | SEO_NOINDEX=1 dès le tout premier déploiement, levé uniquement sur validation Rémy.
- [héritée] | 3 sites T2 partagent un tailwind.config identique (fingerprint) | T3 : config restructuré, noms d'échelles et valeurs différents.
- [héritée] | Contenu du site source encore présent après duplication | Jamais servir un déploiement public tant que le contenu hérité (Metz) n'est pas 100 % réécrit.
