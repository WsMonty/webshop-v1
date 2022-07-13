//Alisa isnt the state rather an empty array?
const cartReducer = (state = {}, action) => {
  const payload = action.title;
  const buyOptions = action.options;
  const keyName = `${payload}_${buyOptions}`;
  switch (action.type) {
    case 'addToCart':
      if (!state[keyName]) {
        state[keyName] = {
          title: payload,
          counter: 1,
          buyOption: buyOptions,
        };
        return { ...state };
      }
      if (state[keyName]) {
        state[keyName].counter += 1;
        state[keyName].buyOption = buyOptions;
        return { ...state };
      }

      break;
    case 'deleteFromCart':
      if (state[keyName].counter > 1) {
        state[keyName].counter -= 1;
        return { ...state };
      }
      if (state[keyName].counter === 1) {
        delete state[keyName];
        return { ...state };
      }
      break;
    case 'emptyCart':
      return (state = {});
    default:
      return state;
  }
};

export default cartReducer;
