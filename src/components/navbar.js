import React, { useState } from 'react';
import { Link } from 'gatsby';

const links = [
  { title: 'Shop', url: 'shop' },
  { title: 'About', url: 'about' },
  { title: 'Contact', url: 'contact' },
];

const locales = [
  { text: '🇬🇧', loc: 'en' },
  { text: '🇩🇪', loc: 'de' },
  { text: '🇱🇺', loc: 'de-LU' },
  { text: '🇫🇷', loc: 'fr' },
];

const Navbar = () => {
  const [current, setCurrent] = useState('en');
  const [page, setPage] = useState('/');

  const clickHandlerLocale = (locale) => {
    setCurrent(locale);
  };

  const clickHandlerPage = (url) => {
    setPage(url);
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
                onClick={() => clickHandlerPage(`/${link.url}`)}
              >
                {link.title}
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
                onClick={() => clickHandlerLocale(`${l.loc}`)}
                id={current}
                to={page}
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
