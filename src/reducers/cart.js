const cartReducer = (state = {}, action) => {
  const payload = action.payload;
  switch (action.type) {
    case 'addToCart':
      if (!state[payload]) {
        state[payload] = { title: payload, counter: 1 };
        return { ...state };
      }
      if (state[payload]) {
        state[payload].counter += 1;
        return { ...state };
      }
      break;
    case 'deleteFromCart':
      if (state[payload].counter > 1) {
        state[payload].counter -= 1;
        return { ...state };
      }
      if (state[payload].counter === 1) {
        delete state[payload];
        return { ...state };
      }
      break;
    default:
      return state;
  }
};

export default cartReducer;
