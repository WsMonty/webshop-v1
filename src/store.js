import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
import storage from './storage.js';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import allReducers from './reducers/allReducers.js';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const selectLocale = (state) => state.locale;
export const selectCart = (state) => state.cart;
export const selectCartModal = (state) => state.cartModal;
export const selectPurchased = (state) => state.purchased;

export const persistor = persistStore(store);
