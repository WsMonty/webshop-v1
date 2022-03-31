import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const ComposerPage = (props) => {
  //   const [locale, setLocale] = useState('en');

  //   const getLocale = () => {
  //     setLocale(document.querySelector('.locale_link').id);
  //   };

  //   useEffect(() => {
  //     getLocale();
  //   });

  const data = props.data.datoCmsComposer;

  //   rawData.map((entry) =>
  //     props.pageContext.composer === entry.node.composer
  //       ? data.push(entry.node)
  //       : null
  //   );

  //   const result = data.filter((entry) => {
  //     if (entry.locale === locale) return entry;
  //     return '';
  //   });

  return (
    <div className="composer_page">
      <h1 className="composer_page_name">{data.name}</h1>
      <p className="composer_page_website">
        Website:{' '}
        <a href={data.website} className="composer_page_website_link">
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
