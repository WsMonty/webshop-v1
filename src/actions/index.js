export const setLocale = (locale) => {
  return {
    type: locale,
  };
};

export const addToCart = (work) => {
  return {
    type: 'addToCart',
    title: work.title,
    options: work.options,
  };
};

export const emptyCart = () => {
  return { type: 'emptyCart' };
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
    title: work.title,
    options: work.buyOption,
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
