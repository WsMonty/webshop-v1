import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const Composers = () => {
  const query = useStaticQuery(graphql`
    {
      allDatoCmsComposer {
        nodes {
          name
          photo {
            gatsbyImageData(width: 400, placeholder: BLURRED)
          }
        }
      }
    }
  `);

  const data = query.allDatoCmsComposer.nodes;

  const makeUnique = (data) => {
    const result = [];
    data.forEach((entry) => {
      if (result.some((el) => el.name === entry.name)) return;
      result.push(entry);
    });
    return result;
  };

  const uniqueData = makeUnique(data);

  return (
    <div className="composers">
      <GatsbySeo
        title="Grethen Edition | Composers"
        description="All the composers represented by Grethen Edition."
        language="en"
        noindex={false}
        nofollow={false}
      />
      {uniqueData.map((comp, i) => {
        return (
          <div key={`composer-${i + 1}`} className="composer_list">
            <Link
              className="composer_link_container"
              to={`/composers/${comp.name.replaceAll(' ', '-').toLowerCase()}`}
            >
              <GatsbyImage
                className="composer_image"
                image={comp.photo.gatsbyImageData}
                alt={comp.name}
              />
              <span className="composer_name">{comp.name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Composers;
