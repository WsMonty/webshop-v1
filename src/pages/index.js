import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { connect } from 'react-redux';
import '../styles/main.scss';
import { addToCart, handleCartModal } from '../actions/index.js';
import sortByDate from '../helpers/sortByDate.js';
import SingleWork from '../components/singleWork';
import { Link } from 'gatsby';
import languages from '../languages/languages';

const IndexPage = (props) => {
  const query = useStaticQuery(graphql`
    {
      allDatoCmsPost {
        edges {
          node {
            composer
            title
            descriptionTextShort
            previewImage {
              url
              gatsbyImageData(width: 400, placeholder: BLURRED)
            }
            locale
            date
            price
          }
        }
      }
      allDatoCmsComposer(filter: { locale: { eq: "en" } }) {
        edges {
          node {
            name
          }
        }
      }
    }
  `);

  const { locale } = props;

  const data = query.allDatoCmsPost.edges;
  const sortedData = sortByDate(data);

  const filterWorksByCategory = (cat) => {
    switch (cat) {
      case 'transcription':
        const dataTrans = sortedData.filter(
          (work) =>
            work.node.descriptionTextShort === 'Transcription' &&
            work.node.locale === locale
        );
        if (dataTrans.length > 5) dataTrans.length = 5;
        return dataTrans;

      case 'jazzMessengers':
        const dataMessengers = sortedData.filter(
          (work) =>
            work.node.descriptionTextShort === 'Jazz Messengers Arrangement' &&
            work.node.locale === locale
        );
        if (dataMessengers.length > 5) dataMessengers.length = 5;
        return dataMessengers;
      case 'original':
        const dataOrig = sortedData.filter(
          (work) =>
            (work.node.descriptionTextShort === 'Big Band' &&
              work.node.locale === locale) ||
            (work.node.descriptionTextShort === 'Little Big Band' &&
              work.node.locale === locale)
        );
        if (dataOrig.length > 5) dataOrig.length = 5;
        return dataOrig;
      default:
        return sortedData;
    }
  };
  const transcriptions = filterWorksByCategory('transcription');
  const jazzMessengers = filterWorksByCategory('jazzMessengers');
  const originals = filterWorksByCategory('original');

  return (
    <div className="index">
      <h1 className="index_welcome">{languages.welcome[locale]}</h1>
      <div className="index_container index_originals">
        <div className="index_title_container">
          <h2 className="index_title">{languages.newCompositions[locale]} </h2>
          <Link
            className="index_title_link"
            to="/works/categories"
            state={{ cat: 'Big Band' }}
          >
            {languages.seeCompositions[locale]}
          </Link>
        </div>
        <div className="work_works">
          {originals.map((work, i) => {
            if (work.node.locale !== locale) return '';
            return (
              <SingleWork
                key={`work-${i}`}
                props={props}
                product={work}
                query={query}
                i={i}
              />
            );
          })}
        </div>
      </div>
      <div className="index_container index_jazzMessengers">
        <div className="index_title_container">
          <h2 className="index_title">{languages.newArrangements[locale]} </h2>
          <Link
            className="index_title_link"
            to="/works/categories"
            state={{ cat: 'Jazz Messengers Arrangement' }}
          >
            {languages.seeArrangements[locale]}
          </Link>
        </div>
        <div className="work_works">
          {jazzMessengers.map((work, i) => {
            if (work.node.locale !== locale) return '';
            return (
              <SingleWork
                key={`work-${i}`}
                props={props}
                product={work}
                query={query}
                i={i}
              />
            );
          })}
        </div>
      </div>
      <div className="index_container index_transcriptions">
        <div className="index_title_container">
          <h2 className="index_title">
            {languages.newTranscriptions[locale]}{' '}
          </h2>
          <Link
            className="index_title_link"
            to="/works/categories"
            state={{ cat: 'Transcription' }}
          >
            {languages.seeTranscriptions[locale]}
          </Link>
        </div>
        <div className="work_works">
          {transcriptions.map((work, i) => {
            if (work.node.locale !== locale) return '';
            return (
              <SingleWork
                key={`work-${i}`}
                props={props}
                product={work}
                query={query}
                i={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    cartModal: state.cartModal,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addToCart: (work) => dispatch(addToCart(work)),
    handleCartModal: (bool) => dispatch(handleCartModal(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(IndexPage);
