# PLAN SEO-GEO, SOS CHAUFFAGE BESANÇON

> Produit par l'agent SEO (V2) le 28/07/2026, contrôlé et corrigé par le CEO.
> Corrections CEO sur la V2 : orientations de Miserey-Salines, Pirey et Franois,
> nettoyage du llms.txt public (retrait mention RGE et données business internes),
> type schema.org HVACBusiness. Codes postaux et populations revérifiés par le CEO
> via geo.api.gouv.fr le 28/07/2026.
> Tout ce qui est marqué [DEMO] doit être validé par Rémy avant d'apparaître en prod.

---

## 1. CARTE DE MOTS-CLÉS

### Requêtes principales (intention urgence, haute conversion)
- dépannage chauffage besançon
- chauffagiste urgence besançon
- panne chaudière besançon
- chaudière gaz besançon dépannage
- chauffagiste besançon 24/7
- réparation chaudière besançon
- dépannage chaudière fioul besançon

### Requêtes secondaires (intention entretien, information)
- entretien chaudière gaz besançon
- révision chaudière besançon
- prix entretien chaudière besançon
- pompe à chaleur dépannage besançon
- ballon d'eau chaude dépannage besançon
- désembouage chauffage besançon
- remplacement chaudière besançon

### Requêtes géographiques
- Variantes par commune (ex. « chauffagiste saint-vit », « dépannage chauffage thise »).

### Stratégie saisonnière
- **Été (juin-août)** : obligation légale d'entretien annuel, prévention des pannes d'hiver.
- **Automne (sept-oct)** : préparation du chauffage, transition vers l'urgence.
- **Hiver (nov-fév)** : urgence maximale, dépannage 24/7, gestes de premier secours.
- **Printemps (mars-mai)** : fin de saison, maintenance légère.

**Volume global validé (benchmark)** : 400-550 recherches/mois sur l'agglomération, CPC 8-12 €.
Aucune estimation par mot-clé : non validée, donc non publiée.

---

## 2. LES 8 PAGES SERVICES

Chaque page comporte : intro « réponse directe » (2-3 phrases, citable par les IA),
corps éditorial, FAQ (4-6 questions) avec JSON-LD FAQPage.

