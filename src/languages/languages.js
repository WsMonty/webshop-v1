const languages = {
  shoppingCart: {
    en: 'Shopping Cart',
    de: 'Einkaufswagen',
    'de-LU': 'Akaafsweenchen',
    fr: 'Panier',
  },
  close: {
    en: 'Close',
    de: 'Schließen',
    'de-LU': 'Zou maachen',
    fr: 'Fermer',
  },
  deleteFromCart: {
    en: 'Delete',
    de: 'Löschen',
    'de-LU': 'Löschen',
    fr: 'Retirer',
  },
  proceedPayment: {
    en: 'Proceed to payment',
    de: 'Weiter um bezahlen',
    'de-LU': 'Weider fir ze bezuelen',
    fr: 'Procéder au paiement',
  },
  about: {
    en: 'About',
    de: 'Über',
    'de-LU': 'Iwwer',
    fr: 'Infos',
  },
  contact: {
    en: 'Contact',
    de: 'Kontakt',
    'de-LU': 'Kontakt',
    fr: 'Contact',
  },
  addToCart: {
    en: 'Add to cart',
    de: 'In den Einkaufswagen',
    'de-LU': 'An de Weenchen',
    fr: 'Ajouter au panier',
  },
  moreInformation: {
    en: 'More Information',
    de: 'Mehr Informationen',
    'de-LU': 'Méi Informatiounen',
    fr: "Plus d'informations",
  },
  goBack: {
    en: 'Go Back',
    de: 'Zurück',
    'de-LU': 'Zeréck',
    fr: 'Retour',
  },
  concerns: {
    en: "If you have any questions or concerns that are not answered in the FAQs please contact me directly. I'm happy to help!",
    de: 'Falls Sie irgendwelche Fragen oder Bedenken haben, melden Sie sich gerne an folgende Mail Adresse. Wir sind froh Ihnen zu helfen!',
    'de-LU':
      'Wann Dir Froen oder Bedenken hutt, meld Iech gäeren un folgend Mail Adress. Mir sin frou Iech ze hëllefen.',
    fr: "Si vous avez des questions ou des doutes, n'hésitez pas à nous contacter par email. Nous sommes heureux de vous aider!",
  },
  download: {
    en: 'Click on each link to get your PDFs!',
    de: 'Öffnen Sie jeden Link, um ihre PDFs zu erhalten!',
    'de-LU': 'Klickt op all Link fir Äer PDFen erof ze lueden!',
    fr: 'Ouvrez chaque lien pour télécharger les PDFs!',
  },
  specifications_big: {
    en: 'You get PDFs of the score and sheets for the different players.',
    de: 'Sie bekommen PDFs von der Partitur und Einzelstimmen.',
    'de-LU': 'Dir kritt PDFen vun der Partitur an den Eenzelstëmmen.',
    fr: 'Vous recevrez des PDF de la partition et des parties individuelles.',
  },
  specifications_leadSheet: {
    en: 'You get PDFs of the lead sheet in concert pitch, Bb and Eb.',
    de: 'Sie bekommen PDFs vom Lead Sheet in den Stimmungen C, Bb und Eb.',
    'de-LU': 'Dir kritt PDFen vum Lead Sheet an de Stëmmungen C, Bb an Eb.',
    fr: 'Vous recevrez des PDF du lead sheet en C, Bb et Eb.',
  },
  isInCart: {
    en: 'Is already in the cart',
    de: 'Ist bereits im Einkaufswagen',
    'de-LU': 'Ass schon am Weenchen',
    fr: 'Est déjà dans le panier',
  },
  showAllWorks: {
    en: 'All works',
    de: 'Alle Werke',
    'de-LU': "All d'Wierker",
    fr: 'Toutes les oeuvres',
  },
  categories: {
    en: 'Categories',
    de: 'Kategorien',
    'de-LU': 'Kategorien',
    fr: 'Catégories',
  },
  composers: {
    en: 'Composers',
    de: 'Komponisten',
    'de-LU': 'Komponisten',
    fr: 'Componistes',
  },
  paymentLoading: {
    en: 'Payment options are loading, this usually takes a few seconds.',
    de: 'Bezahlmöglichkeiten werden geladen! Dies dauert normalerweise ein paar Sekunden.',
    'de-LU':
      "d'Bezuelméiglechkeeten gi gelueden! Dëst dauert normalerweis e puer Sekonne.",
    fr: 'Les options de paiement seront disponibles en quelque secondes.',
  },
  allWorksfromComp: {
    en: 'All works from this composer on Grethen Edition',
    de: 'Alle Werke von diesem Komponisten auf Grethen Edition',
    'de-LU': "All d'Wierker vun dësem Komponist op Grethen Edition",
    fr: 'Toutes les oeuvres de ce componiste sur Grethen Edition',
  },
  newCompositions: {
    en: 'Newest Compositions',
    de: 'Neueste Kompositionen',
    'de-LU': 'Neitste Kompositioune',
    fr: 'Nouvelles compositions',
  },
  seeCompositions: {
    en: 'See all compositions',
    de: 'Alle Kompositionen sehen',
    'de-LU': "Weis all d'Kompositioune",
    fr: 'Montrez toutes les compositions',
  },
  newArrangements: {
    en: 'Newest Arrangements',
    de: 'Neueste Arrangements',
    'de-LU': 'Neitsten Arrangementer',
    fr: 'Nouvelles arrangements',
  },
  seeArrangements: {
    en: 'See all arrangements',
    de: 'Alle Arrangements sehen',
    'de-LU': "Weis all d'Arrangementer",
    fr: 'Montrez tous les arrangements',
  },
  newTranscriptions: {
    en: 'Newest Transcriptions',
    de: 'Neueste Transkiptionen',
    'de-LU': 'Neitste Transkriptiounen',
    fr: 'Nouvelles transcriptions',
  },
  seeTranscriptions: {
    en: 'See all transcriptions',
    de: 'Alle Transkriptionen sehen',
    'de-LU': "Weis all d'Transkriptioune",
    fr: 'Montrez tous les transcriptions',
  },
  welcome: {
    en: 'Welcome to Grethen Edition!',
    de: 'Willkommen auf Grethen Edition!',
    'de-LU': 'Wëllkomm op Grethen Edition!',
    fr: 'Bienvenue sur Grethen Edition!',
  },
  follow: {
    en: 'Follow us on social media!',
    de: 'Folge uns auf sozialen Medien!',
    'de-LU': 'Folleg eis op soziale Medien!',
    fr: 'Suivez-nous sur les réseaux sociaux!',
  },
  engraving: {
    en: 'Engraving',
    de: 'Notensatz (Layout)',
    'de-LU': 'Noutesaz (Layout)',
    fr: 'Gravure musicale',
  },
  engraving_description: {
    en: 'I can beautifully engrave your handwritten or pdf sheet music into ready to play and publish scores and parts! Hit me up with your project, so I can give you your custom offer!',
    de: 'Ich kann das Layout deiner handgeschriebenen oder digitalen Noten übernehmen. Die fertigen Partituren und Stimmen sind dann bereit zum verlegen oder um davon zu spielen! Schreibe mir eine Nachricht, um ein Angebot zu erhalten.',
    'de-LU':
      'Ech kann de Layout vun dengen handgeschriwwenen oder digitale Nouten iwwerhuelen. Déi fäerdeg Partituren a Stëmmen sin dann bereet fir de Verlag oder fir dovun zu spillen! Schreif mer eng Noriicht fir en Devis ze kréien.',
    fr: 'Je peux faire une gravure musicale de vos partitions digitales ou écrites par main. Les partitions finales seront prêtes pour être éditées ou pour jouer en concert. Ecris-moi un mail pour recevoir un devis.',
  },
  arrangement_description: {
    en: 'Hit me up if you want me to arrange your music for any ensemble you want! (e.g. jazz combo with horn section, (Little) Big Band, Orchestra, string section )',
    de: 'Kontaktiere mich wenn du deine Musik für ein bestimmtes Ensemble arrangiert haben willst! (z.B. Jazz Combo mit Bläser Section, (Little) Big Band, Orchester, Streicher)',
    'de-LU':
      'Kontaktéier mech wann s du deng Musek fir e bestëmmten Ensemble wëlls arrangéiert hun! (z.B. Jazz Combo mat Bléiser Section, (Little) Big Band, Orchester, Sträicher)',
    fr: "Contactes-moi si tu avez besoin d'un arrangement pour un ensemble spécifique! (p.ex. combo jazz, (Little) Big Band, orchestre, ensemble à chordes)",
  },
  composition: {
    en: 'Composition commission',
    de: 'Auftragskomposition',
    'de-LU': 'Kompositiounsoptrag',
    fr: 'Composition commandée',
  },

  composition_description: {
    en: 'We take composition commissions for any ensemble! Hit me up if you want a specific composer on the site to write music for your ensemble.',
    de: 'Wir nehmen Auftragskompositionen an! Kontiere uns wenn du willst, dass ein bestimmter Komponist unseres Verlags Musik für dein Ensemble schreibt.',
    'de-LU':
      'Mir huelen Kompositiounsopträg un! Kontaktéier eis wanns du interesséiert bass, dass e bestëmmte Komponist e Wierk fir däin Ensemble schreift.',
    fr: "Nous acceptons des commandes de compositions! Contactes-nous si tu est interessé qu'un componiste de l'édition écrit une oeuvre pour ton ensemble.",
  },
  contactus: {
    en: 'Get in touch with us to get your offer!',
    de: 'Kontakiere uns um dein Angebot zu bekommen!',
    'de-LU': 'Kontaktéier eis fir däin Devis ze kréien!',
    fr: 'Contactes-nous pour recevoir ton devis!',
  },
  describe: {
    en: 'Briefly describe what you need. (e.g. duration of the piece, instrumentation,...)',
    de: 'Beschreibe kurz was du brauchst. (z.B. Dauer vom Stück, Instrumentation,...)',
    'de-LU':
      'Beschreif kuerz de Projet. (z.B. Dauer vum Steck, Instrumentatioun,...)',
    fr: 'Une petite description du projet. (p.ex. durée du morceau, instrumentation,...)',
  },
  submit: {
    en: 'Submit',
    de: 'Abschicken',
    'de-LU': 'Schécken',
    fr: 'Envoyer',
  },
  alertcontactform: {
    en: "Thank you for contacting us! We'll get back to you as soon as possible.",
    de: 'Danke dass du uns kontaktiert hast! Wir melden uns so schnell wie möglich zurück.',
    'de-LU':
      'Merci dass du eis kontaktéiert hues! Mir mellen eis esou schnell wéi méiglech zeréck.',
    fr: 'Merci de nous avoir contacté! Nous te répondrons le plus vite possible.',
  },
  priceVAT: {
    en: '(VAT incl.)',
    de: '(inkl. Mwst.)',
    'de-LU': '(inkl. TVA)',
    fr: '(TVA incl.)',
  },
  x: {
    en: '',
    de: '',
    'de-LU': '',
    fr: '',
  },
};

export default languages;
