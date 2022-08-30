import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import SingleWork from '../../components/singleWork';
import { useSelector } from 'react-redux';
import languages from '../../languages/languages';
import { selectLocale } from '../../store.js';

const ComposerPage = (props) => {
  const data = props.data.datoCmsComposer;

  const works = props.data.allDatoCmsPost.edges;

  const locale = useSelector(selectLocale).locale;

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
          href={data.website}
          target="_blank"
          rel="noreferrer"
          className="composer_page_website_link url"
        >
          {data.website}
        </a>
      </p>
      <div className="composer_page_imgbio_container">
        <GatsbyImage
          className="composer_page_image"
          image={data.photo.gatsbyImageData}
          alt={data.name}
        />
        <p className="composer_page_bio">{data.bio}</p>
      </div>
      <h1 className="composer_page_works_title">
        {languages.allWorksfromComp[locale]}
      </h1>
      <div className="work_works">
        {works.map((work, i) => {
          return (
            <SingleWork
              key={`work-${i}`}
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

export default ComposerPage;

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
    allDatoCmsPost(filter: { composer: { eq: $name }, locale: { eq: "en" } }) {
      edges {
        node {
          descriptionTextShort
          composer
          title
          price
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
