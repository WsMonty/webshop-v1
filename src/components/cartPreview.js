import React from 'react';
import { graphql, useStaticQuery, Link, navigate } from 'gatsby';
import languages from '../languages/languages';
import { SHIPPING_COST } from '../globalVariables';

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
    const workPrice = data.find(
      (entry) => entry.title === workTitle[1].title
    ).price;
    return workPrice;
  };

  const getTotalPrice = () => {
    let total = 0;
    let shipping = false;
    Object.entries(props.cart).map((entry) => {
      if (entry[1].buyOption === 'Print') shipping = true;
      total += findPrice(entry) * props.cart[entry[0]].counter;
      return '';
    });

    return shipping ? (total + SHIPPING_COST).toFixed(2) : total.toFixed(2);
  };

  const toPaymentClickHandler = () => {
    navigate(`/payment`);
    props.handleCartModal('close');
  };

  const deleteFromCartHandler = (e) => {
    const work =
      e.target.closest('.cart-preview').firstChild.firstChild.childNodes[1]
        .dataset.title;

    props.deleteFromCart(JSON.parse(work));
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
        {Object.entries(props.cart).map((entry, i) => {
          const work = entry[1];
          return (
            <div key={i} className="cart-preview">
              <div className="cart-preview-content">
                <div className="cart-preview-count-title">
                  <p className="payment_work-number">
                    {props.cart[entry[0]].counter + 'x'}
                  </p>
                  <Link
                    className="cart-preview-title"
                    data-title={JSON.stringify(work)}
                    to={`/works/${work.title
                      .replaceAll(' ', '-')
                      .replaceAll('.', '')
                      .toLowerCase()}`}
                  >
                    {work.title}
                  </Link>
                </div>
                <p className="cart-preview-buy-option">
                  {props.cart[entry[0]].buyOption}
                </p>
                <p>
                  {'Price: ' +
                    (findPrice(entry) * props.cart[entry[0]].counter).toFixed(
                      2
                    ) +
                    '€'}
                </p>
              </div>
              <button
                className="cart-preview-close-work-btn pill-btn-accent"
                onClick={(e) => deleteFromCartHandler(e)}
              >
                {languages.deleteFromCart[props.locale]}
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-preview-footer">
        <h3 className="cart-preview-footer-total">
          {Object.keys(props.cart).length > 0
            ? 'Total ' + getTotalPrice() + '€'
            : 'No items yet.'}
        </h3>
        {Object.keys(props.cart).length > 0 ? (
          <button
            className="cart-preview-payment-link"
            onClick={toPaymentClickHandler}
          >
            {languages.proceedPayment[props.locale]}
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CartPreview;
