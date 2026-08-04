# content/drafts/

File d'attente des articles préparés en avance : ils sont **invisibles du site** (aucun loader ne lit ce dossier) jusqu'à ce que la GitHub Action `publish-article` en publie un (lun/mer/ven) en le déplaçant vers `content/conseils/`.

Convention : nommer chaque fichier `NNN-slug.mdx` (`001-…`, `002-…`) ; le plus petit numéro part en premier, le préfixe `NNN-` est retiré à la publication.

## Images d'un article (cover + visuels du corps)

Chaque article vise 1 couverture + 2 visuels de corps (règle éditoriale 30/07/2026).

- **Où poser les fichiers** : dans un sous-dossier `NNN-slug.assets/` ici ; la publication le déplace automatiquement vers `public/conseils/<slug>/`. Pour un article DÉJÀ publié, poser directement dans `public/conseils/<slug>/`.
- **Frontmatter** : `cover: "/conseils/<slug>/cover.jpg"` + `coverAlt: "…"` (ce chemin est le chemin FINAL, valable dès le draft). La couverture s'affiche en tête d'article, sur la carte du hub et en OG image.
- **Corps** : JSX de bloc `<Figure src="/conseils/<slug>/nom.jpg" alt="…" legende="…" />` (composant `FigureArticle`, ligne vide avant et après la balise).
- **Repli** : tant qu'une image n'existe pas, rien ne casse : la cover est ignorée au build (`coverIfExists`), la `<Figure>` se masque toute seule au chargement.
- **Règles visuelles** : couvertures en 16:10, alt décrivant la scène réellement photographiée, aucun texte incrusté dans l'image, zéro tiret cadratin dans les légendes, contrôle anatomique en zoom si personnes/mains (2 mains max, 5 doigts, préférer « aucune personne »).
