const cartModalReducer = (state = 'hidden', action) => {
  switch (action.type) {
    case 'close':
      return (state = 'closeTop-animation');
    case 'show':
      return (state = 'cart-active expandTop-animation');
    default:
      return state;
  }
};

export default cartModalReducer;