### Service 1 : Dépannage chaudière gaz
- **Slug** : `/services/depannage-chaudiere-gaz`
- **Title** : « Dépannage chaudière gaz à Besançon, intervention urgence »
- **Meta** : « Panne chaudière gaz Besançon. Diagnostic, devis transparent, intervention rapide. Chauffagiste disponible 24/7. »
- **H1** : « Dépannage urgence chaudière gaz à Besançon »
- **Angle** : urgence hivernale maximale, perte de pression, plus de chauffage, étapes du diagnostic, tarif clair.
- **FAQ** :
  1. Pourquoi ma chaudière gaz ne s'allume plus ? (pression, thermostat, électrode d'allumage, filtre)
  2. Quel est le coût d'un dépannage de chaudière gaz ? [DEMO : tarifs à valider par Rémy]
  3. L'entretien annuel de chaudière est-il obligatoire ? (oui, obligation légale française, non-respect = perte de garantie constructeur, risques sécurité)
  4. Ma chaudière fuit, est-ce grave ? (perte de pression, arrêt de sécurité, intervention urgente)
  5. Comment reconnaître une chaudière en fin de vie ? (bruits anormaux, rendement faible, pièces rares, réparations répétées)
  6. Chaudière gaz et monoxyde de carbone, quels risques ? (gaz inodore et mortel, rôle de l'entretien annuel, détecteur CO recommandé)

### Service 2 : Dépannage chaudière fioul
- **Slug** : `/services/depannage-chaudiere-fioul`
- **Title** : « Réparation chaudière fioul Besançon, dépannage urgent »
- **Meta** : « Chaudière fioul en panne à Besançon. Chauffagiste fioul urgence 24/7, diagnostic, réparation et entretien légal. »
- **H1** : « Dépannage chaudière fioul urgent à Besançon »
- **Angle** : moins courant que le gaz mais présent en zones périurbaines et rurales, compétence spécifique (brûleur, cuve, pompe).
- **FAQ** :
  1. Quelle différence entre chaudière gaz et fioul ?
  2. Pourquoi ma chaudière fioul s'arrête régulièrement ? (cuve vide, brûleur encrassé, thermostat)
  3. À quelle fréquence réviser une chaudière fioul ? (1 fois par an avant l'hiver, idéalement septembre-novembre)
  4. Combien coûte l'entretien d'une chaudière fioul ? [DEMO : tarifs à valider par Rémy]
  5. Risques d'une chaudière fioul mal entretenue ? (rendement en baisse, surconsommation, panne critique en hiver)
  6. Puis-je passer du fioul au gaz ? (possible, conversion coûteuse, à évaluer au cas par cas)

### Service 3 : Entretien annuel chaudière (obligation légale)
- **Slug** : `/services/entretien-annuel-chaudiere`
- **Title** : « Entretien chaudière gaz fioul Besançon, révision légale »
- **Meta** : « Entretien annuel obligatoire chaudière. Révision légale, contrat entretien, garantie constructeur préservée, Besançon. »
- **H1** : « Entretien annuel légal chaudière à Besançon »
- **Angle** : obligation légale française (code de l'énergie, arrêté de juillet 2010, à sourcer précisément par le Builder sur Légifrance), timing optimal septembre-octobre. Page pilier de la saison été.
- **FAQ** :
  1. Est-ce vraiment obligatoire d'entretenir sa chaudière ? (oui, loi française, perte de garantie et risques en cas de non-respect)
  2. Quelle est la meilleure période ? (août-octobre, avant l'hiver)
  3. Que comprend l'entretien annuel ? (nettoyage, contrôles pression et température, brûleur, attestation fournie)
  4. Combien coûte un entretien de chaudière ? [DEMO : tarifs à valider par Rémy]
  5. Puis-je faire l'entretien moi-même ? (non, professionnel qualifié et assuré obligatoire)
  6. Quels avantages à un contrat annuel ? (visite programmée, attestation, tarif stable)

### Service 4 : Dépannage chauffage électrique et radiateurs
- **Slug** : `/services/depannage-chauffage-electrique`
- **Title** : « Réparation chauffage électrique radiateurs Besançon »
- **Meta** : « Radiateur électrique en panne, dépannage chauffage électrique Besançon. Intervention rapide, tous types radiateurs. »
- **H1** : « Dépannage radiateur et chauffage électrique à Besançon »
- **Angle** : demandes d'appoint et de rénovation partielle, pannes de thermostat, résistance, alimentation.
- **FAQ** :
  1. Mon radiateur électrique ne chauffe plus, pourquoi ?
  2. Quelle est la durée de vie d'un radiateur électrique ? [DEMO : à valider]
  3. Radiateur électrique ou chaudière gaz, avantages et inconvénients ?
  4. Un seul radiateur ne marche pas, les autres chauffent : que faire ?
  5. Peut-on combiner radiateurs électriques et chaudière gaz ?
  6. Comment préparer ses radiateurs électriques pour l'hiver ?

### Service 5 : Dépannage pompe à chaleur
- **Slug** : `/services/depannage-pompe-chaleur`
- **Title** : « Dépannage pompe à chaleur PAC Besançon, urgence »
- **Meta** : « Pompe à chaleur en panne à Besançon. Dépannage urgence PAC air-air et air-eau. Chauffagiste spécialisé disponible 24/7. »
- **H1** : « Dépannage urgence pompe à chaleur à Besançon »
- **Angle** : technologie en croissance, complexe, panne en hiver = urgence. PAC air-air et air-eau. Limites de rendement par grand froid comtois, rôle de l'appoint.
- **FAQ** :
  1. Ma PAC s'arrête en hiver, pourquoi ? (dégivrage normal ou vraie panne)
  2. Bruit anormal de PAC, est-ce un problème ?
  3. Une PAC est-elle moins efficace en hiver ?
  4. Combien coûte l'entretien d'une PAC ? [DEMO : à valider]
  5. Une PAC peut-elle remplacer une chaudière gaz ?
  6. Faut-il vidanger le circuit d'une PAC chaque année ? (non, circuit fermé, révision recommandée)

### Service 6 : Dépannage ballon d'eau chaude
- **Slug** : `/services/depannage-ballon-eau-chaude`
- **Title** : « Réparation ballon eau chaude chauffe-eau Besançon »
- **Meta** : « Ballon eau chaude en panne à Besançon. Réparation chauffe-eau, dépannage urgence, entretien détartrage. »
- **H1** : « Dépannage ballon d'eau chaude à Besançon »
- **Angle** : perte d'eau chaude = confort quotidien, anode, tartre, thermostat, résistance, fuites.
- **FAQ** :
  1. Mon chauffe-eau ne produit plus d'eau chaude, que faire ?
  2. Mon chauffe-eau est bruyant, est-ce normal ? (claquements = tartre)
  3. Le détartrage du chauffe-eau est-il obligatoire ? (non, mais très recommandé)
  4. Combien coûte le remplacement d'un ballon ? [DEMO : à valider par Rémy]
  5. Eau tiède ou froide malgré le chauffe-eau, pourquoi ?
  6. Qu'est-ce que l'anode d'un ballon d'eau chaude ? (pièce anti-corrosion à remplacer périodiquement)

### Service 7 : Désembouage circuit de chauffage
- **Slug** : `/services/desembouage-chauffage`
- **Title** : « Désembouage circuit chauffage Besançon, nettoyage »
- **Meta** : « Circuit chauffage faible, radiateurs froids. Désembouage, nettoyage tuyauterie Besançon, intervention chauffagiste. »
- **H1** : « Désembouage et nettoyage circuit chauffage à Besançon »
- **Angle** : maintenance préventive et corrective, dépôts de boue et rouille, radiateurs qui chauffent mal, rendement.
- **FAQ** :
  1. À quoi sert le désembouage d'un circuit de chauffage ?
  2. Radiateurs tièdes en bas et froids en haut, qu'est-ce que c'est ? (air ou boue)
  3. À quelle fréquence désembouer ? (tous les 5-10 ans ou dès que la circulation faiblit)
  4. Combien coûte un désembouage ? [DEMO : à valider par Rémy]
  5. Le désembouage peut-il créer des fuites ? (très rare avec un professionnel)
  6. Les produits de désembouage sont-ils sûrs ? (oui avec rinçage complet par un professionnel)

### Service 8 : Remplacement chaudière
- **Slug** : `/services/remplacement-chaudiere`
- **Title** : « Remplacement chaudière Besançon, devis installation neuve »
- **Meta** : « Remplacement chaudière gaz ou fioul à Besançon. Installation neuve, devis, conseil professionnel. »
- **H1** : « Remplacement chaudière neuve à Besançon »
- **Angle** : décision long terme, réparer ou remplacer, économies d'énergie. Les aides publiques (MaPrimeRénov', CEE, éco-PTZ) EXISTENT : les mentionner factuellement en renvoyant vers les sites officiels de l'État, sans jamais laisser entendre que nous y ouvrons droit (pas de mention RGE, nulle part).
- **FAQ** :
  1. Comment savoir si ma chaudière doit être remplacée ?
  2. Chaudière gaz, fioul ou PAC, laquelle choisir ?
  3. Des aides existent-elles pour remplacer sa chaudière ? (oui, conditions et montants sur les sites officiels de l'État)
  4. Combien de temps dure l'installation ? [DEMO : à valider]
  5. Quelle garantie pour une chaudière neuve ? (garantie constructeur selon marque)
  6. Combien coûte une installation de chaudière neuve ? [DEMO : à valider par Rémy]

---

## 3. LES 12 COMMUNES (pages zones)

Codes postaux et populations VÉRIFIÉS par le CEO via geo.api.gouv.fr le 28/07/2026.
Chaque page : image de tête UNIQUE (`public/zones/<slug>.jpg`), angle local exact,
FAQ locale (3-4 questions) avec JSON-LD FAQPage. Les délais d'intervention chiffrés
sont interdits tant que non validés : formulation prudente (« intervention rapide sur
l'agglomération ») ou [DEMO].

| # | Commune | Slug | CP | Population | Position réelle vs Besançon |
|---|---------|------|----|-----------|------------------------------|
| 1 | Saint-Vit | `/zones/saint-vit` | 25410 | 5133 | Ouest, axe D673 vers Dole |
| 2 | Thise | `/zones/thise` | 25220 | 2994 | Nord-est, près de l'aérodrome |
| 3 | Miserey-Salines | `/zones/miserey-salines` | 25480 | 2661 | Nord-ouest |
| 4 | École-Valentin | `/zones/ecole-valentin` | 25480 | 2579 | Nord, RN57, zone commerciale et tertiaire |
| 5 | Avanne-Aveney | `/zones/avanne-aveney` | 25720 | 2256 | Sud-ouest, vallée du Doubs |
| 6 | Pirey | `/zones/pirey` | 25480 | 2156 | Nord-ouest |
| 7 | Roche-lez-Beaupré | `/zones/roche-lez-beaupre` | 25220 | 2158 | Nord-est, vallée du Doubs |
| 8 | Franois | `/zones/franois` | 25770 | 2257 | Ouest |
| 9 | Serre-les-Sapins | `/zones/serre-les-sapins` | 25770 | 2004 | Ouest |
| 10 | Mamirolle | `/zones/mamirolle` | 25620 | 1988 | Sud-est, premier plateau du Jura |
| 11 | Châtillon-le-Duc | `/zones/chatillon-le-duc` | 25870 | 2042 | Nord, proche A36/RN57 |
| 12 | Marchaux-Chaudefontaine | `/zones/marchaux-chaudefontaine` | 25640 | 1447 | Nord-est |

### Détail par commune

1. **Saint-Vit** : « Chauffagiste Saint-Vit, dépannage chauffage urgence » / H1 « Dépannage chauffage et chaudière à Saint-Vit ». 2ème commune de l'agglomération, habitat mixte ancien, neuf et petit collectif, axe D673. FAQ : délai d'intervention (prudent), urgence de nuit, couverture gaz GRDF, types d'habitat.
2. **Thise** : « Dépannage chauffage Thise, chauffagiste urgence » / H1 « Chauffagiste dépannage Thise, urgence chauffage ». Nord-est, maisons individuelles dominantes, chaudières parfois anciennes. FAQ : GRDF, rapidité, types de chauffage, rudesse des hivers.
3. **Miserey-Salines** : « Chauffagiste Miserey-Salines, dépannage urgent » / H1 « Dépannage urgence chauffage Miserey-Salines ». Nord-ouest, habitat récent (années 2000-2010), chaudières modernes et PAC en croissance. FAQ : type de chauffage dominant, délai, présence de PAC, obligation d'entretien.
4. **École-Valentin** : « Dépannage chauffage École-Valentin, urgence 24/7 » / H1 « Chauffagiste urgence dépannage École-Valentin ». Nord, RN57, mixte résidentiel et tertiaire (bureaux, commerces). FAQ : dépannage pro, rapidité, habitat, collectif vs individuel.
5. **Avanne-Aveney** : « Chauffagiste Avanne-Aveney, dépannage urgence » / H1 « Dépannage chauffage urgent Avanne-Aveney ». Sud-ouest, vallée du Doubs, habitat ancien (années 70-90). FAQ : chaudières anciennes, saisonnalité, GRDF, délai [DEMO].
6. **Pirey** : « Dépannage urgence chauffage Pirey, chauffagiste » / H1 « Chauffagiste Pirey, dépannage urgence chauffage ». Nord-ouest, habitat mixte ancien et rénové. FAQ : type de chauffage, urgence de nuit, risque de panne sur habitat ancien, délai [DEMO].
7. **Roche-lez-Beaupré** : « Chauffagiste Roche-lez-Beaupré, dépannage 24/7 » / H1 « Dépannage chauffage Roche-lez-Beaupré, urgence ». Nord-est, vallée du Doubs, maisons individuelles. FAQ : froid hivernal, dimensionnement du chauffage, gaz ou fioul, délai [DEMO].
8. **Franois** : « Dépannage chauffage Franois, chauffagiste urgence » / H1 « Chauffagiste dépannage urgence Franois ». Ouest, habitat dispersé, passé rural, fioul encore présent. FAQ : fioul, conversion vers le gaz, urgence hivernale, délai [DEMO].
9. **Serre-les-Sapins** : « Dépannage chauffage Serre-les-Sapins, urgence » / H1 « Chauffagiste urgence Serre-les-Sapins, dépannage ». Ouest, secteur résidentiel et boisé, hivers rudes. FAQ : froid vs Besançon, fioul, PAC en altitude et par grand froid, délai [DEMO].
10. **Mamirolle** : « Chauffagiste Mamirolle, dépannage chaudière urgence » / H1 « Dépannage urgence chauffage Mamirolle ». Sud-est, premier plateau du Jura, mixte résidentiel et agricole. FAQ : gaz ou fioul, âge de l'habitat, délai [DEMO], urgence hivernale.
11. **Châtillon-le-Duc** : « Dépannage chauffage Châtillon-le-Duc, urgence 24/7 » / H1 « Chauffagiste urgence Châtillon-le-Duc, dépannage ». Nord, proche A36/RN57, petit collectif et maisons. FAQ : chauffage collectif, urgence en immeuble, GRDF, délai [DEMO].
12. **Marchaux-Chaudefontaine** : « Chauffagiste Marchaux-Chaudefontaine, dépannage » / H1 « Dépannage chauffage Marchaux-Chaudefontaine ». Nord-est, habitat dispersé, fioul encore répandu, gaz partiel. FAQ : fioul, alternatives sans gaz, urgence hivernale, délai [DEMO].

---

## 4. BLOG, CALENDRIER ÉDITORIAL 12 MOIS (août 2026 à juillet 2027)

Articles sous `/conseils/<slug>`. Logique : été = entretien légal et préparation,
octobre-mars = pannes, urgences, sécurité ; calé sur la mise en ligne fin septembre 2026.

| Mois | Article(s) | Mots-clés visés |
|------|-----------|-----------------|
| Août 2026 | Obligation d'entretien annuel de la chaudière, à faire avant novembre | obligation entretien chaudière, révision avant hiver |
| Sept. 2026 | Préparer son chauffage pour l'hiver, les étapes essentielles ; Désembouage du circuit, efficacité et confort | préparer chauffage hiver ; désembouage chauffage |
| Oct. 2026 | Reconnaître les signes d'une panne de chauffage imminente ; Monoxyde de carbone et chauffage, le risque invisible | signes panne chaudière ; monoxyde carbone chaudière |
| Nov. 2026 | Chauffage en panne, qui appeler et comment ? ; Chaudière gaz, fioul ou PAC pour le froid comtois | dépannage chauffage urgence besançon ; PAC hiver froid |
| Déc. 2026 | Grand froid annoncé, protégez votre chauffage dès maintenant ; Gestes de premier secours si le chauffage s'arrête | vague froid chauffage ; chaudière arrêt, perte pression |
| Jan. 2027 | Après un hiver intense, inspecter son chauffage | inspection chauffage post-hiver |
| Fév. 2027 | Chauffage fioul et approvisionnement d'hiver, anticiper | approvisionnement fioul hiver |
| Mars 2027 | Détartrage du ballon d'eau chaude, l'entretien oublié | détartrage chauffe-eau |
| Avr. 2027 | Remplacer sa chaudière au printemps, les aides publiques expliquées (renvoi sites officiels) | aide remplacement chaudière, MaPrimeRénov |
| Mai 2027 | Radiateur électrique d'appoint ou PAC air-air pour l'hiver prochain | radiateur électrique appoint, PAC |
| Juin 2027 | L'été, le bon moment pour vérifier circuit et radiateurs ; PAC air-air réversible, chauffage l'hiver et fraîcheur l'été | entretien chauffage été ; PAC climatisation été |
| Juil. 2027 | Planifier sa révision de chaudière à l'avance, les avantages | révision chaudière à l'avance |

---

## 5. DOCTRINE GEO (être cité par ChatGPT, Perplexity, AI Overviews)

### 5.1 FAQ structurées
- FAQ complète (4-6 questions) sur CHAQUE page service et zone, en JSON-LD FAQPage.
- Réponses courtes et factuelles (2-3 phrases), directement citables.
- Quelques questions-clés cohérentes d'une page à l'autre (ex. obligation d'entretien) pour consolider le sujet.

### 5.2 llms.txt
Réécrire `app/llms.txt` (héritage Metz) pour le chauffage Besançon : contexte, liste
des 8 services, liste des 12 communes avec leur position, saisonnalité, faits validés
(obligation légale d'entretien annuel, pas de fiche Google Business). NE PAS y mettre :
mention RGE (même en négatif), données business internes (volumes de recherche, CPC),
chiffres non validés.

### 5.3 Données structurées schema.org
- **Type principal (home)** : `HVACBusiness` (type schema.org dédié aux entreprises de chauffage/climatisation). Remplace le type `Plumber` hérité de Metz. Propriétés : name, url, telephone (numéro Twilio 09 quand fourni), email, address (Besançon, 25000), `areaServed` avec les 13 villes (Besançon + 12 communes), `openingHoursSpecification` (attention : c'est le nom de propriété correct, pas « hoursOfOperation »).
- **Pages services** : type `Service` avec `availableChannel` (téléphone, 24/7) et `areaServed`.
- **Toutes pages** : `FAQPage`.
- Pas de note agrégée, pas d'avis (interdits par la doctrine et de toute façon inexistants).

### 5.4 Cohérence NAP sans Google Business
- Nom unique partout : « SOS Chauffage Besançon ».
- Une adresse, un téléphone (Twilio 09 dédié), un email : contact@sos-chauffage-besancon.fr.
- Pas de listings annuaires multiples.

### 5.5 AI Overviews
- Chaque page service ouvre sur 1-2 paragraphes de réponse directe à la requête cible
  (format citable), puis le détail.

### 5.6 Backlinks naturels
- Partenaires locaux (artisans complémentaires, syndics), contributions honnêtes sur
  forums locaux. Jamais de spam ni d'échanges de liens massifs.

---

## 6. ARBORESCENCE FINALE

```
/                                    Home « SOS Chauffage Besançon, dépannage chauffage 24/7 »
/services/depannage-chaudiere-gaz
/services/depannage-chaudiere-fioul
/services/entretien-annuel-chaudiere
/services/depannage-chauffage-electrique
/services/depannage-pompe-chaleur
/services/depannage-ballon-eau-chaude
/services/desembouage-chauffage
/services/remplacement-chaudiere
/zones/saint-vit          /zones/thise             /zones/miserey-salines
/zones/ecole-valentin     /zones/avanne-aveney     /zones/pirey
/zones/roche-lez-beaupre  /zones/franois           /zones/serre-les-sapins
/zones/mamirolle          /zones/chatillon-le-duc  /zones/marchaux-chaudefontaine
/conseils                            + articles du calendrier éditorial
/mentions-legales  /politique-confidentialite  /cgu  /politique-cookies
```

La home ne prescrit PAS de structure de sections : le Builder invente la structure T3
(CLAUDE.md §2). Le plan SEO fournit les mots-clés et le message prioritaire (urgence
24/7 + entretien légal), pas la maquette.

---

## RÉSUMÉ STRATÉGIQUE

1. Urgence hivernale (novembre-février) : cœur du trafic, message « dépannage 24/7 ».
2. Entretien légal obligatoire : pilier anti-saisonnalité, pic éditorial août-octobre.
3. 12 pages communes vérifiées : ciblage local + citabilité IA.
4. Blog saisonnier 12 mois calé sur la mise en ligne de fin septembre 2026.
5. FAQ + HVACBusiness + FAQPage + llms.txt : dispositif GEO complet.
6. Aucun chiffre non validé en prod : tout [DEMO] doit passer par Rémy.
