/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  site.config.ts, LE fichier unique qui pilote l'identité du site.
 * ─────────────────────────────────────────────────────────────────────────────
 *  SOS Chauffage Besançon, site n°6 du portefeuille, template T3.
 *
 *  ⚠️ Garde-fous :
 *   - `palette` est la SOURCE UNIQUE des couleurs. lib/theme.ts la convertit en
 *     variables CSS (canaux RGB) posées sur <html>, tailwind.config.ts les lit.
 *   - Les échelles T3 sont nommées par MOTS (brut, trempe, coulee, nuit, abysse…)
 *     et non par nombres : la signature de tokens diffère volontairement des
 *     autres templates du portefeuille.
 *   - `features.reviews=false` : aucun avis, jamais.
 *   - Aucune certification affichée. En particulier : PAS de mention RGE.
 *   - Tout ce qui est marqué DEMO attend une donnée réelle de Rémy.
 */

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  /* ── Identité commerciale (louable / remplaçable par l'artisan locataire) ── */
  businessName: 'SOS Chauffage Besançon',
  trade: 'Dépannage chauffage et chaudière',
  tradeShort: 'Chauffage',
  city: 'Besançon',
  region: 'Bourgogne-Franche-Comté',
  departmentName: 'Doubs',
  department: '25',

  /* ── Contact ── */
  // DEMO – numéro hérité du socle. À remplacer par le 09 Twilio dédié au site
  // (voir RENT & RANK/docs/INFRA-NOUVEAU-SITE.md) avant toute mise en ligne.
  phone: '+33939200076',
  phoneDisplay: '09 39 20 00 76',
  phoneIsDemo: true,
  email: 'contact@sos-chauffage-besancon.fr',

  /* ── Branding ── */
  logo: '/logo.svg',

  /**
   * Palette T3, « fonte et laiton ».
   *
   * Direction : l'atelier du chauffagiste plutôt que la flamme. Le métier est
   * porté par la MATIÈRE (fonte du radiateur, laiton des raccords, calcaire de
   * la pierre bisontine, vert sourd du Jura) et par le contraste thermique
   * froid/chaud, pas par un pictogramme de feu.
   *
   *  - `fonte`    : anthracite chaud, fonds sombres et chrome. Base du site.
   *  - `calcaire` : neutres froids, écho à la pierre de Besançon. Sections claires.
   *  - `jura`     : vert forestier désaturé. Structure, liens, états calmes.
   *  - `laiton`   : or chaud. ACTION et chaleur uniquement (appel, devis, chiffres).
   *
   * Règle de composition : `jura` porte la structure, `laiton` ne sert qu'à
   * l'action et aux marqueurs de chaleur. Volontairement aucun rouge d'urgence :
   * les cinq autres sites du portefeuille en ont déjà un, l'or profond assure
   * ici la même visibilité d'appel sans reprendre leur signature.
   */
  palette: {
    fonte: {
      brut: '#3B3F3C',
      trempe: '#2C302D',
      coulee: '#1F2321',
      nuit: '#151816',
      abysse: '#0C0E0D',
    },
    calcaire: {
      neige: '#FAF9F6',
      voile: '#F2F1EC',
      pierre: '#E6E4DC',
      brume: '#D2CFC4',
      ombre: '#A8A497',
      roche: '#7A776C',
      basalte: '#54524A',
    },
    jura: {
      mousse: '#8FB79F',
      tendre: '#5D9377',
      franc: '#3A7357',
      dense: '#2A5741',
      sombre: '#1D3F2F',
    },
    laiton: {
      paille: '#F3DCA8',
      clair: '#E3BE72',
      franc: '#C9902B',
      patine: '#96661A',
    },
  },

  /** Alias de compatibilité (manifest, thème navigateur, OG). */
  colors: {
    primary: '#2A5741',
    primaryDark: '#1D3F2F',
    accent: '#C9902B',
    dark: '#0C0E0D',
    light: '#FAF9F6',
  },

  /* ── Réassurance / preuve ── */
  availability: '24h/24 · 7j/7',
  responseTime: 'Intervention rapide sur Besançon et le Grand Besançon',
  usps: [
    'Devis avant intervention',
    'Diagnostic dès l’appel',
    'Chauffagiste local',
    'Urgence 7j/7',
  ],

  /** Appareils réellement pris en charge (sert au schema `knowsAbout` et à l'UI). */
  appareils: [
    'Chaudière gaz à condensation',
    'Chaudière fioul',
    'Pompe à chaleur air-eau et air-air',
    'Ballon d’eau chaude et chauffe-eau',
    'Radiateurs et circuit de chauffage central',
    'Chauffage électrique et thermostats',
    'Climatisation réversible air-air',
  ],

  /* ── Zone d'intervention (schema areaServed + section zones) ── */
  serviceArea: {
    base: 'Besançon',
    radiusKm: 25,
    // Quartiers de Besançon cités pour la couverture géo fine (maillage, pas de page dédiée).
    districts: [
      'Centre-ville',
      'Battant',
      'La Boucle',
      'Palente',
      'Planoise',
      'Saint-Ferjeux',
      'Montrapon',
      'Chaprais',
      'Velotte',
      'Les Clairs-Soleils',
      'Bregille',
      'Saint-Claude',
    ],
  },

  /* ── Leads / formulaire ── */
  // Vide => l'API interne /api/contact gère le fallback (log + email).
  formEndpoint: '',

  /* ── SEO global ── */
  seo: {
    // Domaine final (mise en ligne 30/07/2026). Apex canonique, www redirige en 308.
    canonicalBase: 'https://sos-chauffage-besancon.fr',
    defaultOgImage: '/og.jpg',
    locale: 'fr_FR',
    lang: 'fr',
  },

  /* ── Feature flags ── */
  features: {
    reviews: false, // ⛔ aucun avis affiché
    gallery: false, // ⛔ pas de galerie photo tant qu'aucun visuel réel n'existe
    blog: true,
  },

  /**
   * Symptômes du diagnostic d'accueil (composant signature `DiagnosticThermique`).
   * Chaque entrée relie une plainte réelle d'appelant à une cause probable et à
   * la prestation correspondante. Aucun chiffre, aucune promesse de délai.
   */
  symptomes: [
    {
      id: 'froid',
      appareil: 'radiateur',
      plainte: 'Mes radiateurs restent froids',
      indice: 'La chaudière tourne mais rien ne chauffe',
      cause:
        'Le plus souvent, un manque de pression dans le circuit, un circulateur bloqué ou de l’air emprisonné dans les radiateurs. Quand seuls les radiateurs du haut chauffent, la piste est la circulation. Quand un radiateur est tiède en bas et froid en haut, c’est de l’air ou de la boue.',
      geste:
        'Relevez la pression au manomètre de la chaudière avant d’appeler : c’est la première question que nous poserons.',
      service: 'desembouage-chauffage',
    },
    {
      id: 'securite',
      appareil: 'chaudière',
      plainte: 'Ma chaudière se met en sécurité',
      indice: 'Un code d’erreur, un voyant, un arrêt qui revient',
      cause:
        'Une mise en sécurité est une protection, pas une panne en soi : la chaudière s’arrête parce qu’une valeur sort de sa plage. Défaut d’allumage, pressostat, sonde de température, évacuation des fumées obstruée. Le code affiché oriente le diagnostic.',
      geste:
        'Notez le code affiché et ne réarmez pas en boucle : trois réarmements de suite sur un défaut d’allumage ne sont pas anodins.',
      service: 'depannage-chaudiere-gaz',
    },
    {
      id: 'eau-chaude',
      appareil: 'eau chaude',
      plainte: 'Je n’ai plus d’eau chaude',
      indice: 'Le chauffage fonctionne, mais l’eau reste froide ou tiède',
      cause:
        'Si le chauffage marche encore, la panne est côté production d’eau chaude : échangeur entartré sur une chaudière mixte, résistance ou thermostat hors service sur un ballon, vanne trois voies bloquée. L’eau tiède plutôt que froide oriente vers le thermostat.',
      geste:
        'Vérifiez que le mode été n’est pas resté enclenché et que le disjoncteur du ballon n’a pas sauté.',
      service: 'depannage-ballon-eau-chaude',
    },
    {
      id: 'bruit',
      appareil: 'circuit',
      plainte: 'J’entends des bruits anormaux',
      indice: 'Claquements, sifflements, bourdonnement continu',
      cause:
        'Des claquements secs dans un ballon signalent presque toujours du tartre sur la résistance. Un sifflement dans les tuyaux vient d’un débit trop élevé ou d’une vanne mal ouverte. Un bourdonnement continu pointe le circulateur. Sur une pompe à chaleur, le bruit du dégivrage est normal, un cliquetis métallique ne l’est pas.',
      geste:
        'Repérez d’où vient le bruit, chaudière, ballon ou radiateur, et à quel moment il apparaît.',
      service: 'depannage-pompe-chaleur',
    },
    {
      id: 'pression',
      appareil: 'chaudière',
      plainte: 'La pression chute sans arrêt',
      indice: 'Je dois remettre de l’eau toutes les semaines',
      cause:
        'Un circuit fermé ne consomme pas d’eau. Si la pression retombe, il y a une fuite quelque part, sur un raccord, un corps de chauffe ou une soupape de sécurité qui goutte, ou le vase d’expansion a perdu sa pression de gonflage.',
      geste:
        'Regardez sous la soupape de sécurité : une évacuation humide en permanence désigne le vase d’expansion.',
      service: 'depannage-chaudiere-gaz',
    },
    {
      id: 'odeur',
      appareil: 'sécurité',
      plainte: 'Je sens une odeur inhabituelle',
      indice: 'Odeur de gaz, de brûlé, de fioul',
      cause:
        'Une odeur de gaz impose de couper l’arrivée, de ne toucher à aucun interrupteur, d’aérer et de sortir avant d’appeler. Une odeur de fioul signale une fuite sur la ligne ou le brûleur. Le monoxyde de carbone, lui, est inodore : c’est le détecteur qui alerte, jamais le nez.',
      geste:
        'Odeur de gaz : coupez au compteur, aérez, sortez, appelez GRDF au 0 800 47 33 33 puis nous.',
      service: 'entretien-annuel-chaudiere',
    },
  ],

  /**
   * L'artisan qui incarne le site.
   *
   * Identité « Julien Vernier » VALIDÉE par Rémy (28/07/2026), présente aussi dans
   * le JSON-LD (`employee` sur HVACBusiness). À la mise en location, remplacer
   * l'ensemble du bloc par les informations réelles du loueur. Règles de
   * rédaction, non négociables :
   *  - AUCUN chiffre d'expérience (« X ans de métier », « X interventions »).
   *  - AUCUNE certification, AUCUN label, AUCUNE qualification déclarée.
   *  - Un parcours raconté par étapes, pas par dates.
   */
  persona: {
    nom: 'Julien Vernier',
    role: 'Chauffagiste',
    photo: '/artisan.jpg',
    photoAlt:
      'Chauffagiste en veste de travail, bras croisés, devant une chaudière et un réseau de tuyauterie cuivre dans une chaufferie aux murs de pierre',
    // Même sujet, détouré (PNG alpha) : posé sur un fond de la palette T3 dans la
    // section « Qui intervient chez vous ». L'alt ne décrit que le sujet, le
    // décor d'origine ayant été retiré.
    photoDetouree: '/artisan-detoure.png',
    photoDetoureeAlt:
      'Portrait d’un chauffagiste souriant en veste de travail, bras croisés',
    // Tenu court : sert de première ligne de titre, deux lignes équilibrées.
    accroche: 'Un seul interlocuteur',
    /** Parcours en étapes. Jamais de durée, jamais de date. */
    parcours: [
      {
        titre: 'Formé à Besançon',
        texte:
          'Apprentissage puis premières années sur le terrain dans l’agglomération, sur des installations de toutes générations.',
      },
      {
        titre: 'Les chaudières fioul du Haut-Doubs',
        texte:
          'Des débuts sur des chaufferies isolées, en altitude, là où une panne au cœur de l’hiver ne peut pas attendre le lendemain.',
      },
      {
        titre: 'Le gaz à condensation et les pompes à chaleur',
        texte:
          'Spécialisation ensuite sur les deux technologies qui équipent aujourd’hui la majorité des logements du Grand Besançon.',
      },
    ],
    citation:
      'Une panne de chauffage se raconte mal par écrit. Au téléphone, en trois questions, je sais déjà si je viens avec la pièce ou avec la caisse à outils.',
    /** Engagements factuels, vérifiables sur le site lui-même. */
    engagements: [
      'Un seul interlocuteur, au téléphone comme sur le chantier',
      'Le tarif annoncé avant l’intervention',
      'Ce qui a été fait, expliqué avant de repartir',
    ],
  },

  /**
   * Galerie de réalisations.
   *
   * ⚠️ Les légendes désignent un TYPE d'intervention, jamais un client, jamais une
   * commune, jamais une date : rien de ce qui n'est pas vérifiable ne doit être
   * écrit sous une photo.
   */
  realisations: [
    {
      image: '/realisations/01-chaudiere-gaz.jpg',
      legende: 'Remplacement d’une chaudière murale gaz à condensation',
      alt: 'Chaudière murale gaz neuve raccordée en cuivre, avec tubage d’évacuation inox, dans un logement ancien',
    },
    {
      image: '/realisations/02-chaufferie-fioul.jpg',
      legende: 'Entretien d’une chaufferie fioul',
      alt: 'Chaudière fioul au sol et cuve de stockage dans une cave aux murs de pierre, tuyauterie cuivre et circulateur',
    },
    {
      image: '/realisations/03-pac.jpg',
      legende: 'Mise en service d’une pompe à chaleur air-eau',
      alt: 'Unité extérieure de pompe à chaleur posée sur un socle béton contre le mur en pierre d’une maison de village',
    },
    {
      image: '/realisations/04-radiateur.jpg',
      legende: 'Remplacement d’un radiateur et pose d’un robinet thermostatique',
      alt: 'Radiateur panneau acier blanc neuf équipé d’un robinet thermostatique et raccordé en cuivre, au-dessus d’un parquet ancien',
    },
    {
      image: '/realisations/05-ballon.jpg',
      legende: 'Remplacement d’un ballon d’eau chaude',
      alt: 'Ballon d’eau chaude vertical raccordé en cuivre avec son groupe de sécurité, dans une cave en pierre',
    },
    {
      image: '/realisations/06-desembouage.jpg',
      legende: 'Désembouage d’un circuit de radiateurs',
      alt: 'Machine de désembouage raccordée par deux flexibles à un radiateur en fonte, bâche de protection étalée au sol',
    },
  ],

  /**
   * Les deux parcours du métier, cœur de la section `DeuxSaisons`.
   * L'urgence porte le trafic d'hiver, l'entretien tient l'été.
   */
  parcours: {
    urgence: {
      cle: 'urgence',
      titre: 'La panne',
      sousTitre: 'Il fait froid maintenant',
      texte:
        'Une chaudière qui s’arrête en janvier à Besançon ne se planifie pas. Vous appelez, vous décrivez ce que fait l’appareil, nous identifions la famille de panne au téléphone et nous vous donnons le tarif de l’intervention avant de venir.',
      points: [
        'Ligne ouverte week-ends et jours fériés',
        'Diagnostic engagé dès l’appel',
        'Tarif annoncé avant le déplacement',
      ],
    },
    entretien: {
      cle: 'entretien',
      titre: 'L’entretien',
      sousTitre: 'Avant que le froid revienne',
      texte:
        'L’entretien annuel d’une chaudière est une obligation légale en France, et c’est aussi ce qui évite l’arrêt en pleine vague de froid. La bonne fenêtre va d’août à octobre, quand le chauffage ne tourne pas encore. Et la belle saison a son chantier à elle : la climatisation réversible, posée au printemps, qui rafraîchit l’été et chauffe le reste de l’année.',
      points: [
        'Obligation légale annuelle',
        'Attestation remise après passage',
        'Rendez-vous choisi, pas subi',
      ],
    },
  },

  /* ── FAQ accueil ── */
  homeFaq: [
    {
      q: 'Intervenez-vous en urgence le soir, le week-end et les jours fériés à Besançon ?',
      a: "Oui. Une chaudière à l'arrêt en plein hiver dans un logement occupé ne peut pas attendre le lundi, surtout avec les températures de Franche-Comté. Notre ligne est ouverte 7j/7, week-ends et jours fériés compris, pour Besançon et les communes du Grand Besançon. Le créneau vous est annoncé au téléphone en fonction du planning réel du moment.",
    },
    {
      q: "L'entretien annuel de la chaudière est-il vraiment obligatoire ?",
      a: "Oui. La réglementation française impose un entretien annuel des chaudières dont la puissance est comprise entre 4 et 400 kilowatts, ce qui couvre la quasi-totalité des chaudières individuelles, qu'elles soient au gaz, au fioul ou au bois. L'entretien est à la charge de l'occupant, propriétaire ou locataire, et donne lieu à une attestation à conserver. Au-delà de l'obligation, c'est ce qui préserve la garantie constructeur et limite le risque de panne au pire moment.",
    },
    {
      q: 'Combien coûte un dépannage de chauffage à Besançon ?',
      a: "Le prix dépend de la prestation, pas de l'heure de l'appel : un remplacement de sonde, un désembouage de circuit et une intervention sur une pompe à chaleur ne se facturent pas de la même façon. Nous annonçons le tarif au téléphone à partir de ce que vous décrivez, puis nous le confirmons sur place avant de commencer. Si ce que nous trouvons change la prestation nécessaire, vous le savez avant l'intervention, pas au moment de la facture.",
    },
    {
      q: 'Ma chaudière affiche un code erreur, que dois-je faire avant votre arrivée ?',
      a: "Notez le code exactement tel qu'il s'affiche et transmettez-le nous au téléphone : sur la plupart des marques, il oriente déjà le diagnostic et permet d'arriver avec la bonne pièce. Vous pouvez tenter un réarmement, une fois. S'il faut réarmer trois fois de suite, arrêtez : le défaut est réel et l'insistance peut aggraver la situation, en particulier sur un défaut d'allumage.",
    },
    {
      q: 'Que faire si je sens une odeur de gaz chez moi ?',
      a: "Coupez l'arrivée de gaz au compteur, n'actionnez aucun interrupteur ni appareil électrique, ouvrez les fenêtres, sortez du logement et appelez le numéro d'urgence sécurité gaz de GRDF, le 0 800 47 33 33, joignable en permanence et gratuit. C'est le préalable à tout. Nous intervenons ensuite sur l'appareil, une fois la sécurité du réseau traitée.",
    },
    {
      q: 'Faut-il remplacer une chaudière ancienne ou continuer à la réparer ?',
      a: "La question se tranche sur trois éléments : la disponibilité des pièces détachées, la fréquence des pannes et le rendement réel de l'appareil. Une chaudière qui tombe en panne plusieurs fois par saison et dont les pièces se raréfient coûte plus cher entretenue que remplacée. Des aides publiques existent pour le remplacement, MaPrimeRénov', les certificats d'économies d'énergie et l'éco-prêt à taux zéro : leurs conditions figurent sur les sites officiels de l'État, et elles dépendent de l'installateur retenu.",
    },
  ],

  /* ── Légal (GABARIT, à compléter par Rémy avant prod) ── */
  legal: {
    showAddress: false, // false => schema SANS address
    address: { street: '', postalCode: '25000', city: 'Besançon' },
  },
} as const
