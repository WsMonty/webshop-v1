import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart } from '../actions';

const CartPreview = () => {
  const query = useStaticQuery(graphql`
    query {
      allDatoCmsPost {
        nodes {
          composer
          title
          locale
        }
      }
    }
  `);

  const data = query.allDatoCmsPost.nodes;

  const dispatch = useDispatch();
  const worksInCart = useSelector((state) => state.cart);

  return (
    <div className="cart-preview-container">
      {worksInCart.map((work, i) => {
        return (
          <div key={i} className="cart-preview">
            <h1 key={i}>{work}</h1>
            <button
              onClick={(e) =>
                dispatch(
                  deleteFromCart(
                    e.target.closest('.cart-preview').firstChild.textContent
                  )
                )
              }
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CartPreview;
