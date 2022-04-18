import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CartPreview from './cartPreview';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
  const [cartActive, setCartActive] = useState('hidden');

  const cart = useSelector((state) => state.cart);

  const cartLength = () => {
    let allWorks = 0;
    for (const key in cart) {
      allWorks += cart[key].counter;
    }
    return allWorks;
  };

  const cartHandler = () =>
    cartActive === 'hidden'
      ? setCartActive('cart-active')
      : setCartActive('hidden');

  return (
    <div className="cart">
      <button className="cart-btn" onClick={cartHandler}>
        <FaShoppingCart className="cart-icon " />
      </button>
      <p className="cart-number">{cartLength()}</p>
      <div className={`cart-popup ${cartActive}`}>
        <CartPreview />
      </div>
    </div>
  );
};

export default ShoppingCart;
