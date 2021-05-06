import React from 'react';
import logo from '../images/logo-mesto.svg';


function Header() {
  return (
    <header className="header page__section">
      <img className="header__logo" src={logo} alt="Логотип" />
    </header >
  )
}

export default Header;