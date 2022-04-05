import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

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
      {uniqueData.map((comp, i) => {
        return (
          <div key={`composer-${i + 1}`} className="composer_list">
            <Link
              className="composer_name"
              to={`/composers/${comp.name.replaceAll(' ', '-').toLowerCase()}`}
            >
              {comp.name}
            </Link>
            <GatsbyImage
              className="composer_image"
              image={comp.photo.gatsbyImageData}
              alt={comp.name}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Composers;
