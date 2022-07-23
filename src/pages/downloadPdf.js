import React, { useCallback, useState } from 'react';
import { emptyPurchased } from '../actions';
import { connect } from 'react-redux';
import languages from '../languages/languages';

import axios from 'axios';

const DownloadPdf = (props) => {
  const { purchased, locale } = props;

  const [urls, setUrls] = useState([]);

  const files = async () => {
    return await axios
      .post(`${process.env.SERVER_URL}/downloadPDF`, purchased)
      .then((res) => res)
      .catch((err) => console.log(`My ${err}`));
  };
  files().then((res) => setUrls(res.data));

  return (
    <div className="download">
      <div className="download_content">
        <h1 className="download_title">{languages.download[locale]}</h1>
        {purchased.map((work, i) => {
          return (
            <div key={`work_pdf${i}`} className="download_work">
              <a
                className="download_link"
                target={'_blank'}
                rel="noreferrer"
                href={urls[i]}
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
