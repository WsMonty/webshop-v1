import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { connect } from 'react-redux';
import { deleteFromCart } from '../actions';

const CartPreview = (props) => {
  const query = useStaticQuery(graphql`
    query {
      allDatoCmsPost {
        nodes {
          composer
          title
          locale
          price
        }
      }
    }
  `);
  const data = query.allDatoCmsPost.nodes;

  const findPrice = (work) => {
    const price = data.find((entry) => entry.title === work);
    return price.price;
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.keys(props.cart).map((work) => {
      if (work !== 0) {
        total += findPrice(work) * props.cart[work].counter;
      }
      return '';
    });

    return total;
  };

  return (
    <div className="cart-preview-container">
      <h2 className="cart-preview-upper-title">Shopping Cart</h2>
      {Object.keys(props.cart).map((work, i) => {
        if (work !== 0)
          return (
            <div key={i} className="cart-preview">
              <h1 className="cart-preview-title" key={i}>
                {work}
              </h1>

              <button
                onClick={(e) =>
                  props.deleteFromCart(
                    e.target.previousElementSibling.textContent
                  )
                }
              >
                X
              </button>
              <p>{props.cart[work].counter}</p>
              <p>{findPrice(work) * props.cart[work].counter + '€'}</p>
            </div>
          );
        return '';
      })}
      <div className="cart-preview-total">
        <h4>
          {Object.keys(props.cart).length > 0
            ? 'Total ' + getTotalPrice() + '€'
            : 'No items yet.'}
        </h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    deleteFromCart: (work) => dispatch(deleteFromCart(work)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(CartPreview);
