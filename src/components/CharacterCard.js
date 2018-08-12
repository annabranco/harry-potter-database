import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CharacterCard.css';
import noresults from '../images/noresults.gif';
import favorites from '../images/favorites.png';


const hoverCard = new Audio('http://freesound.org/data/previews/97/97470_1087455-lq.mp3');
const selectCard = new Audio('http://freesound.org/data/previews/172/172331_3133255-lq.mp3');


class CharacterCard extends React.Component {

  hoverCharacter = () => {
    hoverCard.volume = 0.2;
    hoverCard.currentTime = 0;
    hoverCard.play();
  }
  selectCharacter = () => {
    selectCard.volume = 0.4;
    selectCard.currentTime = 0;
    selectCard.play();
  }

  render () {

    if ((this.props.searchString !== '' || this.props.searchCharactersIsAlive !== '') && this.props.searchResults.length === 0 || this.props.seachByFavorites === "yes") {
      return (
        <React.Fragment>
          <p className="no__results">Sorry. There are no results matching your filters.</p>
          <img src={noresults} alt="No results" className="no__results--image"/>
        </React.Fragment>
      );
    } else {

      return (
        <React.Fragment>

          {this.props.characters.length > 25 &&
            this.props.characters
            .filter(character => {
if (this.props.seachByFavorites === "yes") {
return character.favorite.includes(this.props.seachByFavorites)
} else {
return character.name.length > 0
}
})
            .filter(character => character.name.toLowerCase().includes(this.props.searchString.toLowerCase()))
            .filter(character => character.house.includes(this.props.searchByHouse))
            .filter(character => character.estado.includes(this.props.searchCharactersIsAlive))
            .map(character => {
              return (
                <Link to={'character/' + character.id} className="link" onMouseOver={this.hoverCharacter} onClick={this.selectCharacter}>
                <li className="characterCard" key={character.id} id={character.id}>
                  <img src={favorites} alt="Favorite icon" className={`favorite__icon  ${character.favorite === 'yes' && "favorited"}`}/>
                  <div className="characterCard__photo-box" style={{backgroundImage: "url(" + character.image + ")"}}>
                    <img src={character.image} alt={character.name} className="characterCard__photo"/>
                  </div>
                  <div className={`characterCard__info  ${character.favorite === 'yes' && "favorited"}`}>
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
