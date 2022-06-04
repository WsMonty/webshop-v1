import React from 'react';
import { graphql } from 'gatsby';
import { addToCart, handleCartModal } from '../../actions';
import { connect } from 'react-redux';
import languages from '../../languages/languages';

const WorkPage = (props) => {
  const rightWork = () => {
    const result = [];
    props.data.allDatoCmsPost.edges.forEach((entry) => {
      if (props.pageContext.title === entry.node.title) result.push(entry.node);
    });
    return result.filter((entry) => {
      if (entry.locale === props.locale) {
        return entry;
      }
      return '';
    });
  };

  const [data] = rightWork();

  const showOptionsHandler = () => {
    const dialog = document.querySelector('.work_page_dialog');
    if (dialog.style.display === '') dialog.style.display = 'none';
    dialog.style.display === 'none'
      ? (dialog.style.display = 'block')
      : (dialog.style.display = 'none');
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValue = Object.fromEntries(formData).options;
    const workTitle = e.target.closest('.work_page_addToCart')
      .previousElementSibling.firstChild.textContent;
    const work = {
      title: workTitle,
      options: formValue,
    };

    props.addToCart(work);
    props.handleCartModal('show');
    // e.target.closest('.addToCart_dialog').close();
    e.target.closest('.work_page_dialog').style.display = 'none';
  };

  return (
    <div className="work_page">
      <img
        className="work_page_image"
        src={data.previewImage.url}
        alt={`Preview for ${data.title}`}
      />
      <div className="work_page_content_container">
        <div className="work_page_content">
          <h2 className="work_page_title">{data.title}</h2>
          <p className="work_page_composer">
            <span>{data.composer}</span>
          </p>
          <p className="work_page_description">{data.descriptionText}</p>
        </div>

        <div className="work_page_addToCart">
          <button
            className="addToCart-btn"
            onClick={(e) => showOptionsHandler(e)}
          >
            {languages.addToCart[props.locale]}
          </button>
          <div className="work_page_dialog">
            <form
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
                {languages.addToCart[props.locale]}
              </button>
            </form>
          </div>
        </div>
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
          }
          locale
        }
      }
    }
  }
`;
