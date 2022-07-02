import { Link, useStaticQuery, graphql, navigate } from 'gatsby';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteFromCart, emptyCart, purchase } from '../actions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import languages from '../languages/languages';
import { SHIPPING_COST } from '../globalVariables';
// import fileLinks from '../languages/fileLinks';
import axios from 'axios';

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

  const [sent, setSent] = useState(false);
  const [text, setText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();

    const purchasedWorks = Object.entries(props.cart).map((work) => {
      const title = work[1].title;
      const price = findPrice(work);
      return { title: title, price: price };
    });

    axios
      .post('https://backend-webshop-v1.herokuapp.com/test', {
        works: purchasedWorks,
        userMail: e.target.childNodes[2].value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

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

  // const emailFormSubmit = (e) => {
  //   e.preventDefault();
  //   document.querySelector('.paypal_btn').classList.remove('hidden');
  // };

  const sentClientEmail = (name) => {
    const clientMail = document.querySelector(
      '.payment_form_email_input'
    ).value;
  };

  const emailCheck = () => {
    if (document.querySelector('.payment_form_email_input').value === '')
      return 'no email';
    else {
      return validateEmail(
        document.querySelector('.payment_form_email_input').value
      )
        ? 'validation'
        : 'email false';
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
      <div className="payment_container">
        <form className="payment_form" onSubmit={(e) => handleSend(e)}>
          <label className="payment_form_email_input_label" htmlFor="email">
            1. Your email to get your PDFs!
          </label>
          <br />
          <input
            className="payment_form_email_input"
            id="email"
            name="email"
            type="text"
            placeholder="your email"
            required
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>

        {!sent ? '' : <h1>Email sent!</h1>}

        <p className="paypal_btn_label">2. Choose your payment method!</p>
        <PayPalScriptProvider
          options={{
            'client-id':
              'AZSSY3UljJBk9qQrc7QpMYmmLn2e2necjjf0580S4D8BKz0c9uVWLyRvrqYi4Lh8ga1ddtcbkNO69IZ7',
            // 'AZuOJhphk2lqHP76TcBJzx9pernNN8M0ZphLh8u04xv8HCLCF-KzP-FKie_mLKYAdLf3N-59ZqRzgQWq',
            currency: 'EUR',
          }}
        >
          <PayPalButtons
            className="paypal_btn"
            style={{ color: 'black' }}
            createOrder={(_, actions) => {
              if (emailCheck() === 'validation') {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: getTotalPrice(),
                      },
                    },
                  ],
                });
              }
              if (emailCheck() === 'email false')
                alert('The email you entered is not valid!');
              if (emailCheck() === 'no email')
                alert(
                  'You have to enter your email in order to get your PDFs!'
                );
            }}
            onApprove={(_, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                const works = Object.keys(props.cart).map(
                  (work) => props.cart[work].title
                );
                props.purchase(works);
                sentClientEmail(name);

                navigate(`/downloadPdf`);
                // props.emptyCart();
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    purchased: state.purchased,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    deleteFromCart: (work) => dispatch(deleteFromCart(work)),
    emptyCart: () => dispatch(emptyCart()),
    purchase: (works) => dispatch(purchase(works)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Payment);
