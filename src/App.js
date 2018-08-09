import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ShowCharacters from './components/ShowCharacters';
import ShowDetails from './components/ShowDetails';
import './App.css';

const url = 'http://hp-api.herokuapp.com/api/characters';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      characters: [],
      searchString: '',
      searchResults:[]
    }

    this.searchCharacter = this.searchCharacter.bind(this);
    this.filterCharacters = this.filterCharacters.bind(this);

  }

  componentDidMount() {
    if (localStorage.getItem('API Harry Potter DB search')) {
      this.setState({
        characters: JSON.parse(localStorage.getItem('API Harry Potter DB search'))
      })
    } else {
      this.fetchCharacters();
    }
  }

    fetchCharacters() {
      fetch(url)
      .then (response => response.json())
      .then (responseJson => {
        this.setState({
          characters: responseJson
        })
        this.manageComplementaryData();
      }
    );
  }

  manageComplementaryData() { //Manages ID, incomplete data and other information
    const charactersArray = this.state.characters;
    for (const character of charactersArray) {

      //======== Determines characters' IDs and updates state
      let characterNameId = character.name;
      //-- Generates ID based on character's name. ex: harry-potter
      characterNameId = characterNameId.replace(/ /g,'-').toLowerCase();

      //-- adds random number on the end of character's ID to prevent diplicates. ex: harry-potter-398
      character.id = characterNameId + '-' + (Math.floor(Math.random()*1000));

      //======== Manages empty House information
      if (character.house === '') {
        character.house = 'SIN CASA';
      }
      //======== Manages empty Patronus information
      if (character.patronus === '') {
        character.patronus = 'Desconocido o inexistente';
      }
    }

  this.setState({
    characters: charactersArray
  });
  //======== Saves to localStorage
  localStorage.setItem('API Harry Potter DB search', JSON.stringify(charactersArray));


}

searchCharacter(e) {
  this.setState({
    searchString: e.currentTarget.value
  })
  setTimeout(this.filterCharacters,1); // Without Timeout, the filterCharacters method doesn't get the updated searchString value. I can't solve it any other way.
}

//======== Filter characters by the input value (ignores case)
filterCharacters() {
  const searchResults = this.state.characters.filter(character => {
    return character.name.toLowerCase().includes(this.state.searchString.toLowerCase())
  })
  this.setState({
    searchResults: searchResults
  })
}

render() {

  return (

    <div className="App">

      <Header />
      <Switch>
        <Route exact path='/' render={
          () => <ShowCharacters
            searchCharacter={this.searchCharacter}
            characters={this.state.characters}
            searchString={this.state.searchString}
            searchResults={this.state.searchResults}
          />}
        />
        <Route path='/character/:id' render={
          (props) => <ShowDetails
            match={props.match}
            characters={this.state.characters}
          />}
        />
      </Switch>


    </div>
  );
}

}

export default App;
