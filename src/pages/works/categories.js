import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SingleWork from '../../components/singleWork';
import { addToCart, handleCartModal } from '../../actions';
import { connect } from 'react-redux';

const Categories = (props) => {
  const query = useStaticQuery(graphql`
    {
      allDatoCmsPost(filter: { locale: { eq: "en" } }) {
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

  const [works, setWorks] = useState(data);

  const allCategories = [
    ...new Set(
      data.map((work) => {
        return work.node.descriptionTextShort;
      })
    ),
  ].sort();

  const showCategoryHandler = (e) => {
    document
      .querySelectorAll('.categories_title')
      .forEach((title) => title.classList.remove('categories_title_active'));
    e.target.classList.add('categories_title_active');

    const category = e.target.dataset.category;

    const sortedWorks = data.filter(
      (work) => work.node.descriptionTextShort === category
    );
    setWorks(sortedWorks);
  };

  return (
    <div className="categories">
      <div className="categories_left_titles">
        {allCategories.map((cat, i, arr) => {
          return (
            <button
              key={`cat_title${i + 1}`}
              className="categories_title"
              onClick={(e) => showCategoryHandler(e)}
              data-category={cat}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <div className="categories_right_works work_works">
        {works.map((work, i) => {
          return (
            <SingleWork
              key={`work-${i}`}
              props={props}
              product={work}
              query={query}
              i={i}
            />
          );
        })}
      </div>
    </div>
    //
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

export default connect(mapStateToProps, mapDispatchtoProps)(Categories);
