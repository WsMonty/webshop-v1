import React from 'react';
import { useStaticQuery, graphql, Link, navigate } from 'gatsby';
import sortByDate from '../helpers/sortByDate.js';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/index.js';

const Work = () => {
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
          }
        }
      }
    }
  `);
  const data = query.allDatoCmsPost.edges;
  const sortedData = sortByDate(data);

  const locale = useSelector((state) => state.locale);

  const dispatch = useDispatch();

  const composerClickHandler = (e) => {
    navigate(
      `/composers/${e.target.textContent.toLowerCase().replace(' ', '-')}`
    );
  };

  // const addToCartHandler = (e) => {
  //   workInCart.push(
  //     e.target.closest('.work').childNodes[1].firstChild.textContent
  //   );

  //   console.log(workInCart);
  // };

  return (
    <div className="work_works">
      {sortedData.map((prod, i) => {
        if (prod.node.locale !== locale) return '';
        return (
          <div key={`work_nr${i + 1}`} className="work">
            <Link
              className="work_image_container"
              to={`/works/${prod.node.title
                .replaceAll(' ', '-')
                .replaceAll('.', '')
                .toLowerCase()}`}
            >
              <img
                className="work_image"
                src={prod.node.previewImage.url}
                alt={`Preview for ${prod.node.title}`}
              />
            </Link>
            <div className="work_content_container">
              <h2 className="work_title">{prod.node.title}</h2>
              <button
                className="work_composer"
                onClick={(e) => composerClickHandler(e)}
              >
                <span>{prod.node.composer}</span>
              </button>
              <button className="work_category">
                <p className="work_description_short">
                  {prod.node.descriptionTextShort}
                </p>
              </button>
            </div>
            <button
              className="addToCart-btn"
              onClick={(e) =>
                dispatch(
                  addToCart(
                    e.target.closest('.work').childNodes[1].firstChild
                      .textContent
                  )
                )
              }
            >
              Add to cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Work;
