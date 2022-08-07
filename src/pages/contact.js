import React from 'react';
import { connect } from 'react-redux';
import languages from '../languages/languages';
import { StaticImage } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const Contact = (props) => {
  return (
    <div className="contact_container">
      <GatsbySeo
        title="Grethen Edition | Contact"
        description="Contact information for Grethen Edition."
        language="en"
        noindex={false}
        nofollow={false}
      />
      <p className="contact_phrase">{languages.concerns[props.locale]}</p>
      <h1 className="contact_name">Gilles Grethen</h1>
      <a
        className="contact_information url"
        href="mailto:info@grethen-edition.com"
        target="_blank"
        rel="noreferrer"
      >
        info@grethen-edition.com
      </a>
      <div className="contact_socials">
        <a
          href="https://www.facebook.com/gillesgrethen"
          target={'_blank'}
          rel="noreferrer"
          className="contact_socials_link"
        >
          <StaticImage
            className="contact_socials_logo"
            src="../images/fb-logo.png"
            alt="Facebook Logo"
          />
        </a>
        <a
          href="https://www.instagram.com/gilles_grethen_/"
          target={'_blank'}
          rel="noreferrer"
          className="contact_socials_link"
        >
          <StaticImage
            className="contact_socials_logo"
            src="../images/insta-logo.png"
            alt="Instagram Logo"
          />
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    cartModal: state.cartModal,
  };
};

export default connect(mapStateToProps)(Contact);
