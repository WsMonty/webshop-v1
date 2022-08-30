import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CartPreview from './cartPreview';
import { useSelector } from 'react-redux';
import {
  showCartModal,
  closeCartModal,
  hideCartModal,
} from '../reducers/cartModal';
import { deleteFromCart } from '../reducers/cart';
import { selectCart, selectCartModal, selectLocale, store } from '../store';

const ShoppingCart = () => {
  const cart = useSelector(selectCart).cart;
  const locale = useSelector(selectLocale).locale;
  const cartModal = useSelector(selectCartModal).value;

  const cartHandler = () => {
    if (cartModal === 'hidden') store.dispatch(showCartModal());
    else {
      store.dispatch(closeCartModal());
      setTimeout(() => {
        store.dispatch(hideCartModal());
      }, 750);
    }
  };

  return (
    <div className="cart">
      <button
        className="cart_btn"
        onClick={cartHandler}
        aria-label="Shopping Cart"
      >
        <FaShoppingCart className="cart_icon " />
      </button>
      {Object.keys(cart).length === 0 ? (
        ''
      ) : (
        <p className="cart_number">{Object.keys(cart).length}</p>
      )}
      <div className={`cart_popup ${cartModal}`}>
        <CartPreview
          props={{
            closeCartModal,
            cart,
            deleteFromCart,
            locale,
          }}
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
