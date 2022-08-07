import React from 'react';
import { emptyPurchased } from '../actions';
import { connect } from 'react-redux';
import languages from '../languages/languages';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const DownloadPdf = (props) => {
  const query = useStaticQuery(graphql`
    {
      allDatoCmsFileLink(filter: { locale: { eq: "en" } }) {
        nodes {
          name
          link
        }
      }
    }
  `);
  const { purchased, locale } = props;

  const files = query.allDatoCmsFileLink.nodes;

  return (
    <div className="download">
      <GatsbySeo
        title="Grethen Edition | Download PDFs"
        language="en"
        nofollow={true}
      />
      <div className="download_content">
        <h1 className="download_title">{languages.download[locale]}</h1>
        {purchased.map((work, i) => {
          return (
            <div key={`work_pdf${i}`} className="download_work">
              <a
                className="download_link"
                target={'_blank'}
                rel="noreferrer"
                href={files.filter((file) => file.name === work)[0].link}
              >
                {work}
              </a>
            </div>
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
    purchased: state.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyPurchased: () => dispatch(emptyPurchased()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPdf);
