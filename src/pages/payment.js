import { Link, useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../actions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import languages from '../languages/languages';
import { SHIPPING_COST } from '../globalVariables';

const Payment = (props) => {
  const query = useStaticQuery(graphql`
    query {
      allDatoCmsPost {
        nodes {
          composer
          title
          locale
          price
          previewImage {
            url
          }
        }
      }
    }
  `);
  const data = query.allDatoCmsPost.nodes;

  // const findWork = (workTitle) => {
  //   const work = data.find((entry) => entry.title === workTitle);
  //   return work;
  // };

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

  const deleteFromCartHandler = (e) => {
    const work =
      e.target.closest('.payment_work').firstChild.firstChild.childNodes[1]
        .dataset.title;
    props.deleteFromCart(JSON.parse(work));
  };

  return (
    <div className="payment">
      <h1 className="payment_title">{languages.shoppingCart[props.locale]}</h1>
      <div className="payment_content">
        {Object.entries(props.cart).map((entry, i) => {
          const work = entry[1];
          if (work !== 0)
            return (
              <div key={'work-nr' + i + 1} className="payment_work">
                <div className="payment_work_content">
                  <div className="payment_work_title">
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
                  <p>{props.cart[entry[0]].buyOption}</p>
                  <p>{findPrice(entry) * props.cart[entry[0]].counter + '€'}</p>
                </div>
                <button
                  className="payment_work_delete_btn pill_btn_accent"
                  onClick={(e) => deleteFromCartHandler(e)}
                >
                  {languages.deleteFromCart[props.locale]}
                </button>
              </div>
            );
          return '';
        })}
        <h3 className="payment_total_price">
          {Object.keys(props.cart).length > 0
            ? 'Total: ' + getTotalPrice() + '€'
            : 'No items yet.'}
        </h3>
      </div>

      <PayPalScriptProvider
        options={{
          'client-id':
            'AZuOJhphk2lqHP76TcBJzx9pernNN8M0ZphLh8u04xv8HCLCF-KzP-FKie_mLKYAdLf3N-59ZqRzgQWq',
          currency: 'EUR',
        }}
      >
        <PayPalButtons
          style={{ color: 'black' }}
          createOrder={(_, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: getTotalPrice(),
                  },
                },
              ],
            });
          }}
          onApprove={(_, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              alert(`Transaction completed by ${name}`);
            });
          }}
        />
      </PayPalScriptProvider>
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

export default connect(mapStateToProps, mapDispatchtoProps)(Payment);
