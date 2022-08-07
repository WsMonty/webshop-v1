import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const ComposerPage = (props) => {
  const data = props.data.datoCmsComposer;

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
  }
`;
