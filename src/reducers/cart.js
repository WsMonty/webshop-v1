import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {},
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload.title;
      const buyOptions = action.payload.options;
      const keyName = `${payload}_${buyOptions}`;
      if (!state.cart[keyName]) {
        state.cart[keyName] = {
          title: payload,
          counter: 1,
          buyOption: buyOptions,
        };
        return;
      }
      if (state.cart[keyName]) {
        state.cart[keyName].counter += 1;
        state.cart[keyName].buyOption = buyOptions;
        return;
      }
    },
    deleteFromCart: (state, action) => {
      const payload = action.payload.title;
      const buyOptions = action.payload.options;
      const keyName = `${payload}_${buyOptions}`;
      if (state.cart[keyName].counter > 1) {
        state.cart[keyName].counter -= 1;
        return;
      }
      if (state.cart[keyName].counter === 1) {
        delete state.cart[keyName];
        return;
      }
    },
    emptyCart: (state) => {
      state.cart = {};
    },
  },
});

export const { addToCart, deleteFromCart, emptyCart } = cartReducer.actions;

export default cartReducer.reducer;
