import React from 'react';

let characterToDisplay;
let deadOrALive;

class ShowDetails extends React.Component {
  constructor(props) {
    super(props)

    this.getCharacter = this.getCharacter.bind(this)
  }

  componentWillMount() {
    this.getCharacter();
  }

  getCharacter() {
    for (const character of this.props.characters) {
      if (character.id === this.props.match.params.id) {
        characterToDisplay = character;
      }
    }

    console.log(characterToDisplay);

    let genderEnding;
    if (characterToDisplay.gender === 'female') {
      genderEnding = 'A';
    } else {
      genderEnding = 'O';
    }

    if (characterToDisplay.alive) {
      deadOrALive = `VIV${genderEnding}`;
    } else {
      deadOrALive = `MUERT${genderEnding}`;
    }
  }

  render () {

    return (
      
      <div className="character__details--box">
        <img src={characterToDisplay.image} alt="" className="character__details--photo"/>
        <div className="character__details--infoBox">
          <h2 className="character__details--name">{characterToDisplay.name}</h2>
          <ul className="character__details--infoList">
            <li className="character__details--infoItem">
              <p className="character__details--item">Casa: {characterToDisplay.house}</p>
            </li>
            <li className="character__details--infoItem">
              <p className="character__details--item">Nacimiento: {characterToDisplay.yearOfBirth}</p>
            </li>
            <li className="character__details--infoItem">
              <p className="character__details--item">Patronus: {characterToDisplay.patronus.charAt(0).toUpperCase() + characterToDisplay.patronus.slice(1)}</p>
            </li>
            <li className="character__details--infoItem">
              <p className="character__details--item">Estado: {deadOrALive} </p>
            </li>
          </ul>
        </div>
      </div>

    );
  }

}

export default ShowDetails;
