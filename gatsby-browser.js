import React from 'react';
import Layout from './src/pages/layouts/layout.js';
import './src/styles/main.scss';
import { Provider } from 'react-redux';
import store from './src/store.js';

export const wrapPageElement = ({ element, props }) => {
  return (
    <Provider store={store}>
      <Layout {...props}>{element}</Layout>
    </Provider>
  );
};

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};
