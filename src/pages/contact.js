import React from 'react';
import { connect } from 'react-redux';
import languages from '../languages/languages';

const Contact = (props) => {
  return (
    <div className="contact_container">
      <p className="contact_phrase">{languages.concerns[props.locale]}</p>
      <h1 className="contact_name">Gilles Grethen</h1>
      <a
        className="contact_information"
        href="mailto:gilles@gillesgrethen.com"
        target="_blank"
        rel="noreferrer"
      >
        gilles@gillesgrethen.com
      </a>
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
