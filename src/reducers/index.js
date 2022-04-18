import cartReducer from './cart';
import localeReducer from './locale';
import cartModalReducer from './cartModal';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  cart: cartReducer,
  locale: localeReducer,
  cartModal: cartModalReducer,
});

export default allReducers;
