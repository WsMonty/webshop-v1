import cartReducer from './cart';
import localeReducer from './locale';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  cart: cartReducer,
  locale: localeReducer,
});

export default allReducers;
