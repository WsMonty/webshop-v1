import { Link, useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../actions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

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

  const findWork = (workTitle) => {
    const work = data.find((entry) => entry.title === workTitle);
    return work;
  };

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

  return (
    <div className="payment">
      <h1 className="payment_title">Shopping Cart</h1>
      <div className="payment_content">
        {Object.keys(props.cart).map((work, i) => {
          const workData = findWork(work);
          if (work !== 0)
            return (
              <div className="payment_work">
                <div className="payment_work-title">
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
                <p>{workData.composer}</p>
                <p>{workData.price * props.cart[work].counter + '€'}</p>
              </div>
            );
          return '';
        })}
        <h3 className="payment_total-price">
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
          createOrder={(data, actions) => {
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
          onApprove={(data, actions) => {
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
