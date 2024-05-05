// src/redux/store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import petReducer from './features/Pets/petsSlice';
import filterReducer from './features/product/filterSlice';
import userReducer from './features/auth/userSlice'; // Importing userReducer
import blogReducer from './features/blog/blogSlice';
import blogFilterReducer from './features/blog/blogFilterSlice';
import eventFilterReducer from './features/event/eventFilterSlice';
import eventReducer from './features/event/eventSlice';
import petFilterReducer from './features/Pets/petFilterSlice';
import userAdoptionReducer from './features/userAdoption/userAdoptionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  pet: petReducer,
  filter: filterReducer,
  users: userReducer, // Adding the userReducer
  blog: blogReducer,
  blogfilter: blogFilterReducer,
  event: eventReducer,
  eventFilter: eventFilterReducer,
  petFilter :petFilterReducer,
  userAdoption: userAdoptionReducer,
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
