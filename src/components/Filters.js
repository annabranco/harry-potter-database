import React from 'react'
import Gryffindor from '../images/gryffindor.png';
import Hufflepuff from '../images/hufflepuff.png';
import Ravenclaw from '../images/ravenclaw.png';
import Slytherin from '../images/slytherin.png';
import Hogwarts from '../images/hogwarts.png';

let houseIcon;

class Filters extends React.Component {


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
            <label className="header__label" htmlFor="byName">Filtrar por nombre</label>
            <input type="text" id="byName" className="header__searchField" onChange={this.props.searchCharacter} placeholder="Filtrar por nombre" defaultValue={this.props.searchString}/>
          </div>

          <div className="header__filters--box">
            <label className="header__label" htmlFor="byHouse">Filtrar por casa</label>
            <div className="header__select--box">
              <select name="header__select" id="byHouse" className="header__select" onChange={this.props.filterByHouse} defaultValue={this.props.searchByHouse}>
                <option value="" id="select_all" className="header__options" defaultValue >Ver todas</option>
                <option value="Gryffindor" className="header__options">Gryffindor</option>
                <option value="Hufflepuff" className="header__options">Hufflepuff</option>
                <option value="Ravenclaw" className="header__options">Ravenclaw</option>
                <option value="Slytherin" className="header__options">Slytherin</option>
                <option value="SIN CASA" className="header__options"> - Sin casa - </option>
              </select>
              <img src={houseIcon} alt={`Icono de ${this.props.searchByHouse}`} className="header__select--icon"/>
            </div>
          </div>

          <div className="header__filters--box header__byStatus--box">
            <label className="header__label" htmlFor="byStatus">Filtrar por estado</label>
            <div className="header__checkboxes">
              <input className="header__checkbox" id="byStatus" type="checkbox" name='alive' onClick={this.props.filterByDead} defaultChecked={this.props.searchAliveOrDead.alive} /><span className="header__checkbox-text">Vivos</span>
              <input className="header__checkbox" type="checkbox" name='dead' onClick={this.props.filterByDead} defaultChecked={this.props.searchAliveOrDead.dead} /><span className="header__checkbox-text">Muertos</span>
            </div>
          </div>
          <div className="header__filters--box resetButton--box">
            <button className="header__resetButton" onClick={this.props.resetFilters}>Resetear filtros</button>
          </div>
        </div>
      </div>
    );
  }

}

export default Filters;
