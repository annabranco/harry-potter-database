import React from 'react'

class Filters extends React.Component {


  render () {

    return (
      <div className="filtersBox">
        <div className="header__filters--box">

          <input type="text" className="header__searchField" onChange={this.props.searchCharacter} placeholder="Filtrar por nombre" defaultValue={this.props.searchString}/>
        </div>

        <div className="header__filters--box">
          <select name="header__select" className="header__select" onChange={this.props.filterByHouse} defaultValue={this.props.searchByHouse}>
            <option value="" className="header__options" defaultValue hidden></option>
            <option value="Gryffindor" className="header__options">Gryffindor</option>
            <option value="Hufflepuff" className="header__options">Hufflepuff</option>
            <option value="Ravenclaw" className="header__options">Ravenclaw</option>
            <option value="Slytherin" className="header__options">Slytherin</option>
            <option value="SIN CASA" className="header__options"> - Sin casa - </option>
          </select>
        </div>

        <div className="header__filters--box">
          <input className="header__checkbox" type="checkbox" name='alive' onClick={this.props.filterByDead} defaultChecked={this.props.searchAliveOrDead.alive} /><span className="header__checkbox-text">Vivos</span>
          <input className="header__checkbox" type="checkbox" name='dead' onClick={this.props.filterByDead} defaultChecked={this.props.searchAliveOrDead.dead} /><span className="header__checkbox-text">Muertos</span>
        </div>
        <button className="header__resetButton" onClick={this.props.resetFilters}>Resetear filtros</button>
      </div>
    );
  }

}

export default Filters;
