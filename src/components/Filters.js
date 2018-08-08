import React from 'react'

class Filters extends React.Component {

  render () {

    return (

        <input type="text" className="header__searchField" onChange={this.props.searchCharacter}/>

    );
  }

}

export default Filters;
