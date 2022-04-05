import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CartPreview from './cartPreview';

const ShoppingCart = () => {
  const [cartActive, setCartActive] = useState('hidden');

  const cartHandler = () =>
    cartActive === 'hidden'
      ? setCartActive('cart-active')
      : setCartActive('hidden');

  return (
    <div className="cart">
      <button className="cart-btn" onClick={cartHandler}>
        <FaShoppingCart className="cart-icon " />
      </button>
      <div className={`cart-popup ${cartActive}`}>
        <CartPreview />
      </div>
    </div>
  );
};

export default ShoppingCart;
