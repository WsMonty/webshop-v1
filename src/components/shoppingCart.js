import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CartPreview from './cartPreview';
import { connect } from 'react-redux';
import { handleCartModal } from '../actions';

const ShoppingCart = (props) => {
  const cartLength = () => {
    let allWorks = 0;
    for (const key in props.cart) {
      allWorks += props.cart[key].counter;
    }
    return allWorks;
  };

  const cartHandler = () => {
    props.cartModal === 'hidden'
      ? props.handleCartModal('show')
      : props.handleCartModal('close');
  };

  return (
    <div className="cart">
      <button className="cart-btn" onClick={cartHandler}>
        <FaShoppingCart className="cart-icon " />
      </button>
      <p className="cart-number">{cartLength()}</p>
      <div className={`cart-popup ${props.cartModal}`}>
        <CartPreview />
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
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ShoppingCart);
