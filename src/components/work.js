import React from 'react';
import { useStaticQuery, graphql, Link, navigate } from 'gatsby';
import sortByDate from '../helpers/sortByDate.js';
import { connect } from 'react-redux';
import { addToCart, handleCartModal } from '../actions/index.js';
import languages from '../languages/languages';
import { SHIPPING_COST } from '../globalVariables';

const Work = (props) => {
  const query = useStaticQuery(graphql`
    {
      allDatoCmsPost {
        edges {
          node {
            composer
            title
            descriptionTextShort
            previewImage {
              url
            }
            locale
            date
            price
          }
        }
      }
    }
  `);
  const data = query.allDatoCmsPost.edges;
  const sortedData = sortByDate(data);

  const composerClickHandler = (e) => {
    navigate(
      `/composers/${e.target.textContent.toLowerCase().replace(' ', '-')}`
    );
  };

  const addToCartClickHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValue = Object.fromEntries(formData).options;
    const workTitle = e.target.closest('.work_options').dataset.title;
    const work = {
      title: workTitle.slice(0, workTitle.indexOf('_')),
      options: formValue,
    };

    props.addToCart(work);
    props.handleCartModal('show');
    // e.target.closest('.addToCart_dialog').close();
    e.target.closest('.work_options').style.display = 'none';

    document.querySelector(
      `[data-title="${workTitle.slice(0, workTitle.indexOf('_'))}"]`
    ).style.display = 'flex';
  };

  const showOptionsHandler = (e) => {
    const work = e.target.closest('.work');
    work.style.display = 'none';
    const options = document.querySelector(
      `[data-title="${e.target.closest('.work').dataset.title}_work"]`
    );
    const expandEl = e.target.closest('.work_cards-container').childNodes[2];

    expandEl.classList.remove('hidden');
    setTimeout(() => {
      options.style.display = 'flex';
      expandEl.classList.add('hidden');
    }, 500);
  };

  const leaveOptionsHandler = (e) => {
    const workOptionsEl = e.target.closest('.work_options');
    workOptionsEl.style.display = 'none';
    document.querySelector(
      `[data-title="${workOptionsEl.dataset.key}"]`
    ).style.display = 'flex';
  };

  const changePrice = (e) => {
    const priceEl = e.target
      .closest('.work_options')
      .querySelector('.work_options_price');
    const price = e.target.closest('.work_options').dataset.price;

    e.target.value === 'Print'
      ? (priceEl.textContent = +price + SHIPPING_COST + '€')
      : (priceEl.textContent = price + '€');
  };

  return (
    <div className="work_works">
      {sortedData.map((product, i) => {
        if (product.node.locale !== props.locale) return '';
        return (
          <div key={`work-${i}`} className="work_cards-container">
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
                <img
                  className="work_image"
                  src={product.node.previewImage.url}
                  alt={`Preview for ${product.node.title}`}
                />
              </Link>
              <div className="work_content_container">
                <h2 className="work_title">{product.node.title}</h2>
                <button
                  className="work_composer"
                  onClick={(e) => composerClickHandler(e)}
                >
                  <span>{product.node.composer}</span>
                </button>
                <button className="work_category">
                  <p className="work_description_short">
                    {product.node.descriptionTextShort}
                  </p>
                </button>
              </div>
              <div className="work_price_btn_container">
                <p className="work_price">{product.node.price}€</p>

                <button
                  className="addToCart-btn"
                  onClick={(e) => showOptionsHandler(e)}
                >
                  {languages.addToCart[props.locale]}
                </button>
              </div>
            </div>

            <div
              className="work_options"
              data-title={`${product.node.title}_work`}
              data-key={product.node.title}
              data-price={product.node.price}
            >
              <button
                className="work_options_leave-btn pill-btn-inverted"
                onClick={(e) => leaveOptionsHandler(e)}
              >
                Go Back
              </button>
              <form
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
                  className="work_options_submit_btn pill-btn-inverted"
                  type="submit"
                >
                  {languages.addToCart[props.locale]}
                </button>
              </form>
            </div>
            <div className="work_expand_animation hidden"></div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    cartModal: state.cartModal,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addToCart: (work) => dispatch(addToCart(work)),
    handleCartModal: (bool) => dispatch(handleCartModal(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Work);
