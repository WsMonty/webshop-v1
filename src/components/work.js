import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import sortByDate from '../helpers/sortByDate.js';
import createSearchCodes from '../helpers/createSearchCodes.js';
import { connect } from 'react-redux';
import { addToCart, handleCartModal } from '../actions/index.js';
import SingleWork from './singleWork.js';

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
              gatsbyImageData(width: 400, placeholder: BLURRED)
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
    <div className="work_works_container">
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
      <div className="work_works">
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
          );
        })}
      </div>
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
