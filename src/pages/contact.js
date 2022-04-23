import React from 'react';
import { connect } from 'react-redux';

const Contact = (props) => {
  return <h1>{languages.contact[props.locale]}</h1>;
};

const languages = {
  contact: {
    en: 'Contact',
    de: 'Kontakt',
    'de-LU': 'Kontakt',
    fr: 'Contact',
  },
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    cartModal: state.cartModal,
  };
};

export default connect(mapStateToProps)(Contact);
