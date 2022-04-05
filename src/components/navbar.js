import React from 'react';
import { Link } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { setLocale } from '../actions/index.js';

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

const Navbar = () => {
  const dispatch = useDispatch();

  const locale = useSelector((state) => state.locale);

  return (
    <div className="navbar">
      <ul className="navbar_list">
        {links.map((link, i) => {
          return (
            <li className="link_list" key={`link_${i + 1}`}>
              <Link className="link" to={`/${link.url}`}>
                {link[`title-${locale}`]}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="locales_list">
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
      </ul>
    </div>
  );
};

export default Navbar;
