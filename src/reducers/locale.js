const localeReducer = (state = 'en', action) => {
  switch (action.type) {
    case 'en':
      return (state = 'en');
    case 'de':
      return (state = 'de');
    case 'de-LU':
      return (state = 'de-LU');
    case 'fr':
      return (state = 'fr');
    default:
      return state;
  }
};

export default localeReducer;
