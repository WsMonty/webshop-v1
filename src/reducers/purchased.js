import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  purchased: [],
};

const purchasedReducer = createSlice({
  name: 'purchased',
  initialState,
  reducers: {
    purchase: (state, action) => {
      state.purchased = action.payload;
    },
    emptyPurchased: (state) => {
      state.purchased = [];
    },
  },
});

export const { purchase, emptyPurchased } = purchasedReducer.actions;

export default purchasedReducer.reducer;
