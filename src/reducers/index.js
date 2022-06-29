import cartReducer from './cart';
import localeReducer from './locale';
import purchasedReducer from './purchased';
import cartModalReducer from './cartModal';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
  cart: cartReducer,
  locale: localeReducer,
  cartModal: cartModalReducer,
  purchased: purchasedReducer,
});

export default allReducers;
