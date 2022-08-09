import React from 'react';
import languages from '../languages/languages';
import { Link, navigate } from 'gatsby';
import scrollToTop from '../helpers/scrollToTop';
import { GatsbyImage } from 'gatsby-plugin-image';

const SingleWork = ({ props, product, query, i }) => {
  const { locale } = props;
  // Go to composer's site
  const composerClickHandler = (e) => {
    const composerUrl = e.target
      .closest('.work_composer_moreInfo')
      .dataset.composer.toLowerCase()
      .replace(' ', '-');
    navigate(`/composers/${composerUrl}`);
  };

  // Add work to cart when only PDFs are sold
  const addToCartClickHandlerNoShipping = (e) => {
    const workOptionsEl = e.target.closest('.work_options');

    const workTitle = workOptionsEl.dataset.key;
    const work = {
      title: workTitle,
    };
    const currentWorkEl = document.querySelector(`[data-title="${workTitle}"]`);

    if (Object.keys(props.cart).length === 0) {
      props.addToCart(work);
      props.handleCartModal('show');
      workOptionsEl.style.display = 'none';
      currentWorkEl.style.display = 'flex';
    } else {
      const checkIsAlreadyInCart = Object.keys(props.cart).some((work) =>
        work.includes(workTitle)
      );

      if (checkIsAlreadyInCart) {
        const alreadyInCartEl =
          e.target.closest('.work_options').nextSibling.nextSibling;
        workOptionsEl.style.display = 'none';
        alreadyInCartEl.style.display = 'flex';
        setTimeout(() => {
          alreadyInCartEl.style.display = 'none';
          currentWorkEl.style.display = 'flex';
        }, 1500);
      } else {
        props.addToCart(work);
        props.handleCartModal('show');
        workOptionsEl.style.display = 'none';
        currentWorkEl.style.display = 'flex';
      }
    }
    scrollToTop();
  };

  // show more information card
  const showOptionsHandler = (e) => {
    const work = e.target.closest('.work');
    work.style.display = 'none';
    const options = document.querySelector(
      `[data-title="${e.target.closest('.work').dataset.title}_work"]`
    );
    const expandEl = e.target.closest('.work_card_container').childNodes[2];

    expandEl.classList.remove('hidden');
    setTimeout(() => {
      options.style.display = 'flex';
      expandEl.classList.add('hidden');
    }, 500);
  };

  // Close more information card
  const leaveOptionsHandler = (e) => {
    const workOptionsEl = e.target.closest('.work_options');
    workOptionsEl.style.display = 'none';
    document.querySelector(
      `[data-title="${workOptionsEl.dataset.key}"]`
    ).style.display = 'flex';
  };

  const isInCart = () => {
    const checkIfInCart = Object.keys(props.cart).some((work) =>
      work.includes(product.node.title)
    );

    return checkIfInCart;
  };

  // Check if more composers and therefore too big for card
  const checkLengthUnder20Char = (str) => {
    return str.split('').length < 20 ? (
      <span>{str}</span>
    ) : (
      <span style={{ fontSize: '1em' }}>{str}</span>
    );
  };

  const checkLengthTitleUnder20Char = (str) => {
    return str.split('').length > 30 ? (
      <h2 style={{ margin: 0, fontSize: '1em' }}>{str}</h2>
    ) : (
      <h2 className="work_title">{str}</h2>
    );
  };

  return (
    <div key={`work-${i}`} className="work_card_container">
      <div
        key={`work_nr${i + 1}`}
        className="work"
        data-title={product.node.title}
      >
        <Link
          className="work_image_container"
          to={`/works/${product.node.title
            .replaceAll(' ', '-')
            .replaceAll('.', '')
            .replaceAll("'", '-')
            .toLowerCase()}`}
        >
          <GatsbyImage
            className="work_image"
            image={product.node.previewImage.gatsbyImageData}
            alt={product.node.title}
          />
          {/* <img
            className="work_image"
            src={product.node.previewImage.url}
            alt={`Preview for ${product.node.title}`}
          /> */}
        </Link>
        <div className="work_content_container">
          {checkLengthTitleUnder20Char(product.node.title)}

          <p className="work_composer">
            {checkLengthUnder20Char(product.node.composer)}
          </p>
          {query.allDatoCmsComposer.edges
            .map((comp) => comp.node.name)
            .indexOf(product.node.composer) >= 0 ? (
            <button
              className="work_composer_moreInfo"
              data-composer={product.node.composer}
              onClick={(e) => composerClickHandler(e)}
            >
              {' '}
              <span>more info on this composer</span>{' '}
            </button>
          ) : (
            ''
          )}

          <p className="work_category">{product.node.descriptionTextShort}</p>
        </div>
        <div className="work_price_btn_container">
          <p className="work_price">{product.node.price}€</p>

          <button
            className="addToCart_btn"
            onClick={(e) => showOptionsHandler(e)}
          >
            {languages.moreInformation[locale]}
          </button>
        </div>
      </div>

      <div
        className="work_options"
        data-title={`${product.node.title}_work`}
        data-key={product.node.title}
        data-price={product.node.price}
      >
        <h3 className="work_options_title">{product.node.title}</h3>
        <p className="work_options_description_short">
          {product.node.descriptionTextShort}
        </p>
        <p className="work_options_specification">
          {product.node.descriptionTextShort === 'Lead Sheet'
            ? languages.specifications_leadSheet[locale]
            : languages.specifications_big[locale]}
        </p>
        <p className="work_options_price">{product.node.price}€</p>
        <button
          className="work_options_leave_btn pill_btn_inverted"
          onClick={(e) => leaveOptionsHandler(e)}
        >
          {languages.goBack[locale]}
        </button>

        {isInCart() ? (
          <p className="work_options_isCartInfo">Is already in cart</p>
        ) : (
          <button
            className="work_options_submit_btn pill_btn_inverted"
            onClick={(e) => addToCartClickHandlerNoShipping(e)}
          >
            {languages.addToCart[locale]}
          </button>
        )}
      </div>
      <div className="work_expand_animation hidden"></div>
      <div className="work_alreadyInCart">
        <p>This is already in your shopping cart 😀</p>
      </div>
    </div>
  );
};

