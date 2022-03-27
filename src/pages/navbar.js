import React from 'react';
import { Link } from 'gatsby';

const links = [
  { title: 'Shop', url: 'shop' },
  { title: 'About', url: 'about' },
  { title: 'Contact', url: 'contact' },
];

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar_list">
        {links.map((link, i) => {
          return (
            <li className="link_list" key={`link_${i + 1}`}>
              <Link className="link" to={`/${link.url}`}>
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
