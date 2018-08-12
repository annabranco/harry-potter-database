import React from 'react';
import Gryffindor from '../images/gryffindor.png';
import Hufflepuff from '../images/hufflepuff.png';
import Ravenclaw from '../images/ravenclaw.png';
import Slytherin from '../images/slytherin.png';
import Hogwarts from '../images/hogwarts.png';
import favorites from '../images/favorites.png';


let houseIcon;

class FiltersItems extends React.Component {

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

      <div className="filterBox--outer">

        <div className="filtersBox">

          <div className="header__filters--box header__byName--box">
            <label className="header__label header__label-byFavorite" htmlFor="byFavorites">Favorites only</label>
            <img src={favorites} alt="" className={`header__filters--favorites-img  ${this.props.seachByFavorites === "yes" && "favorited"}`} onClick={this.props.filterByFavorites}/>
          </div>

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
            <label className="header__label" htmlFor="byStatus">Filter by status</label>
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

    );
  }

}

export default FiltersItems;
