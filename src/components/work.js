import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import sortByDate from '../helpers/sortByDate.js';
import createSearchCodes from '../helpers/createSearchCodes.js';
import { connect } from 'react-redux';
import { addToCart, handleCartModal } from '../actions/index.js';
import SingleWork from './singleWork.js';
// import { SHIPPING_COST } from '../globalVariables';

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
      allDatoCmsComposer(filter: { locale: { eq: "en" } }) {
        edges {
          node {
            name
          }
        }
      }
    }
  `);
  const data = query.allDatoCmsPost.edges;
  const sortedData = sortByDate(data);

  const [works, setWorks] = useState(sortedData);

  // Search Bar Functionality
  const searchBarHandler = (e) => {
    e.preventDefault();

    if (!Object.entries(sortedData)[0][1].node.searchCode)
      createSearchCodes(sortedData);

    const searchInput = document
      .querySelector('.searchbar_input')
      .value.toLowerCase();

    const filteredWorks = sortedData.filter((work) =>
      work.node.searchCode.includes(searchInput)
    );

    setWorks(filteredWorks);
  };

  return (
    <div className="work_works">
      <div className="searchbar_container">
        <form className="searchbar_form">
          <input
            className="searchbar_input"
            type="text"
            placeholder="🔍 Title, Composer,..."
            required
            onChange={(e) => searchBarHandler(e)}
          />
        </form>
      </div>
      {works.map((product, i) => {
        if (product.node.locale !== props.locale) return '';
        return (
          <SingleWork
            key={`work-${i}`}
            props={props}
            product={product}
            query={query}
            i={i}
          />
          // <div key={`work-${i}`} className="work_card_container">
          //   <div
          //     key={`work_nr${i + 1}`}
          //     className="work"
          //     data-title={product.node.title}
          //   >
          //     <Link
          //       className="work_image_container"
          //       to={`/works/${product.node.title
          //         .replaceAll(' ', '-')
          //         .replaceAll('.', '')
          //         .replaceAll("'", '-')
          //         .toLowerCase()}`}
          //     >
          //       <img
          //         className="work_image"
          //         src={product.node.previewImage.url}
          //         alt={`Preview for ${product.node.title}`}
          //       />
          //     </Link>
          //     <div className="work_content_container">
          //       <h2 className="work_title">{product.node.title}</h2>

          //       {query.allDatoCmsComposer.edges
          //         .map((comp) => comp.node.name)
          //         .indexOf(product.node.composer) >= 0 ? (
          //         <button
          //           className="work_composer"
          //           onClick={(e) => composerClickHandler(e)}
          //         >
          //           {' '}
          //           <span>{product.node.composer}</span>{' '}
          //         </button>
          //       ) : (
          //         <p className="work_composer_nolink">
          //           <span>{product.node.composer}</span>
          //         </p>
          //       )}

          //       {/* <button
          //         className="work_composer"
          //         onClick={(e) => composerClickHandler(e)}
          //       >
          //         <span>{product.node.composer}</span>
          //       </button> */}
          //       <button className="work_category">
          //         <p className="work_description_short">
          //           {product.node.descriptionTextShort}s
          //         </p>
          //       </button>
          //     </div>
          //     <div className="work_price_btn_container">
          //       <p className="work_price">{product.node.price}€</p>

          //       <button
          //         className="addToCart_btn"
          //         onClick={(e) => showOptionsHandler(e)}
          //       >
          //         {languages.moreInformation[props.locale]}
          //       </button>
          //     </div>
          //   </div>

          //   <div
          //     className="work_options"
          //     data-title={`${product.node.title}_work`}
          //     data-key={product.node.title}
          //     data-price={product.node.price}
          //   >
          //     <h3 className="work_options_title">{product.node.title}</h3>
          //     <p className="work_options_description_short">
          //       {product.node.descriptionTextShort}
          //     </p>
          //     <p className="work_options_price">{product.node.price}€</p>
          //     <button
          //       className="work_options_leave_btn pill_btn_inverted"
          //       onClick={(e) => leaveOptionsHandler(e)}
          //     >
          //       {languages.goBack[props.locale]}
          //     </button>

          //     {/* In Case of printing and shipping!!! */}
          //     {/* <form
          //       className="addToCart_dialog_form"
          //       onSubmit={(e) => addToCartClickHandler(e)}
          //     >
          //       <h2 className="addToCart_dialog_form_title">
          //         {product.node.title}
          //       </h2>
          //       <input
          //         type="radio"
          //         id="print"
          //         value="Print"
          //         name="options"
          //         required
          //         onClick={changePrice}
          //       />
          //       <label htmlFor="print">Print</label>
          //       <br />
          //       <input
          //         type="radio"
          //         id="pdf"
          //         value="PDF"
          //         name="options"
          //         onClick={changePrice}
          //       />
          //       <label htmlFor="print">PDF</label>
          //       <br />
          //       <p className="work_options_price">{product.node.price}€</p>
          //       <button
          //         className="work_options_submit_btn pill_btn_inverted"
          //         type="submit"
          //       >
          //         {languages.addToCart[props.locale]}
          //       </button>
          //     </form> */}

          //     <button
          //       className="work_options_submit_btn pill_btn_inverted"
          //       onClick={(e) => addToCartClickHandlerNoShipping(e)}
          //     >
          //       {languages.addToCart[props.locale]}
          //     </button>
          //   </div>
          //   <div className="work_expand_animation hidden"></div>
          //   <div className="work_alreadyInCart">
          //     <p>This is already in your shopping cart 😀</p>
          //   </div>
          // </div>
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
