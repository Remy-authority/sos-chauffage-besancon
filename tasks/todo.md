# TODO — SOS Chauffage Besançon

## Mise à jour n°1 (kickoff 18/10/2026, `docs/KICKOFF-MAJ-18-10.md`)
État : GO Rémy (« ok go ») le 18/10 ; les 10 chantiers sont codés sur la branche `maj-1-18-10`, aperçu Vercel livré, série de contrôles CODE 0 sur le commit c87c63e (relecture à froid faite, 6 corrections). EN LIGNE le 18/10 (main 7d12bb6), fin de site CODE 0, note 0 → 9. RESTE : Rémy demande l'indexation de l'accueil.
Ancien todo (juillet-août 2026) : `tasks/todo-archive.md` (grep ciblé).

### §0 État des lieux (18/10/2026, production, commit 3b3ef4d)
- GSC 90 j : 13 clics, 3 478 vues ; 28 j : 0 clic, 849 vues. Indexation 44/72 (61 %).
- Liste 1 (pages ≥ 10 vues, 0 clic, 28 j) : /services/depannage-chaudiere-gaz 347 (pos 66,6) ; /services/depannage-ballon-eau-chaude 292 (57,2) ; / 220 (62,7) ; /conseils/comprendre-circuit-chauffage-central 126 (31,4) ; /services/depannage-pompe-chaleur 124 (78) ; /contact 90 ; /services/depannage-chaudiere-fioul 89 ; /services/climatisation-reversible 62 ; /zones/chatillon-le-duc 58 ; /zones/saint-vit 53 ; /zones 46 ; /services/entretien-annuel-chaudiere 43 (16,9) ; franois 38 ; ecole-valentin 35 ; thise 29 ; givre-interieur 27 (10,1) ; courts-cycles 19 (15,5) ; desembouage 17 (27,9) ; lire-code-erreur 16 (4,8) ; mamirolle 16 ; roche-lez-beaupre 12 (5,6) ; pirey 11 ; chauffage-en-panne-qui-appeler 10 (7,0).
- Liste 2 (requêtes pos 8-30, ≥ 5 vues, 90 j) : climatisation besancon 21,9 ; dépannage urgence chaudière 28,1 ; depannage chaudiere 24,5 ; installation chauffe-eau besancon 13,8 ; depannage chauffage 26,4 ; entretien chaudière fioul autour de moi 10,4 ; vendeur chauffe-eau besancon 12,8.
  Famille chauffe-eau (90 j ≈ 1 100 vues) : dépannage ballon d'eau chaude besancon 120 vues pos 41 (28 j : 32) ; urgence chauffe-eau 110 ; reparation chauffe eau 105 ; ballon d'eau chaude besancon 104 pos 44 (28 j : 16,6 ; 7 j : 17,3 → TOP 20, seuil Twilio #R12) ; problème de chauffe-eau 102 ; chauffe-eau en panne 99 ; fuite chauffe-eau 98 ; dépannage chauffe-eau 94 ; mise en service chauffe-eau 94.
  Requête d'argent : urgence chaudière besancon 131 vues pos 36,9 (28 j : 22,0). Autres : depannage chaudiere fioul 96 ; installateur climatisation besancon 68 ; entretien chaudière besançon 47 ; chauffagiste besançon 15 (65,9).
- Liste 3 (prix / devis / tarif) : VIDE.
- Liste 4 (pilier) : /services/depannage-ballon-eau-chaude.
- Titles/descriptions servis : 47/72 pages hors bornes (accueil desc 223 ; /zones title 70 desc 184 ; mentions-legales 16/43 ; PAC desc 119 ; 43 articles desc 161-235 ; 19 titles d'articles 61-78). Brouillons : 41/43 titles hors bornes, 43/43 descriptions.
- Contrôles production : design ECHEC 6 défauts (pas de photo bloc 1, 593 car., pas de schéma, point 12 deux lignes 96 largeurs, point 10 logo pied -73 px) ; navigation ECHEC 3 (pas de sous-menus, contact incomplet, bloc 2 pas centré) ; blocs-pages non lançable sur le domaine public (à faire sur l'aperçu) ; visuels-articles OK ; footprint OK (Reims, Saint-Étienne, Pau, Metz) ; check-texte ECHEC (paragraphes 29/38/26/56 mots).
- Vitesse mobile production : 91 / 97 / 94 → médiane 94, LCP ≈ 2,7 s.
- Autoblog : 46 publiés, 43 brouillons, cron lun-mer-ven 05:31 ; 3/semaine → fin 25/01/2027 ; 5/semaine → fin 16/12/2026.
- DataForSEO : solde 2,055 $ ; mesure zone + France ≈ 0,10 $ (GO Rémy avant).

### Note AVANT (grille §8) : 0/10
1 ❌ H1 sans « urgence chaudière », description 223 · 2 ❌ /tarifs = 404 · 3 ❌ ballon pas un pilier · 4 ❌ zones sans fait sourcé, sans carte · 5 ❌ pages vues sans clic intactes · 6 ❌ pas de sous-menus, Besançon sans page · 7 ❌ pas de photo bloc 1 · 8 ❌ texte long, icônes lucide · 9 ❌ logo pied -73 px, pas de volets (vitesse 94 OK) · 10 ❌ contrôles rouges, 3/semaine.

### À NE PAS TOUCHER (page 1 ou proche)
- /conseils/chaudiere-ne-sallume-plus-ecran-eteint (4 clics, pos 4,6)
- /conseils/radiateur-electrique-fait-sauter-disjoncteur (3 clics, pos 7,3)
- /conseils/chauffage-tourne-en-continu-sans-sarreter (1 clic, pos 6,5)
- Aussi proches de la page 1 : lire-code-erreur (4,8), chauffage-en-panne-qui-appeler (7,0), givre-interieur (10,1), /zones/roche-lez-beaupre (5,6), /zones/avanne-aveney (6,5).
- Seul geste autorisé sur ces pages : description ramenée à 120-160 SANS changer le title ni le corps (expressions vérifiées au curl avant/après).

### Plan des 10 chantiers (après GO)
- [x] 1 Accueil : title ≤ 60 avec « urgence chaudière Besançon », H1, description 120-160, ≤ 800 mots.
- [x] 2 /tarifs sourcée, liée pied de page + prestations + un paragraphe ; pas de priceRange.
- [x] 3 Pilier chauffe-eau : page ballon réécrite (title, H1, intro, FAQ, schéma dessiné) ; page urgence chauffe-eau si la mesure le justifie.
- [x] 4 Zones : fait sourcé geo.api.gouv.fr × 12, titles « métier + commune », carte dessinée du Grand Besançon bloc 7/8, page Besançon.
- [x] 5 Pages vues sans clic réécrites (gaz, PAC, fioul, climatisation renforcée, contact) ; titles/descriptions des 72 pages + 43 brouillons.
- [x] 6 Maillage : 2 sous-menus de 3 + voir tout, /zones relié, contact = formulaire + FAQ + prestations.
- [x] 7 Bloc 1 (vraie photo posée le 18/10) : photo plein écran chaudière murale posée, scrollytelling si GO, formulaire noir à étapes qui avance au clic, 2 lignes max.
- [x] 8 Accueil : icônes dessinées animées, prestations empilées, formulaire à la fin, persona fictif retiré (QuiIntervient, SignatureArtisan, JSON-LD employee, artisan.jpg), FAQ fermée après zones, bloc 3 schéma.
- [x] 9 Pied de page : volets téléphone, colonnes alignées 1440, logo centré au pixel ; vitesse ≥ 91.
- [x] 10 Contrôles : script publication refuse hors bornes, série CODE 0 sur aperçu, 2 passes + 1 relecture Opus, autoblog selon décision Rémy.
- Interdits : téléphone inchangé (03 53 01 00 25, phoneIsDemo), jamais le 07, pas de RGE/avis/certif/chiffre inventé, pas de test formulaire sauf si modifié (1 envoi, signalé, effacé).

### Après le GO de Rémy sur l'aperçu (à faire dans l'ordre)
- [x] GO images (« ok go ») : photo du bloc 1 + 12 communes, ≈ 0,54 $ fal.ai, `CHAUDIERE` recalé, bande téléphone refaite, vitesse rattrapée (perte 2 points à armes égales), série CODE 0 sur 03179cc.
- [x] Retour de Rémy sur l'aperçu (formulaire absent du 1er écran téléphone, étiquettes du bloc 3 coupées, aucune photo de prestation) : carte au 1er écran, étiquettes dégagées, 9 prestations avec photo dont 5 refaites (≈ 0,18 $, GO « Oui va y »), repli sans animation corrigé ; commits 53d2447 et a61f24e ; série CODE 0 sur a61f24e.
- [x] GO de mise en ligne de Rémy (« oui met en ligne strp », 18/10).
- [x] Merge `maj-1-18-10` → main (89e9db4), production vérifiée au curl (title accueil).
- [x] Test du formulaire en production : UN envoi (TEST, reçu Gmail 13:26 UTC) ; effacement Gmail refusé (droit manquant), demandé à Rémy.
- [x] `python3 ../tasks/check-fin-de-site.py sos-chauffage-besancon.fr` CODE 0 (après « urgence » dans 6 titles de communes, 7d12bb6).
- [x] `gsc-indexation-pages.py --site` puis Rank OS › Tâches › Indexation : accueil refait + pages NON indexées seulement.
- [x] Fiche Rank OS (cockpit 0c93e392) : parSemaine 5, releveLe, autoblogEndsAt, entrée travaux, capture `cockpit/public/screens/sos-chauffage-besancon.png`, note APRÈS.
- [x] docs/ETAT.md et tasks/lessons.md à jour, compte rendu final (lien du site en 1re ligne).
