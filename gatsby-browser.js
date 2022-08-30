import React from 'react';
import Layout from './src/pages/layouts/layout.js';
import './src/styles/main.scss';
import { store, persistor } from './src/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

export const wrapPageElement = ({ element, props }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout {...props}>{element}</Layout>
      </PersistGate>
    </Provider>
  );
};
