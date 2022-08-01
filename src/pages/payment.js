import { Link, useStaticQuery, graphql, navigate } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import {
  deleteFromCart,
  emptyCart,
  purchase,
  closeCartModal,
} from '../actions';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import languages from '../languages/languages';
import { SHIPPING_COST } from '../globalVariables';
// import fileLinks from '../languages/fileLinks';
import axios from 'axios';

const Payment = (props) => {
  const { cart, locale, purchase, emptyCart, closeCartModal } = props;

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
      allDatoCmsFileLink(filter: { locale: { eq: "en" } }) {
        nodes {
          name
          link
        }
      }
    }
  `);
  const data = query.allDatoCmsPost.nodes;
  const fileLinks = query.allDatoCmsFileLink.nodes;

  const handleSend = () => {
    emptyCart();
    closeCartModal();

    const purchasedWorks = Object.entries(cart).map((work) => {
      const title = work[1].title;
      const price = findPrice(work);
      const link = fileLinks.filter((link) => link.name === title)[0].link;
      return { title: title, price: price, link: link };
    });

    axios
      .post('https://backend-webshop-v1.herokuapp.com/sendClientMail', {
        // .post('http://localhost:3000/sendClientMail', {
        works: purchasedWorks,
        userMail: document.querySelector('.payment_form_email_input').value,
      })
      .then((res) => {
        if (res.status === 200) return;
      })
      .catch((err) => console.log(err));
    const works = purchasedWorks.map((work) => work.title);
    purchase(works);
    navigate(`/downloadPdf`);
  };

  const findPrice = (workTitle) => {
    const workPrice = data.find(
      (entry) => entry.title === workTitle[1].title
    ).price;
    return workPrice;
  };

  const ShowSpinner = () => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        {isPending ? (
          <div className="spinner_content">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="spinner_text">{languages.paymentLoading[locale]}</p>
          </div>
        ) : null}
      </>
    );
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

  const deleteFromCartHandler = (e) => {
    const work =
      e.target.closest('.payment_work').firstChild.firstChild.childNodes[0]
        .dataset.title;
    props.deleteFromCart(JSON.parse(work));
  };

  // const emailFormSubmit = (e) => {
  //   e.preventDefault();
  //   document.querySelector('.paypal_btn').classList.remove('hidden');
  // };

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
      <h1 className="payment_title">{languages.shoppingCart[locale]}</h1>
      <div className="payment_content">
        {Object.entries(cart).map((entry, i) => {
          const work = entry[1];
          if (work !== 0)
            return (
              <div key={'work-nr' + i + 1} className="payment_work">
                <div className="payment_work_content">
                  <div className="payment_work_title">
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
                  <p>{cart[entry[0]].buyOption}</p>
                  <p>{findPrice(entry) * cart[entry[0]].counter + '€'}</p>
                </div>
                <button
                  className="payment_work_delete_btn pill_btn_accent"
                  onClick={(e) => deleteFromCartHandler(e)}
                >
                  {languages.deleteFromCart[locale]}
                </button>
              </div>
            );
          return '';
        })}
        <h3 className="payment_total_price">
          {Object.keys(cart).length > 0
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
            type="email"
            placeholder="your email"
            required
          ></input>
        </form>

        <p className="paypal_btn_label">2. Choose your payment method!</p>
        <PayPalScriptProvider
          options={{
            'client-id':
              'AZSSY3UljJBk9qQrc7QpMYmmLn2e2necjjf0580S4D8BKz0c9uVWLyRvrqYi4Lh8ga1ddtcbkNO69IZ7',
            currency: 'EUR',
          }}
        >
          <ShowSpinner />
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
                // const name = details.payer.name.given_name;
                const works = Object.keys(cart).map((work) => cart[work].title);
                purchase(works);
                handleSend();
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
    closeCartModal: () => dispatch(closeCartModal()),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Payment);
