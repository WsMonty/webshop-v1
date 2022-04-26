import React from 'react';
import { connect } from 'react-redux';
import languages from '../languages/languages';

const About = (props) => {
  return (
    <div>
      <h1>{languages.about[props.locale]}</h1>
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

export default connect(mapStateToProps)(About);
