import React from 'react';
import { graphql, useStaticQuery, Link, navigate } from 'gatsby';
import languages from '../languages/languages';

const CartPreview = ({ props }) => {
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
      <div className="cart-preview-works">
        <h2 className="cart-preview-upper-title">
          {languages.shoppingCart[props.locale]}
        </h2>
        <button
          className="cart-preview-close-btn"
          onClick={() => props.handleCartModal('close')}
        >
          {languages.close[props.locale]}
        </button>
        {Object.keys(props.cart).map((work, i) => {
          if (work !== 0)
            return (
              <div key={i} className="cart-preview">
                <div className="cart-preview-content">
                  <div className="cart-preview-count-title">
                    <p className="payment_work-number">
                      {props.cart[work].counter + 'x'}
                    </p>
                    <Link
                      className="cart-preview-title"
                      to={`/works/${work
                        .replaceAll(' ', '-')
                        .replaceAll('.', '')
                        .toLowerCase()}`}
                    >
                      {work}
                    </Link>
                  </div>
                  <p>
                    {'Price: ' +
                      findPrice(work) * props.cart[work].counter +
                      '€'}
                  </p>
                </div>
                <button
                  className="cart-preview-close-work-btn pill-btn-accent"
                  onClick={(e) =>
                    props.deleteFromCart(
                      e.target.closest('.cart-preview').firstChild.firstChild
                        .childNodes[1].textContent
                    )
                  }
                >
                  {languages.deleteFromCart[props.locale]}
                </button>
              </div>
            );
          return '';
        })}
      </div>
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
          {languages.proceedPayment[props.locale]}
        </button>
      </div>
    </div>
  );
};

export default CartPreview;
