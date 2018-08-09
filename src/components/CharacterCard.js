import React from 'react';
import { Link } from 'react-router-dom';


class CharacterCard extends React.Component {

  render () {

    if ((this.props.searchString !== '' || this.props.searchCharactersIsAlive !== '') && this.props.searchResults.length === 0) {
      return (
        <React.Fragment>
          <p className="no__results">Su filtro no retornó ningún resultado</p>
          <img src="https://cdn.dribbble.com/users/476102/screenshots/2444896/hogwarts.gif" alt="No results" className="no__results--image"/>
        </React.Fragment>
      );
    } else {

      return (
        <React.Fragment>

          {this.props.characters
            .filter(character => character.name.toLowerCase().includes(this.props.searchString.toLowerCase()))
            .filter(character => character.house.includes(this.props.searchByHouse))
            .filter(character => character.estado.includes(this.props.searchCharactersIsAlive))
            .map(character => {
              return (
                <Link to={'character/' + character.id} className="link">
                <li className="characterCard" key={character.id} id={character.id}>
                  <div className="characterCard__photo-box" style={{backgroundImage: "url(" + character.image + ")"}}>
                    <img src={character.image} alt={character.name} className="characterCard__photo"/>
                  </div>
                  <div className="characterCard__info">
                    <h2 className="characterCard__name">{character.name}</h2>
                    <p className="characterCard__house">{character.house}</p>
                  </div>
                </li>
              </Link>
            )}
          )}

        </React.Fragment>
      );
    }
  }
}

export default CharacterCard;
