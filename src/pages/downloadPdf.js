import React from 'react';
import { emptyPurchased } from '../actions';
import { connect } from 'react-redux';
import fileLinks from '../languages/fileLinks';

const downloadPdf = (props) => {
  return (
    <div className="download">
      {props.purchased.map((work, i) => {
        return (
          <div key={`work_pdf${i}`} className="download_work">
            <a
              className="download_link"
              target={'_blank'}
              rel="noreferrer"
              href={fileLinks[work]}
            >
              {work}
            </a>
          </div>
        );
      })}
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
//Alisa mapDispatchtoProps ist mostly written in camelCase mapDispatchToProps 
const mapDispatchtoProps = (dispatch) => {
  return {
    emptyPurchased: () => dispatch(emptyPurchased()),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(downloadPdf);
