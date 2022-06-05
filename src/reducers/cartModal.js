const cartModalReducer = (state = 'hidden', action) => {
  switch (action.type) {
    case 'close':
      return (state = 'closeTop-animation');
    case 'hide':
      return (state = 'hidden');
    case 'show':
      return (state = 'cart-active expandTop-animation');
    default:
      return state;
  }
};

export default cartModalReducer;
