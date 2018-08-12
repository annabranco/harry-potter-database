import React from 'react'
import Gryffindor from '../images/gryffindor.png';
import Hufflepuff from '../images/hufflepuff.png';
import Ravenclaw from '../images/ravenclaw.png';
import Slytherin from '../images/slytherin.png';
import Hogwarts from '../images/hogwarts.png';
import parchmentLeft from '../images/parchment-left.png';
import parchmentRight from '../images/parchment-right.png';

let houseIcon;
const scrollOpen = new Audio('http://freesound.org/data/previews/377/377086_3728489-lq.mp3');
const scrollClose = new Audio('http://freesound.org/data/previews/416/416179_5121236-lq.mp3');

class Filters extends React.Component {

  openScroll = () => {
    scrollOpen.currentTime = 0;
    scrollOpen.volume = 0.1;
    scrollOpen.pause()
    scrollOpen.play()
  }
  closeScroll = () => {
    scrollClose.currentTime = 0;
    scrollOpen.pause()
    scrollClose.play()
  }

  render () {

    //Determines image of the House crest to print on the select icon
    if (this.props.searchByHouse === 'Gryffindor') {
      houseIcon = Gryffindor;
    } else if (this.props.searchByHouse === 'Hufflepuff') {
      houseIcon = Hufflepuff;
    } else if (this.props.searchByHouse === 'Ravenclaw') {
      houseIcon = Ravenclaw;
    } else if (this.props.searchByHouse === 'Slytherin') {
      houseIcon = Slytherin;
    } else {
      houseIcon = Hogwarts;
    }


    return (

      <div className="parchment__outer">
        <div className="parchment" onMouseOver={this.openScroll} onMouseOut={this.closeScroll}>

          <div className="parchmentLeftDIV">
            <img src={parchmentLeft} alt="" className="parchmentLeft"/>
          </div>

          <div className="parchmentMiddleDIV">

            <div className="filterBox--outer">

              <div className="filtersBox">
                <div className="header__filters--box header__byName--box">
                  <label className="header__label" htmlFor="byName">Filter by name</label>
                  <input type="text" id="byName" className="header__searchField" onChange={this.props.searchCharacter} placeholder="Ex. Harry" defaultValue={this.props.searchString}/>
                </div>

                <div className="header__filters--box">
                  <label className="header__label header__label-byHouse" htmlFor="byHouse">Filter by House</label>
                  <div className="header__select--box">
                    <select name="header__select" id="byHouse" className="header__select" onChange={this.props.filterByHouse} defaultValue={this.props.searchByHouse}>
                      <option value="" id="select_all" className="header__options" defaultValue >See all</option>
                      <option value="Gryffindor" className="header__options">Gryffindor</option>
                      <option value="Hufflepuff" className="header__options">Hufflepuff</option>
                      <option value="Ravenclaw" className="header__options">Ravenclaw</option>
                      <option value="Slytherin" className="header__options">Slytherin</option>
                      <option value=" " className="header__options"> - No house - </option>
                    </select>
                    <img src={houseIcon} alt={`Icono de ${this.props.searchByHouse}`} className="header__select--icon"/>
                  </div>
                </div>

                <div className="header__filters--box header__byStatus--box">
                  <label className="header__label" htmlFor="byStatus">Filtrar by status</label>
                  <div className="header__checkboxes">
                    <input className="header__checkbox" id="byStatus" type="checkbox" name='alive' onClick={this.props.filterByDead} defaultChecked={this.props.searchAliveOrDead.alive} /><span className="header__checkbox-text">Alive</span>
                    <input className="header__checkbox" type="checkbox" name='dead' onClick={this.props.filterByDead} defaultChecked={this.props.searchAliveOrDead.dead} /><span className="header__checkbox-text">Deceased</span>
                  </div>
                </div>

                <div className="header__filters--box resetButton--box">
                  <button className="header__resetButton" onClick={this.props.resetFilters}>Reset filters</button>
                </div>

              </div>
            </div>
          </div>

          <div className="parchmentRightDIV">
            <img src={parchmentRight} alt="" className="parchmentRight"/>
          </div>

        </div>
      </div>

    );
  }
}

export default Filters;
