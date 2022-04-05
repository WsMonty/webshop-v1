export const setLocale = (locale) => {
  return {
    type: locale,
  };
};

export const addToCart = (work) => {
  return {
    type: 'addToCart',
    payload: work,
  };
};

export const deleteFromCart = (work) => {
  return {
    type: 'deleteFromCart',
    payload: work,
  };
};
