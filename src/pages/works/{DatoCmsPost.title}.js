import React from 'react';
import { graphql } from 'gatsby';
import { addToCart, handleCartModal } from '../../actions';
import { connect } from 'react-redux';
import languages from '../../languages/languages';
import { GatsbyImage } from 'gatsby-plugin-image';
import YouTube from 'react-youtube';

const WorkPage = ({ cart, addToCart, locale, data, pageContext }) => {
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

  const isInCart = () => {
    const checkIfInCart = Object.keys(cart).some((work) =>
      work.includes(workData.title)
    );

    return checkIfInCart;
  };

  const addToCartHandler = () => {
    const work = { title: workData.title };
    addToCart(work);
  };

  const transformUrl = (url) => {
    // return url.replace(/watch\?v=/, 'embed/');
    return url.replace(/https:\/\/www.youtube.com\/watch\?v=/, '');
  };

  return (
    <div className="work_page">
      <GatsbyImage
        image={workData.previewImage.gatsbyImageData}
        alt={workData.title}
      />
      <div className="work_page_content_container">
        <div className="work_page_content">
          <h2 className="work_page_title">{workData.title}</h2>
          <p className="work_page_composer">
            <span>{workData.composer}</span>
          </p>
          <p className="work_page_description">{workData.descriptionText}</p>
        </div>

        <div className="work_page_addToCart">
          {isInCart() ? (
            <p className="work_page_isCartInfo">{languages.isInCart[locale]}</p>
          ) : (
            <button className="addToCart_work_btn" onClick={addToCartHandler}>
              {languages.addToCart[locale]}
            </button>
          )}

          <div className="work_page_dialog"></div>
        </div>
        {workData.previewVideo ? (
          <YouTube
            className="work_page_video"
            videoId={transformUrl(workData.previewVideo.url)}
          />
        ) : (
          ''
        )}
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

export default connect(mapStateToProps, mapDispatchtoProps)(WorkPage);

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
          previewImage {
            url
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
          locale
          previewVideo {
            url
          }
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
