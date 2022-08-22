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
  x: {
    en: '',
    de: '',
    'de-LU': '',
    fr: '',
  },
};

export default languages;
