import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

const ProductPage = (props) => {
  const [locale, setLocale] = useState('en');

  const getLocale = () => {
    setLocale(document.querySelector('.locale_link').id);
  };

  useEffect(() => {
    getLocale();
  });

  const rightProduct = () => {
    const result = [];
    props.data.allDatoCmsPost.edges.forEach((entry) => {
      if (props.pageContext.title === entry.node.title) result.push(entry.node);
    });
    return result.filter((entry) => {
      if (entry.locale === locale) {
        return entry;
      }
      return '';
    });
  };

  const [data] = rightProduct();
  console.log(data);

  // console.log(props);

  return (
    <div className="product_page">
      <div className="product_page_content_container">
        <h2 className="product_page_title">{data.title}</h2>
        <p className="product_page_composer">
          <span>{data.composer}</span>
        </p>
        <p className="product_page_description">{data.descriptionText}</p>
      </div>
      <img
        className="product_page_image"
        src={data.previewImage.url}
        alt={`Preview for ${data.title}`}
      />
    </div>
  );
};

export default ProductPage;

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
