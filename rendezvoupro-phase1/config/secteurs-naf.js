// ============================================================
// MAPPING 16 SECTEURS rendezvouPro ↔ CODES NAF INSEE
// ============================================================
// Chaque secteur contient les codes NAF (APE) correspondants
// Source : nomenclature NAF rév.2 — INSEE
// ============================================================

export const SECTEURS_NAF = [
  {
    id: "sante",
    nom: "Santé",
    icon: "🏥",
    codes_naf: [
      "8610Z", // Activités hospitalières
      "8621Z", // Activité des médecins généralistes
      "8622A", // Activités de radiodiagnostic et de radiothérapie
      "8622B", // Activités chirurgicales
      "8622C", // Autres activités spécialisées des médecins
      "8623Z", // Pratique dentaire
      "8690A", // Ambulances
      "8690B", // Laboratoires d'analyses médicales
      "8690C", // Centres de collecte et banques d'organes
      "8690D", // Activités des infirmiers et sages-femmes
      "8690E", // Activités des professionnels de la rééducation
      "8690F", // Activités de santé non classées ailleurs
      "8711A", // Hébergement médicalisé pour personnes âgées
      "8720A", // Hébergement social pour handicapés mentaux
    ],
    sous_secteurs: [
      "Médecin généraliste", "Cardiologue", "Dermatologue", "Ophtalmologue",
      "Gynécologue", "Pédiatre", "Psychiatre", "Psychologue", "Orthopédiste",
      "ORL", "Gastro-entérologue", "Endocrinologue", "Rhumatologue",
      "Neurologue", "Oncologue", "Pneumologue", "Urologue", "Radiologue",
      "Médecin du sport", "Homéopathe", "Acupuncteur", "Ostéopathe",
      "Sage-femme", "Infirmier à domicile", "Médecin nutritionniste", "Kinésithérapeute"
    ]
  },
  {
    id: "dentaire",
    nom: "Dentaire",
    icon: "🦷",
    codes_naf: [
      "8623Z", // Pratique dentaire
    ],
    sous_secteurs: [
      "Chirurgien-dentiste", "Orthodontiste", "Parodontologue",
      "Endodontiste", "Implantologue", "Prothésiste dentaire",
      "Dentiste pédiatrique", "Stomatologue"
    ]
  },
  {
    id: "auto",
    nom: "Auto & Moto",
    icon: "🚗",
    codes_naf: [
      "4511Z", // Commerce de voitures et de véhicules automobiles légers
      "4519Z", // Commerce d'autres véhicules automobiles
      "4520A", // Entretien et réparation de véhicules automobiles légers
      "4520B", // Entretien et réparation d'autres véhicules automobiles
      "4531Z", // Commerce de gros d'équipements automobiles
      "4532Z", // Commerce de détail d'équipements automobiles
      "4540Z", // Commerce et réparation de motocycles
      "7110A", // Location de courte durée de voitures et véhicules légers
      "5229A", // Messagerie, fret express
    ],
    sous_secteurs: [
      "Garagiste généraliste", "Carrossier", "Mécanicien moto",
      "Contrôle technique", "Électricien auto", "Vitrier auto",
      "Pneumaticien (pneus)", "Dépanneur", "Préparateur véhicule",
      "Concessionnaire", "Débosseleur", "Réparateur diesel",
      "Climatisation auto", "Tuning / préparation", "Valet parking",
      "Nettoyage auto détailing"
    ]
  },
  {
    id: "beaute",
    nom: "Beauté & Coiffure",
    icon: "✂️",
    codes_naf: [
      "9602A", // Coiffure
      "9602B", // Soins de beauté
    ],
    sous_secteurs: [
      "Coiffeur femmes", "Coiffeur hommes", "Barbier", "Coloriste",
      "Maquilleuse", "Esthéticienne", "Onglerie", "Institut de beauté",
      "Épilation laser", "Dermatologue esthétique", "Tatoueur",
      "Perceur corporel", "Extensions cils", "Microblading (sourcils)", "Bronzage / UV"
    ]
  },
  {
    id: "bienetre",
    nom: "Bien-être & Spa",
    icon: "💆",
    codes_naf: [
      "9604Z", // Entretien corporel
      "8690F", // Activités de santé NCA (naturopathie, sophrologie...)
      "8560Z", // Activités de soutien à l'enseignement (yoga, méditation)
    ],
    sous_secteurs: [
      "Masseur bien-être", "Spa & hammam", "Naturopathe", "Sophrologue",
      "Hypnothérapeute", "Réflexologue", "Énergéticien (reiki)",
      "Chiropracteur", "Podologue", "Diététicien-nutritionniste",
      "Coach de vie", "Thérapeute de couple", "Sexologue", "Relaxologue"
    ]
  },
  {
    id: "habitat",
    nom: "Habitat & Artisanat",
    icon: "🔧",
    codes_naf: [
      "4321A", // Travaux d'installation électrique dans tous locaux
      "4321B", // Travaux d'installation électrique sur la voie publique
      "4322A", // Travaux d'installation d'eau et de gaz en tous locaux
      "4322B", // Travaux d'installation d'équipements thermiques et de climatisation
      "4329A", // Travaux d'isolation
      "4329B", // Autres travaux d'installation NCA
      "4331Z", // Travaux de plâtrerie
      "4332A", // Travaux de menuiserie bois et PVC
      "4332B", // Travaux de menuiserie métallique et serrurerie
      "4332C", // Agencement de lieux de vente
      "4333Z", // Travaux de revêtement des sols et des murs
      "4334Z", // Travaux de peinture et vitrerie
      "4339Z", // Autres travaux de finition
      "4391A", // Travaux de charpente
      "4391B", // Travaux de couverture par éléments
      "4399A", // Travaux d'étanchéification
      "4399B", // Travaux de montage de structures métalliques
      "4399C", // Travaux de maçonnerie générale et gros œuvre de bâtiment
      "8130Z", // Services d'aménagement paysager
      "9601A", // Blanchisserie-teinturerie de gros
    ],
    sous_secteurs: [
      "Plombier", "Électricien", "Chauffagiste", "Serrurier", "Menuisier",
      "Peintre en bâtiment", "Carreleur", "Maçon", "Couvreur",
      "Jardinier / paysagiste", "Déménageur", "Architecte d'intérieur",
      "Décorateur intérieur", "Nettoyage / conciergerie", "Ramoneur",
      "Expert en rénovation", "Pisciniste", "Alarme / sécurité",
      "Installateur cuisine", "Vitrier bâtiment"
    ]
  },
  {
    id: "juridique",
    nom: "Juridique & Administratif",
    icon: "⚖️",
    codes_naf: [
      "6910Z", // Activités juridiques
      "6920Z", // Activités comptables
      "6622Z", // Activités des agents et courtiers d'assurances
    ],
    sous_secteurs: [
      "Avocat droit de la famille", "Avocat droit du travail", "Avocat pénal",
      "Avocat immobilier", "Notaire", "Huissier de justice", "Expert-comptable",
      "Commissaire de justice", "Médiateur", "Conseiller juridique",
      "Avocat droit des affaires", "Avocat droit fiscal", "Juriste d'entreprise"
    ]
  },
  {
    id: "finance",
    nom: "Finance & Assurance",
    icon: "💶",
    codes_naf: [
      "6419Z", // Autres intermédiations monétaires
      "6491Z", // Crédit-bail
      "6499Z", // Autres activités des services financiers NCA
      "6612Z", // Courtage de valeurs mobilières et de marchandises
      "6622Z", // Activités des agents et courtiers d'assurances
      "6630Z", // Gestion de fonds
      "6920Z", // Activités comptables
    ],
    sous_secteurs: [
      "Conseiller bancaire", "Conseiller en gestion de patrimoine",
      "Courtier en prêt immobilier", "Courtier en assurance",
      "Conseiller retraite", "Comptable", "Conseiller en investissement",
      "Analyste financier", "Conseiller mutuelle", "Gestionnaire de fonds"
    ]
  },
  {
    id: "sport",
    nom: "Sport & Fitness",
    icon: "🏋️",
    codes_naf: [
      "9311Z", // Gestion d'installations sportives
      "9312Z", // Activités de clubs de sports
      "9313Z", // Activités des centres de culture physique
      "9319Z", // Autres activités liées au sport
      "8551Z", // Enseignement de disciplines sportives et d'activités de loisirs
    ],
    sous_secteurs: [
      "Coach sportif personnel", "Préparateur physique", "Kiné du sport",
      "Yoga", "Pilates", "Natation (cours)", "Arts martiaux", "Boxe",
      "Danse", "Escalade", "Golf (cours)", "Tennis (cours)", "Équitation",
      "Crossfit", "Méditation / pleine conscience", "Nutrition sportive"
    ]
  },
  {
    id: "veterinaire",
    nom: "Vétérinaire & Animaux",
    icon: "🐾",
    codes_naf: [
      "7500Z", // Activités vétérinaires
      "9609Z", // Autres services personnels NCA (toilettage, pension)
    ],
    sous_secteurs: [
      "Vétérinaire généraliste", "Vétérinaire urgentiste",
      "Spécialiste animaux exotiques", "Chirurgie vétérinaire",
      "Comportementaliste animal", "Toiletteur", "Dresseur",
      "Pension animaux", "Ostéopathe animal", "Acupuncteur vétérinaire"
    ]
  },
  {
    id: "optique",
    nom: "Optique & Audition",
    icon: "👁️",
    codes_naf: [
      "4778C", // Commerce de détail d'optique
      "8690D", // Activités des infirmiers et sages-femmes (audioprothésistes)
    ],
    sous_secteurs: [
      "Opticien-lunetier", "Orthoptiste", "Ophtalmologue (vision)",
      "Audioprothésiste", "ORL audition", "Spécialiste lentilles de contact"
    ]
  },
  {
    id: "education",
    nom: "Éducation & Formation",
    icon: "📚",
    codes_naf: [
      "8559A", // Formation continue d'adultes
      "8559B", // Autres enseignements NCA
      "8560Z", // Activités de soutien à l'enseignement
      "8551Z", // Enseignement de disciplines sportives et d'activités de loisirs
      "8552Z", // Enseignement culturel
      "8553Z", // Enseignement de la conduite
      "8690F", // Orthophonie, psychomotricité
    ],
    sous_secteurs: [
      "Soutien scolaire", "Cours particuliers maths", "Cours particuliers langues",
      "Préparation bac / brevet", "Cours musique", "Cours dessin / arts",
      "Orientation scolaire", "Conseiller VAE", "Coach en reconversion",
      "Formation professionnelle", "Orthophoniste", "Psychomotricien", "Ergothérapeute"
    ]
  },
  {
    id: "immobilier",
    nom: "Immobilier",
    icon: "🏠",
    codes_naf: [
      "6810Z", // Activités des marchands de biens immobiliers
      "6820A", // Location de logements
      "6820B", // Location de terrains et d'autres biens immobiliers
      "6831Z", // Agences immobilières
      "6832A", // Administration d'immeubles et autres biens immobiliers
      "7111Z", // Activités d'architecture
      "7120B", // Analyses, essais et inspections techniques (diagnostiqueurs)
    ],
    sous_secteurs: [
      "Agent immobilier vente", "Agent immobilier location", "Gestionnaire locatif",
      "Diagnostiqueur immobilier", "Expert en évaluation", "Notaire immobilier",
      "Home stager", "Photographe immobilier", "Chasseur d'appartement"
    ]
  },
  {
    id: "tech",
    nom: "Tech & Informatique",
    icon: "💻",
    codes_naf: [
      "6201Z", // Programmation informatique
      "6202A", // Conseil en systèmes et logiciels informatiques
      "6202B", // Tierce maintenance de systèmes et d'applications informatiques
      "6203Z", // Gestion d'installations informatiques
      "6209Z", // Autres activités informatiques
      "6311Z", // Traitement de données, hébergement et activités connexes
      "7410Z", // Activités spécialisées de design
      "7490B", // Activités spécialisées, scientifiques et techniques diverses
      "9511Z", // Réparation d'ordinateurs et d'équipements périphériques
      "9512Z", // Réparation d'équipements de communication
    ],
    sous_secteurs: [
      "Dépannage informatique", "Développeur web (freelance)", "Designer UX/UI",
      "Technicien réseau", "Réparateur smartphone / tablette", "Expert cybersécurité",
      "Formateur informatique", "Consultant digital", "Community manager",
      "Expert SEO", "Photographe", "Vidéaste / monteur"
    ]
  },
  {
    id: "transport",
    nom: "Transport & Mobilité",
    icon: "🚐",
    codes_naf: [
      "4932Z", // Transports de voyageurs par taxis
      "4939A", // Transports routiers réguliers de voyageurs
      "4941A", // Transports routiers de fret interurbains
      "8553Z", // Enseignement de la conduite
      "8690A", // Ambulances
      "5229A", // Messagerie, fret express
    ],
    sous_secteurs: [
      "Auto-école", "Moniteur code de la route", "Taxi conventionné",
      "Transport médicalisé (VSL)", "Chauffeur VTC", "Déménageur (planification)",
      "Livreur express", "Coursier moto", "Garde d'enfants avec transport",
      "Navette aéroport"
    ]
  },
  {
    id: "evenementiel",
    nom: "Événementiel & Loisirs",
    icon: "🎉",
    codes_naf: [
      "7420Z", // Activités photographiques
      "5621Z", // Services des traiteurs
      "8230Z", // Organisation de foires, salons professionnels et congrès
      "9001Z", // Arts du spectacle vivant
      "9002Z", // Activités de soutien au spectacle vivant
      "9329Z", // Autres activités récréatives et de loisirs NCA
      "4776Z", // Commerce de détail de fleurs, plantes, graines
      "7711A", // Location de courte durée de voitures et véhicules légers
      "5610A", // Restauration traditionnelle (traiteurs à domicile)
    ],
    sous_secteurs: [
      "Photographe événements", "Vidéaste mariage", "Traiteur / chef à domicile",
      "Organisation mariage", "DJ / animateur", "Fleuriste sur commande",
      "Location de salle", "Escape game", "Guide touristique",
      "Activité team building", "Magicien / artiste", "Cours de cuisine",
      "Atelier créatif", "Karting / sport loisir"
    ]
  }
];

// Index rapide par code NAF
export const NAF_INDEX = {};
SECTEURS_NAF.forEach(s => {
  s.codes_naf.forEach(code => {
    if (!NAF_INDEX[code]) NAF_INDEX[code] = [];
    NAF_INDEX[code].push(s.id);
  });
});

export default SECTEURS_NAF;
