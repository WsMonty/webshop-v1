const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'addToCart':
      state.push(action.payload);
      return state;
    case 'deleteFromCart':
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
      return state;
    default:
      return [...state];
  }
};

export default cartReducer;
