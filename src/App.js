import React, { Component } from 'react';
import './App.css';

const url = 'http://hp-api.herokuapp.com/api/characters';


class App extends Component {

  constructor(props) {

    super(props)

    this.state = {
      characters: [],
      searchString: ''
    }
    this.searchCharacter = this.searchCharacter.bind(this);
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters() {
    fetch(url)
    .then (response => response.json())
    .then (responseJson => {
      console.log(responseJson);
      this.setState({
        characters: responseJson
      })
    }
  );
}

searchCharacter(e) {
  this.setState({
    searchString: e.currentTarget.value
  })
}

render() {
  return (
    <div className="App">
      <header className="header__box">
        <h1 className="header__title">Harry Potter Characters</h1>
        <input type="text" className="header__searchField" onChange={this.searchCharacter}/>
      </header>
      <main className="main__box">
        <ul className="main__cardsArea">

          {this.state.characters
            .filter(character => {
              return character.name.toLowerCase().includes(this.state.searchString.toLowerCase())
            })
            
            .map(character => {
              return (
                <li className="characterCard">
                  <img src={character.image} alt={character.name} className="characterCard__photo"/>
                  <h2 className="characterCard__name">{character.name}</h2>
                  <p className="characterCard__house">{character.house}</p>
                </li>
              )}
            )}

          </ul>
        </main>


        <p>Hola</p>
      </div>
    );
  }
}

export default App;
