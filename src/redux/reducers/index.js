import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cart from './cart';
import product from './product';
import shipping from './shipping';

const persistConfig = {
  key: 'cart',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cart);

export default combineReducers({ 
  cart: persistedReducer,
  product: product,
  shipping: shipping,
});
