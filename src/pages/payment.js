import { Link, useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart, emptyCart } from '../actions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import languages from '../languages/languages';
import { SHIPPING_COST } from '../globalVariables';
import emailjs from 'emailjs-com';

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

  const emailFormSubmit = (e) => {
    e.preventDefault();
    document.querySelector('.paypal_btn').classList.remove('hidden');
  };

  const sentClientEmail = (name) => {
    const clientMail = document.querySelector(
      '.payment_form_email_input'
    ).value;

    const templateParams = {
      to_name: name,
      to_mail: clientMail,
      from_name: 'Gilles',
      message: 'Check this TEST out!',
    };

    emailjs
      .send(
        'service_cqlzhb7',
        'template_hgac8sj',
        templateParams,
        'EEpbrkq5HI3_e9mbo'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
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
      <form className="payment_form" onSubmit={(e) => emailFormSubmit(e)}>
        <label htmlFor="email">Your email (to get your PDFs!</label>
        <input
          className="payment_form_email_input"
          id="email"
          name="email"
          type="email"
          placeholder="your email"
          required
        ></input>
        <button type="submit">Submit</button>
      </form>

      <PayPalScriptProvider
        options={{
          'client-id':
            'AZSSY3UljJBk9qQrc7QpMYmmLn2e2necjjf0580S4D8BKz0c9uVWLyRvrqYi4Lh8ga1ddtcbkNO69IZ7',
          // 'AZuOJhphk2lqHP76TcBJzx9pernNN8M0ZphLh8u04xv8HCLCF-KzP-FKie_mLKYAdLf3N-59ZqRzgQWq',
          currency: 'EUR',
        }}
      >
        <PayPalButtons
          className="paypal_btn hidden"
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
              props.emptyCart();
              sentClientEmail(name);
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
    emptyCart: () => dispatch(emptyCart()),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Payment);
