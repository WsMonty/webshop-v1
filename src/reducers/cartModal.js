const cartModalReducer = (state = 'hidden', action) => {
  switch (action.type) {
    case 'close':
      return (state = 'hidden');
    case 'show':
      return (state = 'cart-active');
    default:
      return state;
  }
};

export default cartModalReducer;
