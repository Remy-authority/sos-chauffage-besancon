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

- [28/07/2026] | Les contrôles visuels étaient surtout desktop + mobile, jamais tablette ; Rémy signale que les formats intermédiaires sont souvent les moins soignés (centrage, grilles) | Règle permanente (ajoutée au CLAUDE.md §2) : tout contrôle visuel couvre desktop + mobile ~390px + iPad portrait ~820px, avec vérification du centrage et des grilles intermédiaires. À proposer au CEO-portefeuille pour généralisation aux autres sites.

- [28/07/2026] | Rémy a repéré TROIS mains sur la photo de la prestation chauffage électrique, validée par le CEO sans zoom anatomique | Règle permanente (CLAUDE.md §2 du site + CLAUDE.md portefeuille + mémoire CEO) : toute image générée montrant mains ou personnes est contrôlée EN ZOOM avant intégration, comptage mains/doigts sur crops, et contrainte anatomique explicite dans les prompts (« une seule main visible » = plus sûr).

## Leçons héritées du portefeuille (sites 1-5)
- [héritée] | Leads perdus sur les premiers sites faute d'infra | Twilio 09 (VoiceUrl vérifié) + Resend testé (lead reçu) AVANT toute mise en ligne.
- [héritée] | Sites indexés trop tôt | SEO_NOINDEX=1 dès le tout premier déploiement, levé uniquement sur validation Rémy.
- [héritée] | 3 sites T2 partagent un tailwind.config identique (fingerprint) | T3 : config restructuré, noms d'échelles et valeurs différents.
- [héritée] | Contenu du site source encore présent après duplication | Jamais servir un déploiement public tant que le contenu hérité (Metz) n'est pas 100 % réécrit.

- [28/07/2026] | Les visuels de commune livrés étaient en 16:10, le gabarit les affichait en 4:3 : object-cover rognait environ 17 % de la largeur, donc une partie du décor qui fait tout l'intérêt d'une image de commune | Relever le ratio natif des visuels (sips -g pixelWidth -g pixelHeight) AVANT de fixer l'aspect-ratio d'affichage, et caler le gabarit dessus plutôt que l'inverse.
- [28/07/2026] | Vignette de portrait cadrée avec object-top : le crop tombait sur le plafond de la chaufferie, pas sur le visage | Sur un portrait recadré en petit format, fixer un point focal explicite (object-[center_28%]) plutôt que de se fier à top/center.
