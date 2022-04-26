import React from 'react';
import { useStaticQuery, graphql, Link, navigate } from 'gatsby';
import sortByDate from '../helpers/sortByDate.js';
import { connect } from 'react-redux';
import { addToCart, handleCartModal } from '../actions/index.js';
import languages from '../languages/languages';

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
    const work = {
      title: e.target.closest('.work').childNodes[1].firstChild.textContent,
      options: formValue,
    };
    props.addToCart(work);
    props.handleCartModal('show');
    e.target.closest('.addToCart_dialog').close();
  };

  return (
    <div className="work_works">
      {sortedData.map((product, i) => {
        if (product.node.locale !== props.locale) return '';
        return (
          <div key={`work_nr${i + 1}`} className="work">
            <Link
              className="work_image_container"
              to={`/works/${product.node.title
                .replaceAll(' ', '-')
                .replaceAll('.', '')
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
            <p className="work_price">{product.node.price}€</p>
            <dialog className="addToCart_dialog">
              <button
                className="cart-preview-close-btn"
                onClick={(e) => e.target.closest('.addToCart_dialog').close()}
              >
                Close
              </button>
              <div className="addToCart_dialog_text">
                <h3>{product.node.title}</h3>
                <p>
                  Here are the options on how you want to get your scores!
                  <br />
                  If you select print, shipping cost will be added to the total.
                </p>
              </div>

              <form
                className="addToCart_dialog_form"
                onSubmit={(e) => addToCartClickHandler(e)}
              >
                <input
                  type="radio"
                  id="print"
                  value="Print"
                  name="options"
                  required
                />
                <label htmlFor="print">Print</label>
                <br />
                <input type="radio" id="pdf" value="PDF" name="options" />
                <label htmlFor="print">PDF</label>
                <br />
                <button
                  className="addToCart-btn addToCart_dialog_btn"
                  type="submit"
                >
                  {languages.addToCart[props.locale]}
                </button>
              </form>
            </dialog>
            <button
              className="addToCart-btn"
              onClick={(e) =>
                e.target.closest('.work').childNodes[3].showModal()
              }
            >
              {languages.addToCart[props.locale]}
            </button>
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
