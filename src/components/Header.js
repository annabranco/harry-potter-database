import React from 'react'
import '../styles/Header.css';
import hpTitle from '../images/hp-title.png';

class Header extends React.Component {

  render () {

    return (

      <header className="header__box">

        <img src={hpTitle} alt="Harry Potter title" className="header__img"/>
        <h1 className="header__title">Characters</h1>

      </header>

    );
  }

}

export default Header;
