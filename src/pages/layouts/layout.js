import React from 'react';
import Navbar from '../../components/navbar.js';
import '../../styles/main.scss';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import CookieConsent from 'react-cookie-consent';

const Layout = ({ children }) => {
  const query = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div id="root">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{query.site.siteMetadata.title}</title>
        <link rel="canonical" href="https://webshop.example" />
      </Helmet>
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
