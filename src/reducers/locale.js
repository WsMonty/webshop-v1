import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locale: 'en',
};

const localeReducer = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeReducer.actions;

export default localeReducer.reducer;
