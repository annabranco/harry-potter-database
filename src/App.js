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
      this.setState({
        characters: responseJson
      })
      this.setCharactersId();
    }
  );
}

setCharactersId() { //Determines characters' IDs and updates state
  const charactersArray = this.state.characters;
  for (const character of charactersArray) {

    let characterNameId = character.name;
    characterNameId = characterNameId.replace(/ /g,'-').toLowerCase(); //id ex: harry-potter
    character.id = characterNameId + '-' + (Math.floor(Math.random()*1000));

    if (character.house === '') {
      character.house = 'SIN CASA';
  }
}

  this.setState({
    characters: charactersArray
  })
}

searchCharacter(e) {
  this.setState({
    searchString: e.currentTarget.value
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
