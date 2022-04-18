import React from 'react';
import { graphql, useStaticQuery, Link, navigate } from 'gatsby';
import { connect } from 'react-redux';
import { deleteFromCart, handleCartModal } from '../actions';

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

  const findPrice = (workTitle) => {
    const price = data.find((entry) => entry.title === workTitle);
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

  const toPaymentClickHandler = () => {
    navigate(`/payment`);
    props.handleCartModal('close');
  };

  return (
    <div className="cart-preview-container">
      <h2 className="cart-preview-upper-title">Shopping Cart</h2>
      <button
        className="cart-preview-close-btn"
        onClick={() => props.handleCartModal('close')}
      >
        Close
      </button>
      {Object.keys(props.cart).map((work, i) => {
        if (work !== 0)
          return (
            <div key={i} className="cart-preview">
              <div className="cart-preview-content">
                <Link
                  className="cart-preview-title"
                  to={`/works/${work
                    .replaceAll(' ', '-')
                    .replaceAll('.', '')
                    .toLowerCase()}`}
                >
                  {work}
                </Link>
                <p>{props.cart[work].counter + 'x in Cart'}</p>
                <p>
                  {'Price: ' + findPrice(work) * props.cart[work].counter + '€'}
                </p>
              </div>
              <button
                className="cart-preview-close-work-btn pill-btn-accent"
                onClick={(e) =>
                  props.deleteFromCart(
                    e.target.closest('.cart-preview').childNodes[0].firstChild
                      .textContent
                  )
                }
              >
                Delete from cart
              </button>
            </div>
          );
        return '';
      })}
      <div className="cart-preview-footer">
        <h3 className="cart-preview-footer-total">
          {Object.keys(props.cart).length > 0
            ? 'Total ' + getTotalPrice() + '€'
            : 'No items yet.'}
        </h3>
        <button
          className="cart-preview-payment-link"
          onClick={toPaymentClickHandler}
        >
          Proceed to Payment
        </button>
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
    handleCartModal: (bool) => dispatch(handleCartModal(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(CartPreview);
