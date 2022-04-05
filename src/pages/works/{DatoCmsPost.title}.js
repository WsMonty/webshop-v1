import React from 'react';
import { graphql } from 'gatsby';
import { useSelector } from 'react-redux';

const WorkPage = (props) => {
  const locale = useSelector((state) => state.locale);

  const rightWork = () => {
    const result = [];
    props.data.allDatoCmsPost.edges.forEach((entry) => {
      if (props.pageContext.title === entry.node.title) result.push(entry.node);
    });
    return result.filter((entry) => {
      if (entry.locale === locale) {
        return entry;
      }
      return '';
    });
  };

  const [data] = rightWork();

  return (
    <div className="work_page">
      <div className="work_page_content_container">
        <h2 className="work_page_title">{data.title}</h2>
        <p className="work_page_composer">
          <span>{data.composer}</span>
        </p>
        <p className="work_page_description">{data.descriptionText}</p>
      </div>
      <img
        className="work_page_image"
        src={data.previewImage.url}
        alt={`Preview for ${data.title}`}
      />
    </div>
  );
};

export default WorkPage;

export const query = graphql`
  query {
    allDatoCmsPost {
      edges {
        node {
          id
          title
          descriptionText
          date
          composer
          previewImage {
            url
          }
          locale
        }
      }
    }
  }
`;
