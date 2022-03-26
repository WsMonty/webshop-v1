import React from 'react';
import Layout from './src/pages/components/layout.js';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
