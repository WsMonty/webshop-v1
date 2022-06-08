import React from 'react';
import { Link } from 'gatsby';
import { setLocale } from '../actions/index.js';
import { connect } from 'react-redux';

const Navbar = (props) => {
  const localeChanger = (e) => {
    props.setLocale(document.getElementById('nav_locales_select').value);
  };

  const setSelected = (e) => {
    e.target
      .closest('.navbar_list')
      .childNodes.forEach((link) =>
        link.firstChild.classList.remove('selected')
      );
    e.target.classList.add('selected');
  };

  return (
    <div className="navbar">
      <ul className="navbar_list">
        {links.map((link, i) => {
          return (
            <li className="link_list" key={`link_${i + 1}`}>
              <Link
                className="link"
                to={`/${link.url}`}
                onClick={(e) => setSelected(e)}
              >
                {link[`title-${props.locale}`]}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="locales_list">
        <select
          id="nav_locales_select"
          onChange={(e) => localeChanger(e)}
          value={props.locale}
        >
          <option id="en" value={locales[0].loc}>
            {locales[0].text}
          </option>
          <option id="de" value={locales[1].loc}>
            {locales[1].text}
          </option>
          <option id="de-LU" value={locales[2].loc}>
            {locales[2].text}
          </option>
          <option id="fr" value={locales[3].loc}>
            {locales[3].text}
          </option>
        </select>
      </div>
      {/* <ul className="locales_list">
        {locales.map((l) => {
          return (
            <li key={l.loc} className="link_list locale_link_list">
              <Link
                className="locale_link"
                onClick={() => dispatch(setLocale(`${l.loc}`))}
                to={''}
              >
                {l.text}
              </Link>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

const links = [
  {
    'title-en': 'Works',
    'title-de': 'Werke',
    'title-de-LU': 'Wierker',
    'title-fr': 'Oeuvres',
    url: 'works',
  },
  {
    'title-en': 'Composers',
    'title-de': 'Komponisten',
    'title-de-LU': 'Komponisten',
    'title-fr': 'Componistes',
    url: 'composers',
  },
  {
    'title-en': 'About',
    'title-de': 'Über',
    'title-de-LU': 'Iwwer',
    'title-fr': 'Infos',
    url: 'about',
  },
  {
    'title-en': 'Contact',
    'title-de': 'Kontakt',
    'title-de-LU': 'Kontakt',
    'title-fr': 'Contact',
    url: 'contact',
  },
];

const locales = [
  { text: '🇬🇧', loc: 'en' },
  { text: '🇩🇪', loc: 'de' },
  { text: '🇱🇺', loc: 'de-LU' },
  { text: '🇫🇷', loc: 'fr' },
];

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    locale: state.locale,
    cartModal: state.cartModal,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    setLocale: (locale) => dispatch(setLocale(locale)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Navbar);
