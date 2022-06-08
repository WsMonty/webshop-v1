import React from 'react';
import Navbar from '../../components/navbar.js';
import ShoppingCart from '../../components/shoppingCart.js';
import '../../styles/main.scss';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

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
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="main">
        <Navbar />
        <div className="cart_icon_container">
          <ShoppingCart />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
