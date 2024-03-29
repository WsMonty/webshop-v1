import { Link, useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { useSelector } from 'react-redux';
// import {
//   PayPalScriptProvider,
//   PayPalButtons,
//   usePayPalScriptReducer,
// } from '@paypal/react-paypal-js';
import languages from '../languages/languages';
import { SHIPPING_COST } from '../globalVariables';
// import axios from 'axios';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { selectCart, selectLocale, store } from '../store.js';
import { deleteFromCart } from '../reducers/cart';
// import { closeCartModal } from '../reducers/cartModal';
// import { purchase } from '../reducers/purchased';

const Payment = () => {
  const locale = useSelector(selectLocale).locale;
  const cart = useSelector(selectCart).cart;

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
  // const fileLinks = query.allDatoCmsFileLink.nodes;

  // const handleSend = () => {
  //   store.dispatch(emptyCart());
  //   store.dispatch(closeCartModal());

  //   const purchasedWorks = Object.entries(cart).map((work) => {
  //     const title = work[1].title;
  //     const price = findPrice(work);
  //     const link = fileLinks.filter((link) => link.name === title)[0].link;
  //     return { title: title, price: price, link: link };
  //   });

  //   axios
  //     .post('https://backend-webshop-v1.herokuapp.com/sendClientMail', {
  //       works: purchasedWorks,
  //       userMail: document.querySelector('.payment_form_email_input').value,
  //     })
  //     .then((res) => {
  //       if (res.status === 200) return;
  //     })
  //     .catch((err) => console.log(err));
  //   const works = purchasedWorks.map((work) => work.title);
  //   store.dispatch(purchase(works));
  //   navigate(`/downloadPdf`);
  // };

  const findPrice = (workTitle) => {
    const workPrice = data.find(
      (entry) => entry.title === workTitle[1].title
    ).price;
    return workPrice;
  };

  // const ShowSpinner = () => {
  //   const [{ isPending }] = usePayPalScriptReducer();

  //   return (
  //     <>
  //       {isPending ? (
  //         <div className="spinner_content">
  //           <div className="lds-roller">
  //             <div></div>
  //             <div></div>
  //             <div></div>
  //             <div></div>
  //             <div></div>
  //             <div></div>
  //             <div></div>
  //             <div></div>
  //           </div>
  //           <p className="spinner_text">{languages.paymentLoading[locale]}</p>
  //         </div>
  //       ) : null}
  //     </>
  //   );
  // };

  const getTotalPrice = () => {
    let total = 0;
    let shipping = false;
    Object.entries(cart).map((entry) => {
      if (entry[1].buyOption === 'Print') shipping = true;
      total += findPrice(entry) * cart[entry[0]].counter;
      return '';
    });

    return shipping
      ? (total + SHIPPING_COST).toFixed(2).replaceAll('.', ',')
      : total.toFixed(2).replaceAll('.', ',');
  };

  const deleteFromCartHandler = (e) => {
    const work =
      e.target.closest('.payment_work').firstChild.firstChild.childNodes[0]
        .dataset.title;
    store.dispatch(deleteFromCart(JSON.parse(work)));
  };

  // // const emailFormSubmit = (e) => {
  // //   e.preventDefault();
  // //   document.querySelector('.paypal_btn').classList.remove('hidden');
  // // };

  // const emailCheck = () => {
  //   if (document.querySelector('.payment_form_email_input').value === '')
  //     return 'no email';
  //   else {
  //     return validateEmail(
  //       document.querySelector('.payment_form_email_input').value
  //     )
  //       ? 'validation'
  //       : 'email false';
  //   }
  // };

  // const validateEmail = (email) => {
  //   return String(email)
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  // };

  return (
    <div className="payment">
      <GatsbySeo
        title="Grethen Edition | Payment"
        language="en"
        nofollow={true}
      />
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
                  <p>
                    {(findPrice(entry) * cart[entry[0]].counter)
                      .toFixed(2)
                      .replaceAll('.', ',') + '€'}
                  </p>
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
          {Object.keys(cart).length > 0 ? (
            <>
              {'Total ' + getTotalPrice() + '€'}
              <br />
              <span>{languages.priceVAT[locale]}</span>
            </>
          ) : (
            'No items yet.'
          )}
        </h3>
      </div>

      <h2 className="payment_message">
        We are very sorry, the payment system is down! Please send a mail with
        your order to{' '}
        <a href="mailto:gilles@gillesgrethen.com">gilles@gillesgrethen.com</a>!
        Or get in touch via social media:
      </h2>
      <div className="payment_socials">
        <a
          href="https://instagram.com/gilles_grethen_"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://facebook.com/gillesgrethen"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
      </div>
      {/* <div className="payment_container">
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
              'AZuOJhphk2lqHP76TcBJzx9pernNN8M0ZphLh8u04xv8HCLCF-KzP-FKie_mLKYAdLf3N-59ZqRzgQWq',
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
      </div> */}
    </div>
  );
};

export default Payment;
