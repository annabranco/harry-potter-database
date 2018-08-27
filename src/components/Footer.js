import React from 'react';
import '../styles/Footer.css';
import logoReact from '../images/logo-react.svg';
import logoAdalab from '../images/logo-adalab.png';
import logoHPapi from '../images/logo-hp-api.png';
import logoAnnaBranco from '../images/logo-anna-rabbit.gif';

class Footer extends React.Component {

  render () {

    return (

      <React.Fragment>

        <div className="footer__outer">
          <div className="footer__inner">
            <p className="footer__text">Developer</p>
            <a href="https://twitter.com/AnyaBranco" target="_Blank">
                <img src={logoAnnaBranco} alt="Anna Branco" className="footer__anna--img"/>
            </a>
          </div>

          <div className="footer__inner">
            <p className="footer__text">Made possible by</p>
            <a href="https://www.adalab.es" target="_Blank">
                <img src={logoAdalab} alt="Adalab" className="footer__adalab__img"/>
            </a>
          </div>

          <div className="footer__inner">
            <p className="footer__text">Technology</p>
            <img src={logoReact} alt="React.js" className="footer__react--img"/>
          </div>

          <div className="footer__inner">
            <p className="footer__text">Powered by</p>
            <a href="http://hp-api.herokuapp.com" target="_Blank">
                <img src={logoHPapi} alt="hp-api.herokuapp.com" className="footer__powered--img"/>
            </a>
          </div>

        </div>
        <p className="footer__version">v1.2.0</p>

      </React.Fragment>
    );
  }
}

export default Footer;
