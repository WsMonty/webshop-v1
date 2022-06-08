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
      e.target.closest('.cart_preview').firstChild.firstChild.childNodes[1]
        .dataset.title;

    props.deleteFromCart(JSON.parse(work));
  };

  const closeCardHandler = () => {
    props.handleCartModal('close');
    setTimeout(() => {
      props.handleCartModal('hide');
    }, 750);
  };

  return (
    <div className="cart_preview_container">
      <h2 className="cart_preview_upper_title">
        {languages.shoppingCart[props.locale]}
      </h2>
      <button className="cart_preview_close_btn" onClick={closeCardHandler}>
        {languages.close[props.locale]}
      </button>
      <hr />
      <div className="cart_preview_works">
        {Object.entries(props.cart).map((entry, i, arr) => {
          const work = entry[1];
          return (
            <div key={i} className="cart_preview">
              <div className="cart_preview_content">
                <div className="cart_preview_count_title">
                  <p className="payment_work_number">
                    {props.cart[entry[0]].counter + 'x'}
                  </p>
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
                className="cart_preview_close_work_btn pill_btn_accent"
                onClick={(e) => deleteFromCartHandler(e)}
              >
                {languages.deleteFromCart[props.locale]}
              </button>
              {i !== arr.length - 1 ? <hr className="cart_preview_hr" /> : ''}
            </div>
          );
        })}
      </div>
      {Object.entries(props.cart).length === 0 ? '' : <hr />}
      <div className="cart_preview_footer">
        <h3 className="cart_preview_footer_total">
          {Object.keys(props.cart).length > 0
            ? 'Total ' + getTotalPrice() + '€'
            : 'No items yet.'}
        </h3>
        {Object.keys(props.cart).length > 0 ? (
          <button
            className="cart_preview_payment_link"
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
