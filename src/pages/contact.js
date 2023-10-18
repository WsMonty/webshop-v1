import React from 'react';
import { useSelector } from 'react-redux';
import languages from '../languages/languages';
import { StaticImage } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { selectLocale } from '../store.js';

const Contact = () => {
  const locale = useSelector(selectLocale).locale;

  return (
    <div className="contact_container">
      <GatsbySeo
        title="Grethen Edition | Contact"
        description="Contact information for Grethen Edition."
        language="en"
        noindex={false}
        nofollow={false}
      />
      <p className="contact_phrase">{languages.concerns[locale]}</p>
      <h1 className="contact_name">Gilles Grethen</h1>
      <a
        className="contact_information url"
        href="mailto:gilles@gillesgrethen.com"
        target="_blank"
        rel="noreferrer"
      >
        gilles@gillesgrethen.com
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

export default Contact;
