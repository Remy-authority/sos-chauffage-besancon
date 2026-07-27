# LESSONS — SOS Chauffage Besançon

> Format : [date] | ce qui a mal tourné | règle pour l'éviter

## Leçons de ce site
- [28/07/2026] | L'agent SEO a rendu une V1 avec une meta contenant « Metz », une mention RGE interdite, 7 orientations géographiques fausses et des volumes/CPC inventés par mot-clé | Toujours relire un livrable d'agent contre CLAUDE.md (RGE, chiffres, tirets) ET vérifier soi-même les faits géographiques/locaux avant de l'écrire dans docs/. Même la V2 a demandé 3 corrections géo (Miserey-Salines, Pirey, Franois).
- [28/07/2026] | npm install échoue (EACCES sur ~/.npm/_cacache, fichiers appartenant à un autre utilisateur) | Utiliser npm install --cache <scratchpad>/npm-cache dans ce projet, ne pas toucher au cache global.
- [28/07/2026] | vercel env add en mode non interactif boucle sur la question de branche pour l'env preview | Passer par l'API REST Vercel (POST /v10/projects/<id>/env) pour poser des variables multi-environnements.
- [28/07/2026] | Fond de l'en-tête invisible au scroll : `bg-calcaire-neige/92` n'existe pas. Tailwind ne génère que les opacités de son échelle (0, 5, 10, 15… 95, 100), une valeur hors échelle est silencieusement ignorée, sans erreur de build | N'utiliser que les paliers de l'échelle, ou la syntaxe entre crochets (`/[0.92]`) pour une valeur libre. Après tout changement de design system, grep les opacités utilisées et les confronter à l'échelle : le build reste vert malgré la classe morte.
- [28/07/2026] | Une capture Playwright `fullPage` montrait la moitié des sections vides | Ce sont les apparitions `whileInView` de framer-motion qui n'avaient pas encore été déclenchées. Toujours faire défiler la page par paliers AVANT de juger un rendu, sinon on corrige un défaut qui n'existe pas.
- [28/07/2026] | Grille `lg:grid-cols-12` avec une seule colonne remplie quand la photo manque : la page prestation ouvrait sur un vide asymétrique à droite | Un gabarit dont un visuel est optionnel doit prévoir le repli, jamais laisser la colonne vide. Ici : plaque graphique construite sur les données réelles de la page (repères, code postal, orientation).

- [28/07/2026] | Preview Vercel en échec (« No Output Directory named "public" found ») alors que le build local passait : un projet créé par `vercel project add` en CLI n'a AUCUN framework preset, Vercel le traite en site statique. Le tout premier déploiement de main était « READY » mais servait en réalité le dossier public/ tel quel (d'où l'alias en 404) | Après création d'un projet Vercel en CLI, TOUJOURS poser le preset : PATCH /v9/projects/<id> {"framework":"nextjs"}, puis vérifier qu'une page du site répond vraiment (pas seulement l'état READY du déploiement).

## Leçons héritées du portefeuille (sites 1-5)
- [héritée] | Leads perdus sur les premiers sites faute d'infra | Twilio 09 (VoiceUrl vérifié) + Resend testé (lead reçu) AVANT toute mise en ligne.
- [héritée] | Sites indexés trop tôt | SEO_NOINDEX=1 dès le tout premier déploiement, levé uniquement sur validation Rémy.
- [héritée] | 3 sites T2 partagent un tailwind.config identique (fingerprint) | T3 : config restructuré, noms d'échelles et valeurs différents.
- [héritée] | Contenu du site source encore présent après duplication | Jamais servir un déploiement public tant que le contenu hérité (Metz) n'est pas 100 % réécrit.
