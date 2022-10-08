import React from 'react';
import { graphql, Link } from 'gatsby';
import { useSelector } from 'react-redux';
import languages from '../../languages/languages';
import { GatsbyImage } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { addToCart } from '../../reducers/cart';
import { selectCart, selectLocale, store } from '../../store.js';
import Youtube from '../../components/youtube';

const WorkPage = ({ data, pageContext }) => {
  const cart = useSelector(selectCart).cart;
  const locale = useSelector(selectLocale).locale;

  const rightWork = () => {
    const result = [];
    data.allDatoCmsPost.edges.forEach((entry) => {
      if (pageContext.title === entry.node.title) result.push(entry.node);
    });
    return result.filter((entry) => {
      if (entry.locale === locale) {
        return entry;
      }
      return '';
    });
  };

  const [workData] = rightWork();

  const composers = data.allDatoCmsComposer.edges.map((comp) => comp.node.name);

  const isInCart = () => {
    const checkIfInCart = Object.keys(cart).some((work) =>
      work.includes(workData.title)
    );

    return checkIfInCart;
  };

  const addToCartHandler = () => {
    const work = { title: workData.title };
    store.dispatch(addToCart(work));
  };

  return (
    <div className="work_page">
      <GatsbySeo
        title={`Grethen Edition | ${workData.title}`}
        description={`Product page for the work '${workData.title}'`}
        language="en"
        noindex={false}
        nofollow={false}
      />
      <GatsbyImage
        image={workData.previewImage.gatsbyImageData}
        alt={workData.title}
        className="work_page_previewImage"
        objectFit="contain"
      />
      <div className="work_page_content_container">
        <div className="work_page_content">
          <h2 className="work_page_title">{workData.title}</h2>
          <p className="work_page_composer">
            {composers.includes(workData.composer) ? (
              <Link
                to={`/composers/${workData.composer
                  .toLowerCase()
                  .replace(' ', '-')}`}
                className="work_page_composer_link"
              >
                {workData.composer}
              </Link>
            ) : (
              <span>{workData.composer}</span>
            )}
          </p>
          <p className="work_page_description">{workData.descriptionText}</p>
          <p className="work_page_price">
            {`${workData.price.toFixed(2).replaceAll('.', ',')}€`}

            <br />
            <span>{languages.priceVAT[locale]}</span>
          </p>
        </div>

        {isInCart() ? (
          <p className="work_page_isCartInfo">{languages.isInCart[locale]}</p>
        ) : (
          <button className="addToCart_work_btn" onClick={addToCartHandler}>
            {languages.addToCart[locale]}
          </button>
        )}

        {workData.previewVideo ? (
          <Youtube url={workData.previewVideo.url} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default WorkPage;

export const query = graphql`
  query {
    allDatoCmsPost {
      edges {
        node {
          id
          title
          descriptionText
          date
          composer
          price
          previewImage {
            url
            gatsbyImageData(placeholder: BLURRED)
          }
          locale
          previewVideo {
            url
          }
        }
      }
    }
    allDatoCmsComposer {
      edges {
        node {
          name
        }
      }
    }
  }
`;

////// In case of shipping

// const showOptionsHandler = () => {
//   const dialog = document.querySelector('.work_page_dialog');
//   if (dialog.style.display === '') dialog.style.display = 'none';
//   dialog.style.display === 'none'
//     ? (dialog.style.display = 'block')
//     : (dialog.style.display = 'none');
// };

// const addToCartHandler = (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const formValue = Object.fromEntries(formData).options;
//   const workTitle = e.target.closest('.work_page_addToCart')
//     .previousElementSibling.firstChild.textContent;
//   const work = {
//     title: workTitle,
//     options: formValue,
//   };

//   addToCart(work);
//   handleCartModal('show');
//   // e.target.closest('.addToCart_dialog').close();
//   e.target.closest('.work_page_dialog').style.display = 'none';
// };
/* <form
              className="work_page_form"
              onSubmit={(e) => addToCartHandler(e)}
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
                className="work_page_toCart-btn pill-btn-inverted"
                type="submit"
              >
                {languages.addToCart[locale]}
              </button>
            </form> */
