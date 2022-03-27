import React from 'react';
import Layout from './src/pages/layouts/layout.js';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
