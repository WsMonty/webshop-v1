import React from 'react';
import Layout from './src/pages/layouts/layout.js';
import { Provider } from 'react-redux';
import store from './src/store.js';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};
