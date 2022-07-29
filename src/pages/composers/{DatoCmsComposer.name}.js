import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const ComposerPage = (props) => {
  const data = props.data.datoCmsComposer;

  return (
    <div className="composer_page">
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
