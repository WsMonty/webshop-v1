import React from 'react';
import { graphql, useStaticQuery, Link, navigate } from 'gatsby';
import languages from '../languages/languages';
import { SHIPPING_COST } from '../globalVariables';
import { store } from '../store';
import { hideCartModal } from '../reducers/cartModal';

const CartPreview = ({ props }) => {
  const { cart, closeCartModal, deleteFromCart, locale } = props;

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
    Object.entries(cart).map((entry) => {
      if (entry[1].buyOption === 'Print') shipping = true;
      total += findPrice(entry) * cart[entry[0]].counter;
      return '';
    });

    return shipping ? (total + SHIPPING_COST).toFixed(2) : total.toFixed(2);
  };

  const toPaymentClickHandler = () => {
    store.dispatch(closeCartModal());
    setTimeout(() => {
      store.dispatch(hideCartModal());
    }, 750);
    navigate(`/payment`);
  };

  const deleteFromCartHandler = (e) => {
    const work =
      e.target.closest('.cart_preview').firstChild.firstChild.childNodes[0]
        .dataset.title;

    store.dispatch(deleteFromCart(JSON.parse(work)));
  };

  const closeCardHandler = () => {
    store.dispatch(closeCartModal());
    setTimeout(() => {
      store.dispatch(hideCartModal());
    }, 750);
  };

  return (
    <div className="cart_preview_container">
      <h2 className="cart_preview_upper_title">
        {languages.shoppingCart[locale]}
      </h2>
      <button
        className="cart_preview_close_btn pill_btn_inverted"
        onClick={closeCardHandler}
      >
        {languages.close[locale]}
      </button>
      <hr />
      <div className="cart_preview_works">
        {Object.entries(cart).map((entry, i, arr) => {
          const work = entry[1];
          return (
            <div key={i} className="cart_preview">
              <div className="cart_preview_content">
                <div className="cart_preview_count_title">
                  {/* <p className="payment_work_number">
                    {cart[entry[0]].counter + 'x'}
                  </p> */}
                  <Link
                    className="cart_preview_title"
                    data-title={JSON.stringify(work)}
                    to={`/works/${work.title
                      .replaceAll(' ', '-')
                      .replaceAll('.', '')
                      .toLowerCase()}`}
                  >
                    {work.title}
                  </Link>
                </div>
                <p className="cart_preview_buy_option">
                  {cart[entry[0]].buyOption}
                </p>
                <p>
                  {'Price: ' +
                    (findPrice(entry) * cart[entry[0]].counter).toFixed(2) +
                    '€'}
                </p>
              </div>
              <button
                className="cart_preview_close_work_btn pill_btn_accent"
                onClick={(e) => deleteFromCartHandler(e)}
              >
                {languages.deleteFromCart[locale]}
              </button>
              {i !== arr.length - 1 ? <hr className="cart_preview_hr" /> : ''}
            </div>
          );
        })}
      </div>
      {Object.entries(cart).length === 0 ? '' : <hr />}
      <div className="cart_preview_footer">
        <h3 className="cart_preview_footer_total">
          {Object.keys(cart).length > 0
            ? 'Total ' + getTotalPrice() + '€'
            : 'No items yet.'}
        </h3>
        {Object.keys(cart).length > 0 ? (
          <button
            className="cart_preview_payment_link pill_btn_inverted"
            onClick={toPaymentClickHandler}
          >
            {languages.proceedPayment[locale]}
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CartPreview;
