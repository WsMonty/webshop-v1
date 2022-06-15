import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SingleWork from '../../components/singleWork';
import { addToCart, handleCartModal } from '../../actions';
import { connect } from 'react-redux';
import { FaPlus } from 'react-icons/fa';

const Categories = (props) => {
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

  const allCategories = [
    ...new Set(
      data.map((work) => {
        return work.node.descriptionTextShort;
      })
    ),
  ].sort();

  const showWorks = (e) => {
    document
      .querySelectorAll('.categories_works')
      .forEach((el) => el.classList.remove('categories_works_active'));

    const workEl = e.target.closest('.categories_title_container').nextSibling;

    if (workEl.dataset.active === 'true') {
      workEl.classList.remove('categories_works_active');
      workEl.dataset.active = 'false';
      return;
    }

    if (workEl.dataset.active === 'false') {
      workEl.classList.add('categories_works_active');
      workEl.dataset.active = 'true';
    }
  };

  return (
    <div className="categories">
      {allCategories.map((cat, i, arr) => {
        return (
          <div className="categories_container" key={`category${i}`}>
            <div className="categories_title_container">
              <h1 className="categories_title" key={i}>
                {cat}
              </h1>
              <button
                className="categories_works_btn"
                onClick={(e) => showWorks(e)}
              >
                <FaPlus />
              </button>
            </div>
            <div className="categories_works" data-active="false">
              {data.map((work, i) => {
                if (
                  work.node.descriptionTextShort === cat &&
                  work.node.locale === props.locale
                ) {
                  return (
                    <SingleWork
                      key={`work${i}`}
                      product={work}
                      i={i}
                      query={query}
                      props={props}
                    />
                  );
                }
                return '';
              })}
            </div>
            {i < arr.length - 1 ? <hr /> : ''}
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

export default connect(mapStateToProps, mapDispatchtoProps)(Categories);
