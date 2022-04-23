import React from 'react';
import { connect } from 'react-redux';

const About = (props) => {
  return (
    <div>
      <h1>{languages.about[props.locale]}</h1>
    </div>
  );
};

const languages = {
  about: {
    en: 'About',
    de: 'Über',
    'de-LU': 'Iwwer',
    fr: 'Infos',
  },
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    cartModal: state.cartModal,
  };
};

export default connect(mapStateToProps)(About);
