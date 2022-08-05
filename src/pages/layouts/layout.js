import React from 'react';
import Navbar from '../../components/navbar.js';
import '../../styles/main.scss';
import CookieConsent from 'react-cookie-consent';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const Layout = ({ children }) => {
  return (
    <div id="root">
      <GatsbySeo
        language="en"
        title="Grethen Edition"
        description="Webshop for PDFs of Jazz compositions and arrangements."
        nofollow={false}
        noindex={false}
      />
      <div className="main">
        <Navbar />
        {children}
      </div>
      <CookieConsent
        cookieName="Google Fonts"
        buttonStyle={{ backgroundColor: '#FFCC4A', fontSize: '13px' }}
        style={{ background: '#1E1E1E' }}
      >
        This website uses cookies to improve user experience!
      </CookieConsent>
    </div>
  );
};

export default Layout;
