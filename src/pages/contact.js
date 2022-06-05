import React from 'react';
import { connect } from 'react-redux';
// import languages from '../languages/languages';

const Contact = (props) => {
  return (
    <div className="contact_container">
      <p className="contact_phrase">
        If you have any questions or concerns that are not answered in the FAQs
        <br />
        please contact me directly. I'm happy to help!
      </p>
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
