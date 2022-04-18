import React from 'react';
import { useStaticQuery, graphql, Link, navigate } from 'gatsby';
import sortByDate from '../helpers/sortByDate.js';
import { connect } from 'react-redux';
import { addToCart, handleCartModal } from '../actions/index.js';

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
    props.addToCart(
      e.target.closest('.work').childNodes[1].firstChild.textContent
    );
    props.handleCartModal('show');
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
            <button
              className="addToCart-btn"
              onClick={(e) => addToCartClickHandler(e)}
            >
              Add to cart
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
