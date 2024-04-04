// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import ThemeWrapper from './ThemeWrapper';
import 'flowbite';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </Provider>
  </React.StrictMode>
);
