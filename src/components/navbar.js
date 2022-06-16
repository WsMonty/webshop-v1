import React from 'react';
import ShoppingCart from './shoppingCart.js';
import { Link } from 'gatsby';
import { setLocale } from '../actions/index.js';
import { connect } from 'react-redux';
import { RiMenu5Fill } from 'react-icons/ri';

const Navbar = (props) => {
  // Change language on site
  const localeChanger = (e) => {
    props.setLocale(document.getElementById('nav_locales_select').value);
  };

  // Change color of selected link and start animation on mobile
  const setSelected = (e) => {
    e.target
      .closest('.navbar_list')
      .childNodes.forEach((link) =>
        link.firstChild.classList.remove('selected')
      );
    e.target.classList.add('selected');

    if (
      document
        .querySelector('.navbar')
        .classList.contains('mobile_nav_active') &&
      e.target.textContent !== 'Works'
    )
      hamburgerHandler();
  };

  const deSelect = (e) => {
    e.target
      .closest('.navbar_list')
      .childNodes.forEach((link) =>
        link.firstChild.classList.remove('selected')
      );
  };

  // Mobile navbar menu
  const hamburgerHandler = () => {
    document.querySelector('.navbar').classList.toggle('mobile_nav_active');
    setTimeout(() => {
      document
        .querySelector('.navbar_list')
        .classList.toggle('mobile_list_active');
    }, 600);
  };

  // Handle Works Options (Categories, Composers...)
  const showWorksOptions = (e) => {
    setSelected(e);
    document.querySelector('.navbar_works_options').style.height = '10em';
    setTimeout(() => {
      document
        .querySelector('.navbar_works_options_list')
        .classList.remove('hidden');
    }, 350);
  };

  const closeWorksOptions = (e) => {
    deSelect(e);
    document.querySelector('.navbar_works_options').style.height = '0';

    document
      .querySelector('.navbar_works_options_list')
      .classList.add('hidden');
    hamburgerHandler();
  };

  return (
    <div className="navbar">
      <button className="navbar_hamburger_btn" onClick={hamburgerHandler}>
        <RiMenu5Fill className="navbar_hamburger" />
      </button>
      <ul className="navbar_list">
        <li className="link_list">
          <button
            className="link navbar_works_link"
            onClick={(e) => {
              document
                .querySelector('.navbar_works_options_list')
                .classList.contains('hidden')
                ? showWorksOptions(e)
                : closeWorksOptions(e);
            }}
          >
            {allWorks[props.locale]}
          </button>
          <div className="navbar_works_options">
            <div></div>
            <ul className="navbar_works_options_list hidden">
              <li className="navbar_works_options_link">
                <Link
                  className="navbar_works_options_link"
                  to="/works"
                  onClick={(e) => {
                    closeWorksOptions(e);
                  }}
                >
                  Show all Works
                </Link>
              </li>
              <li className="navbar_works_options_link">
                <Link
                  className="navbar_works_options_link"
                  to="/works/categories"
                  onClick={(e) => {
                    closeWorksOptions(e);
                  }}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className="navbar_works_options_link"
                  to="/composers"
                  onClick={(e) => closeWorksOptions(e)}
                >
                  Composers
                </Link>
              </li>
            </ul>
          </div>
        </li>
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

      {/* List of flags in navbar instead of dropdown menu */}
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
      <div className="cart_icon_container">
        <ShoppingCart />
      </div>
    </div>
  );
};

const links = [
  // {
  //   'title-en': 'Composers',
  //   'title-de': 'Komponisten',
  //   'title-de-LU': 'Komponisten',
  //   'title-fr': 'Componistes',
  //   url: 'composers',
  // },
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

const allWorks = {
  en: 'Works',
  de: 'Werke',
  'de-LU': 'Wierker',
  fr: 'Oeuvres',
  url: 'works',
};

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
