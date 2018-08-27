import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShowDetails.css';
import Gryffindor from '../images/gryffindor.png';
import Hufflepuff from '../images/hufflepuff.png';
import Ravenclaw from '../images/ravenclaw.png';
import Slytherin from '../images/slytherin.png';
import Hogwarts from '../images/hogwarts.png';
import back from '../images/back.gif';
import favorites from '../images/favorites.png';

let characterToDisplay;
let housePicture;
let deadIcon;
let himHer;
const clickBack = new Audio('http://freesound.org/data/previews/240/240476_1662097-lq.mp3');
const favRemove = new Audio('http://freesound.org/data/previews/394/394432_5121236-lq.mp3');
const favAdd = new Audio('http://freesound.org/data/previews/170/170720_105499-lq.mp3');


class ShowDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorite: false
    }

    this.getCharacter = this.getCharacter.bind(this)
  }

  soundBack = () => {
    clickBack.volume = 1;
    clickBack.play()
  }

  componentWillMount() {
    this.getCharacter();
  }

  // Identifies selected character to print her/his details
  getCharacter() {
    for (const character of this.props.characters) {
      if (character.id === this.props.match.params.id) { //Compares IDs
        characterToDisplay = character;
      }
    }

    // Determines Icon fon deceased
    if (characterToDisplay.alive === 'alive') {
      deadIcon = '';
    } else {
      deadIcon = '☠️';
    }

    // Determines HER for female and HIM for male
    if (characterToDisplay.gender === 'female') {
      himHer = 'her';
    } else {
      himHer = 'him';
    }

    // Determines if the component is about a favorite character
    if (characterToDisplay.favorite === 'yes') {
      this.setState({
        favorite: 'yes'
      })
    } else {
      this.setState({
        favorite: 'no'
      })
    }

    //Determines image of the House crest to print it on the info box
    if (characterToDisplay.house === 'Gryffindor') {
      housePicture = Gryffindor;
    } else if (characterToDisplay.house === 'Hufflepuff') {
      housePicture = Hufflepuff;
    } else if (characterToDisplay.house === 'Ravenclaw') {
      housePicture = Ravenclaw;
    } else if (characterToDisplay.house === 'Slytherin') {
      housePicture = Slytherin;
    } else {
      housePicture = Hogwarts;
    }
  }

  //======== Add to favorites
  add2Favorites = () => {
    this.props.saveFavorite(characterToDisplay.id)

    // Changes the state of the component
    if (this.state.favorite === 'yes') {
      this.setState({
        favorite: 'no'
      })
      favRemove.currentTime = 0.3;
      favRemove.volume = 0.5;
      favRemove.play();
    } else {
      this.setState({
        favorite: 'yes'
      })
      favAdd.currentTime = 1.1;
      favAdd.volume = 0.4;
      favAdd.play();
    }
  }


  render () {

    return (

      <React.Fragment>

        {characterToDisplay.favorite === 'yes' &&  (
          <div className="favorite__container">
            <h3 className="favorite__text-important">{characterToDisplay.name} is one of your favorite characters</h3>
            <p className="favorite__text">Click on its card to remove {himHer} from your favorites</p>
          </div>
        )}
        {characterToDisplay.favorite === 'no' &&  (
          <div className="favorite__container">
            <p className="favorite__text">Click on the card to add {characterToDisplay.name} to your favorites.</p>
          </div>
        )}

        <div className="character__details--box" onClick={this.add2Favorites}>
          <img src={favorites} alt="Favorite icon" className={`favorite__icon--details  ${characterToDisplay.favorite === 'yes' && "favorited"}`}/>
          <div className="character__details--photoBox" style={{backgroundImage: "url(" + characterToDisplay.image + ")"}}>
            <img src={characterToDisplay.image} alt="" className="character__details--photo"/>
          </div>
          <div className={`character__details--infoBox  ${characterToDisplay.favorite === 'yes' && "favorited"}`}>
            <h2 className="character__details--name"><span className="status">{deadIcon}</span> {characterToDisplay.name}</h2>
            <ul className="character__details--infoList">
              <li className="character__details--infoItem">
                <p className="character__details--item">House: {characterToDisplay.house}</p>
              </li>
              <li className="character__details--infoItem">
                <p className="character__details--item">Birth: {characterToDisplay.yearOfBirth}</p>
              </li>
              <li className="character__details--infoItem">
                <p className="character__details--item">Patronus: {characterToDisplay.patronus.charAt(0).toUpperCase() + characterToDisplay.patronus.slice(1)}</p>
              </li>
              <li className="character__details--infoItem">
                <p className="character__details--item">Status: {characterToDisplay.alive} </p>
              </li>
              <li className="character__details--infoItem">
                <img className="house__crest" src={housePicture} alt={characterToDisplay.house} />
              </li>
            </ul>
          </div>
        </div>

        <div className="back--box">
          <Link to='/' className="link back--box" onClick={this.soundBack}>
          <img src={back} alt="" className="photo__back"/>
          <p className="text__back">Go back</p>
        </Link>
      </div>

    </React.Fragment>
  );
}
}

export default ShowDetails;
