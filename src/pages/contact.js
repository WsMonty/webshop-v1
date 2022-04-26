import React from 'react';
import { connect } from 'react-redux';
import languages from '../languages/languages';

const Contact = (props) => {
  return <h1>{languages.contact[props.locale]}</h1>;
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    cartModal: state.cartModal,
  };
};

export default connect(mapStateToProps)(Contact);
