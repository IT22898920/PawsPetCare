import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './features/auth/authSlice';
import productReducer from './features/product/productSlice';
import petReducer from './features/Pets/petsSlice';
import filterReducer from './features/product/filterSlice';
import userReducer from './features/auth/userSlice';
import blogReducer from './features/blog/blogSlice';
import blogFilterReducer from './features/blog/blogFilterSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  pet: petReducer,
  filter: filterReducer,
  users: userReducer,
  blog: blogReducer,
  blogfilter: blogFilterReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // You can choose which parts of your state to persist.
};

// Apply persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
