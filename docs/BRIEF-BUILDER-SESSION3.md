# BRIEF BUILDER, SESSION 3 (28/07/2026)

> Message du CEO au Builder, enregistré ici pour qu'une session neuve puisse reprendre le
> chantier sans rien perdre. À lire APRÈS `CLAUDE.md`, `docs/ETAT.md` et `tasks/lessons.md`.
> Branche de travail : `design/t3`. Point de départ : commit `6fe4067`.

## Contexte

Le template T3 et le contenu chauffage Besançon sont livrés et validés par le CEO
(sessions Builder 1 et 2). Le persona Julien Vernier, la galerie de réalisations et les
finitions communes sont en place. Le CEO a poussé de nouveaux visuels :

- `public/services/<slug>.jpg` pour les 9 prestations, y compris
  `climatisation-reversible.jpg` qui attend sa page.
- `public/artisan-detoure.png`, portrait détouré en PNG alpha, 1200x1500.

## Tâche 1, photos sur les pages prestation

Câbler la détection d'image sur le gabarit prestation, sur le modèle de ce qui a été fait
pour les communes : `existsSync` sur `public/services/<slug>.jpg`. La plaque de repères
reste le repli quand le fichier n'existe pas.

L'emplacement dans la direction artistique est laissé au jugement du Builder (tête de page
ou corps), à une condition : l'encadré « Ce qu'il faut retenir » doit rester lisible.
Textes alternatifs descriptifs du geste photographié.

## Tâche 2, correction de l'encadré « Ce qu'il faut retenir »

Retour de Rémy : les filets horizontaux internes de la carte se confondent avec les fines
lignes verticales du fond du hero, le rendu est sale.

Correction au jugement du Builder, dans la grammaire T3. Trois pistes possibles : rendre le
fond de la carte réellement opaque, supprimer ou alléger les filets internes, ou neutraliser
le motif de fond derrière la carte. Vérifier le rendu sur les 9 prestations ET sur les
communes.

## Tâche 3, nouvelle page prestation : climatisation réversible

Validée par Rémy. Tout est spécifié dans `docs/SEO-GEO-PLAN.md`, section « Service 9 » :
slug `/services/climatisation-reversible`, title, meta, H1, angle, FAQ, mots-clés.

Points durs :

- **JAMAIS** de mention d'attestation de manipulation des fluides frigorigènes, **JAMAIS**
  de RGE.
- Pas de rendement chiffré, pas de décibels : formulations qualitatives uniquement.
- Un paragraphe de distinction et des liens croisés avec `/services/depannage-pompe-chaleur`.
  La page PAC traite le dépannage du chauffage central air-eau, la page clim traite le
  confort air-air réversible. Les deux ne doivent pas se cannibaliser.
- Ajout au menu des prestations, au schema (`serviceType`), et vérification que le
  `llms.txt` régénéré la reprend bien.
- La photo `public/services/climatisation-reversible.jpg` est prête.

Adapter aussi la section « deux saisons » de l'accueil si cela renforce l'ensemble : la
climatisation est l'offre d'été par excellence, et le site assume sa saisonnalité.

## Tâche 4, portrait détouré

Rémy veut le portrait sans fond dans la section « Qui intervient chez vous ». Utiliser
`public/artisan-detoure.png` : remplacer la photo pleine par le sujet détouré posé sur un
aplat ou un dégradé de la palette T3, en conservant le cartouche d'identité.

**Interdit** : un badge « X ans d'expérience » ou tout autre chiffre. Rien n'est validé.

Le portrait plein `public/artisan.jpg` reste utilisable pour la vignette du bandeau
signature des pages prestation, si le Builder la conserve.

## Contraintes inchangées

- Branche `design/t3` uniquement, jamais `main`.
- Aucun tiret cadratin.
- `DEMO` sur tout ce qui n'est pas validé. Le nom « Julien Vernier » reste DEMO et reste
  **hors du JSON-LD** tant que Rémy ne l'a pas validé.
- `npm run build` vert avant de rendre (cache npm : voir `tasks/lessons.md`).
- Ne pas toucher aux variables Vercel ni au workflow autoblog.
- À la fin : s'arrêter pour le contrôle visuel du CEO.
