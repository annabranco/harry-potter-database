import React from 'react'

class CharacterCard extends React.Component {

  render () {

    return (

      <React.Fragment>

        {this.props.characters
          .filter(character => {
            return character.name.toLowerCase().includes(this.props.searchString.toLowerCase())
          })

          .map(character => {

              let characterId = character.name;
              characterId = characterId.replace(/ /g,'').toLowerCase();

            return (
              <li className="characterCard" key={characterId} id={characterId}>
                <img src={character.image} alt={character.name} className="characterCard__photo"/>
                <h2 className="characterCard__name">{character.name}</h2>
                <p className="characterCard__house">{character.house}</p>
              </li>
            )}
          )}

        </React.Fragment>

      );
    }

  }

  export default CharacterCard;
