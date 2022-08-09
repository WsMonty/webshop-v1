import React, { useCallback, useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SingleWork from '../../components/singleWork';
import { addToCart, handleCartModal } from '../../actions';
import { connect } from 'react-redux';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

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
              gatsbyImageData
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

  const { location } = props;
  const catFromLink = location.state?.cat;

  const allCategories = [
    ...new Set(
      data.map((work) => {
        return work.node.descriptionTextShort;
      })
    ),
  ].sort();

  const showCategoryHandler = useCallback(
    (e, cat) => {
      let category;
      if (e !== null) {
        category = e.target.dataset.category;
      }

      if (cat) {
        category = cat;
      }

      document
        .querySelectorAll('.categories_title')
        .forEach((title) => title.classList.remove('categories_title_active'));

      document
        .querySelector(`[data-category='${category}']`)
        .classList.add('categories_title_active');

      const sortedWorks = data.filter(
        (work) => work.node.descriptionTextShort === category
      );
      setWorks(sortedWorks);
    },
    [data]
  );

  const checkIfCategoryFromLink = useCallback(() => {
    if (catFromLink) showCategoryHandler(null, catFromLink);
    else showCategoryHandler(null, 'Big Band');
  }, [catFromLink, showCategoryHandler]);

  useEffect(() => checkIfCategoryFromLink(), [checkIfCategoryFromLink]);

  return (
    <div className="categories">
      <GatsbySeo
        title="Grethen Edition | Categories"
        description="All works on Grethen Edition sorted by categories."
        language="en"
        noindex={false}
        nofollow={false}
      />
      <div className="categories_left_titles">
        {allCategories.map((cat, i) => {
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
