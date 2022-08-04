import React from 'react';
import ShoppingCart from './shoppingCart.js';
import { Link } from 'gatsby';
import { setLocale } from '../actions/index.js';
import { connect } from 'react-redux';
import { RiMenu5Fill } from 'react-icons/ri';
import languages from '../languages/languages.js';
import { StaticImage } from 'gatsby-plugin-image';

const Navbar = ({ setLocale, locale }) => {
  // Change language on site
  const localeChanger = (e) => {
    setLocale(document.getElementById('nav_locales_select').value);
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
      e.target.dataset.name !== 'works'
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
    if (window.innerWidth > 600) return;
    if (
      !document.querySelector('.navbar').classList.contains('mobile_nav_active')
    ) {
      document.querySelector('.locales_list').classList.add('hidden_slow');
      document.querySelector('.cart').classList.add('hidden_slow');
      document.querySelector('.navbar_logo').classList.add('hidden_slow');
    } else {
      setTimeout(() => {
        document.querySelector('.locales_list').classList.remove('hidden_slow');
        document.querySelector('.cart').classList.remove('hidden_slow');
        document.querySelector('.navbar_logo').classList.remove('hidden_slow');
      }, 800);
    }
    document.querySelector('.navbar').classList.toggle('mobile_nav_active');
    closeWorksOptions();
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
    if (e) deSelect(e);
    document.querySelector('.navbar_works_options').style.height = '0';

    document
      .querySelector('.navbar_works_options_list')
      .classList.add('hidden');
  };

  const deactivateNavbar = () => {
    document
      .querySelectorAll('.link')
      .forEach((link) => link.classList.remove('selected'));

    closeWorksOptions();
  };

  return (
    <div className="navbar">
      <button className="navbar_hamburger_btn" onClick={hamburgerHandler}>
        <RiMenu5Fill className="navbar_hamburger" />
      </button>
      <Link to="/" onClick={deactivateNavbar}>
        <StaticImage
          className="navbar_logo"
          src="../images/logo_white.png"
          alt="Logo for the Webshop"
          placeholder="blurred"
          layout="constrained"
          width={75}
          style={{
            zIndex: '100',
          }}
        />
      </Link>
      <ul className="navbar_list">
        <li className="link_list">
          <button
            className="link navbar_works_link"
            data-name="works"
            onClick={(e) => {
              document
                .querySelector('.navbar_works_options_list')
                .classList.contains('hidden')
                ? showWorksOptions(e)
                : closeWorksOptions(e);
            }}
          >
            {allWorks[locale]}
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
                    hamburgerHandler();
                  }}
                >
                  {languages.showAllWorks[locale]}
                </Link>
              </li>
              <li className="navbar_works_options_link">
                <Link
                  className="navbar_works_options_link"
                  to="/works/categories"
                  onClick={(e) => {
                    closeWorksOptions(e);
                    hamburgerHandler();
                  }}
                >
                  {languages.categories[locale]}
                </Link>
              </li>
              <li>
                <Link
                  className="navbar_works_options_link"
                  to="/composers"
                  onClick={(e) => {
                    closeWorksOptions(e);
                    hamburgerHandler();
                  }}
                >
                  {languages.composers[locale]}
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
                {link[`title-${locale}`]}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="navbar_right_icons">
        <div className="locales_list">
          <select
            id="nav_locales_select"
            onChange={(e) => localeChanger(e)}
            value={locale}
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
        <div className="cart_icon_container">
          <ShoppingCart />
        </div>
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
