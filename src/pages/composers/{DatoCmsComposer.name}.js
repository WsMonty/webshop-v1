import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import SingleWork from '../../components/singleWork';
import { connect } from 'react-redux';
import { addToCart, handleCartModal } from '../../actions';
import languages from '../../languages/languages';

const ComposerPage = (props) => {
  const data = props.data.datoCmsComposer;

  const works = props.data.allDatoCmsPost.edges;

  const { locale } = props;

  return (
    <div className="composer_page">
      <GatsbySeo
        title={`Grethen Edition | ${data.name}`}
        description={`All information on ${data.name}, represented by Grethen Edition.`}
        language="en"
        noindex={false}
        nofollow={false}
      />
      <h1 className="composer_page_name">{data.name}</h1>
      <p className="composer_page_website">
        Website:{' '}
        <a
          href={'https://' + data.website}
          target="_blank"
          rel="noreferrer"
          className="composer_page_website_link url"
        >
          {data.website}
        </a>
      </p>
      <p className="composer_page_bio">{data.bio}</p>
      <GatsbyImage image={data.photo.gatsbyImageData} alt={data.name} />
      <h1 className="composer_page_works_title">
        {languages.allWorksfromComp[locale]}
      </h1>
      <div className="work_works">
        {works.map((work, i) => {
          return (
            <SingleWork
              key={`work-${i}`}
              props={props}
              product={work}
              query={props.data}
              i={i}
            />
          );
        })}
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

export default connect(mapStateToProps, mapDispatchtoProps)(ComposerPage);

export const query = graphql`
  query ($name: String) {
    datoCmsComposer(name: { eq: $name }) {
      bio
      name
      website
      photo {
        url
        gatsbyImageData(width: 400, placeholder: BLURRED)
      }
    }
    allDatoCmsPost(
      filter: { composer: { eq: "Gilles Grethen" }, locale: { eq: "en" } }
    ) {
      edges {
        node {
          descriptionTextShort
          composer
          title
          previewImage {
            gatsbyImageData(width: 400, placeholder: BLURRED)
          }
        }
      }
    }
    allDatoCmsComposer {
      edges {
        node {
          name
          website
          photo {
            gatsbyImageData(width: 400, placeholder: BLURRED)
            url
          }
          bio
        }
      }
    }
  }
`;
