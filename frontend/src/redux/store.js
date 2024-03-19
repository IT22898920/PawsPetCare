// src/redux/store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import petReducer from './features/Pets/petsSlice';
import filterReducer from './features/product/filterSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  pet: petReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // You can choose which parts of your state to persist.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
