import React from 'react';
import { useSelector } from 'react-redux';
import languages from '../languages/languages';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { selectLocale, selectPurchased } from '../store';

const DownloadPdf = () => {
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
  const purchased = useSelector(selectPurchased).purchased;
  const locale = useSelector(selectLocale).locale;

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

export default DownloadPdf;
