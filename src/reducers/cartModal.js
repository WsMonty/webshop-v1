import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 'hidden' };

const cartModalReducer = createSlice({
  name: 'cartModal',
  initialState,
  reducers: {
    closeCartModal: (state) => {
      state.value = 'closeTop_animation';
    },
    hideCartModal: (state) => {
      state.value = 'hidden';
    },
    showCartModal: (state) => {
      state.value = 'cart_active expandTop_animation';
    },
  },
});

export const { closeCartModal, hideCartModal, showCartModal } =
  cartModalReducer.actions;

export default cartModalReducer.reducer;
