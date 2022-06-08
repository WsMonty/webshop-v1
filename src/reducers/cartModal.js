const cartModalReducer = (state = 'hidden', action) => {
  switch (action.type) {
    case 'close':
      return (state = 'closeTop_animation');
    case 'hide':
      return (state = 'hidden');
    case 'show':
      return (state = 'cart_active expandTop_animation');
    default:
      return state;
  }
};

export default cartModalReducer;