export default SingleWork;

///////////// Only needed if printing and shipping scores as well
// const addToCartClickHandler = (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const formValue = Object.fromEntries(formData).options;
//   const workTitle = e.target.closest('.work_options').dataset.title;
//   const work = {
//     title: workTitle.slice(0, workTitle.indexOf('_')),
//     options: formValue,
//   };

//   props.addToCart(work);
//   props.handleCartModal('show');
//   // e.target.closest('.addToCart_dialog').close();
//   e.target.closest('.work_options').style.display = 'none';

//   document.querySelector(
//     `[data-title="${workTitle.slice(0, workTitle.indexOf('_'))}"]`
//   ).style.display = 'flex';
// };

// const changePrice = (e) => {
//   const priceEl = e.target
//     .closest('.work_options')
//     .querySelector('.work_options_price');
//   const price = e.target.closest('.work_options').dataset.price;

//   e.target.value === 'Print'
//     ? (priceEl.textContent = +price + SHIPPING_COST + '€')
//     : (priceEl.textContent = price + '€');
// };

/* In Case of printing and shipping!!! */

/* <form
                className="addToCart_dialog_form"
                onSubmit={(e) => addToCartClickHandler(e)}
              >
                <h2 className="addToCart_dialog_form_title">
                  {product.node.title}
                </h2>
                <input
                  type="radio"
                  id="print"
                  value="Print"
                  name="options"
                  required
                  onClick={changePrice}
                />
                <label htmlFor="print">Print</label>
                <br />
                <input
                  type="radio"
                  id="pdf"
                  value="PDF"
                  name="options"
                  onClick={changePrice}
                />
                <label htmlFor="print">PDF</label>
                <br />
                <p className="work_options_price">{product.node.price}€</p>
                <button
                  className="work_options_submit_btn pill_btn_inverted"
                  type="submit"
                >
                  {languages.addToCart[locale]}
                </button>
              </form> */
