import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CartPreview from './cartPreview';
import { connect } from 'react-redux';
import {
  handleCartModal,
  deleteFromCart,
  addFromLocaleStorage,
} from '../actions';

const ShoppingCart = (props) => {
  const cartLength = () => {
    let allWorks = 0;
    for (const key in props.cart) {
      allWorks += props.cart[key].counter;
    }
    return allWorks;
  };

  const cartHandler = () => {
    if (props.cartModal === 'hidden') props.handleCartModal('show');
    else {
      props.handleCartModal('close');
      setTimeout(() => {
        props.handleCartModal('hide');
      }, 750);
    }
  };

  return (
    <div className="cart">
      <button className="cart_btn" onClick={cartHandler}>
        <FaShoppingCart className="cart_icon " />
      </button>
      <p className="cart_number">{cartLength()}</p>
      <div className={`cart_popup ${props.cartModal}`}>
        <CartPreview props={props} />
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

const mapDispatchtoProps = (dispatch) => {
  return {
    handleCartModal: (bool) => dispatch(handleCartModal(bool)),
    deleteFromCart: (work) => dispatch(deleteFromCart(work)),
    addFromLocaleStorage: (work) => dispatch(addFromLocaleStorage(work)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ShoppingCart);
