import React from 'react'

class Filters extends React.Component {

  render () {

    return (

      <header className="header__box">
        <h1 className="header__title">Harry Potter Characters</h1>
        <input type="text" className="header__searchField" onChange={this.props.searchCharacter}/>
      </header>


    );
  }

}

export default Filters;
