import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';

const Composers = () => {
  const query = useStaticQuery(graphql`
    {
      allDatoCmsPost {
        nodes {
          composer
        }
      }
    }
  `);

  const data = query.allDatoCmsPost.nodes;

  const set = new Set([...data.map((entry) => entry.composer)]);
  const composers = Array.from(set);

  return (
    <div className="composers">
      {composers.map((comp, i) => {
        return (
          <Link
            key={`composer-${i + 1}`}
            to={`/composers/${comp.replaceAll(' ', '-').toLowerCase()}`}
          >
            {comp}
          </Link>
        );
      })}
    </div>
  );
};

export default Composers;
