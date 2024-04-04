// src/redux/store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import themeReducer from '../redux/Theme/themeSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import petReducer from './features/Pets/petsSlice';
import filterReducer from './features/product/filterSlice';
import userReducer from './features/auth/userSlice'; // Importing userReducer

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  pet: petReducer,
  theme : themeReducer,
  filter: filterReducer,
  users: userReducer, // Adding the userReducer

});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // You can choose which parts of your state to persist.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  product: productReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
export const persistor = persistStore(store);
