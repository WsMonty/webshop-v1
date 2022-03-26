import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Products = () => {
  const query = useStaticQuery(graphql`
    {
      allDatoCmsPost {
        edges {
          node {
            composer
            title
            descriptionText
            previewImage {
              url
            }
          }
        }
      }
    }
  `);
  const data = query.allDatoCmsPost.edges;
  console.log(data);

  return (
    <div className="products">
      {data.map((prod, i) => {
        return (
          <div className="product" key={`product_nr${i + 1}`}>
            <div className="product_image_container">
              <img
                className="product_image"
                src={prod.node.previewImage.url}
                alt={`Preview for ${prod.node.title}`}
              />
            </div>
            <div className="product_content_container">
              <h2 className="product_title">{prod.node.title}</h2>
              <p className="product_composer">
                by <span>{prod.node.composer}</span>
              </p>
              <p className="product_description">{prod.node.descriptionText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
