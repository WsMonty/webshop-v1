import React from 'react';
import Navbar from './navbar.js';

const Layout = ({ children }) => {
  return (
    <div id="root">
      <div className="main">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
