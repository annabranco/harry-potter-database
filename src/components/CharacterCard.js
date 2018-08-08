import React from 'react';
import { Link } from 'react-router-dom';


class CharacterCard extends React.Component {

  render () {

    return (

      <React.Fragment>

        {this.props.characters
          .filter(character => {
            return character.name.toLowerCase().includes(this.props.searchString.toLowerCase())
          })

          .map(character => {
            return (
              <Link to={'character/' + character.id}>
              <li className="characterCard" key={character.id} id={character.id}>
                <img src={character.image} alt={character.name} className="characterCard__photo"/>
                <h2 className="characterCard__name">{character.name}</h2>
                <p className="characterCard__house">{character.house}</p>
              </li>
            </Link>
          )}
        )}

      </React.Fragment>

    );
  }

}

export default CharacterCard;
