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

export const addFromLocaleStorage = (localStorage) => {
  return {
    type: 'addFromLocaleStorage',
    payload: localStorage,
  };
};

export const deleteFromCart = (work) => {
  return {
    type: 'deleteFromCart',
    payload: work,
  };
};

export const showCartModal = () => {
  return {
    type: 'cart-active',
  };
};

export const closeCartModal = () => {
  return {
    type: 'hidden',
  };
};

export const handleCartModal = (bool) => {
  return {
    type: bool,
  };
};
