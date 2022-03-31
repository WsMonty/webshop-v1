import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const Products = () => {
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
          }
        }
      }
    }
  `);
  const data = query.allDatoCmsPost.edges;

  const [locale, setLocale] = useState('en');

  const getLocale = () => {
    setLocale(document.querySelector('.locale_link').id);
  };

  useEffect(() => {
    getLocale();
  });

  // const clickHandlerProduct = (e) => {
  //   document
  //     .querySelectorAll('.product')
  //     .forEach((el) => el.classList.remove('product_active'));
  //   e.target.closest('.product').classList.add('product_active');
  // };

  return (
    <div className="products">
      {data.map((prod, i) => {
        if (prod.node.locale !== locale) return '';
        return (
          <div className="product_container">
            <Link
              className="product"
              key={`product_nr${i + 1}`}
              to={`/works/${prod.node.title
                .replaceAll(' ', '-')
                .toLowerCase()}`}
            >
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
                  <span>{prod.node.composer}</span>
                </p>
                <p className="product_description_short">
                  {prod.node.descriptionTextShort}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
