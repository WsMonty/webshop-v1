import React from 'react';
import { graphql } from 'gatsby';

const ProductPage = (props) => {
  return (
    <div className="product_page">
      <div className="product_page_content_container">
        <h2 className="product_page_title">{props.data.datoCmsPost.title}</h2>
        <p className="product_page_composer">
          <span>{props.data.datoCmsPost.composer}</span>
        </p>
        <p className="product_page_description">
          {props.data.datoCmsPost.descriptionText}
        </p>
      </div>
      <img
        className="product_page_image"
        src={props.data.datoCmsPost.previewImage.url}
        alt={`Preview for ${props.data.datoCmsPost.title}`}
      />
    </div>
  );
};

export default ProductPage;

export const query = graphql`
  query ($id: String) {
    datoCmsPost(id: { eq: $id }) {
      title
      composer
      descriptionText
      previewImage {
        url
      }
      locale
    }
  }
`;
