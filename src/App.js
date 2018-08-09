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
      searchResults:[],
      searchByHouse: '',
      searchAliveOrDead: {alive: true, dead: true}, //[display alive, display dead]
      searchCharactersIsAlive: ''
    }

    this.searchCharacter = this.searchCharacter.bind(this);
    this.filterCharacters = this.filterCharacters.bind(this);
    this.filterByHouse = this.filterByHouse.bind(this);
    this.filterByDead = this.filterByDead.bind(this);
  }

  componentDidMount() {

    //======== Verifica si ya existe el resultado del fetch en el state
    if (this.state.characters.length > 0) {
      this.manageComplementaryData();
    }
    //======== Verifica si ya existe el resultado del fetch en localStorage
    if (localStorage.getItem('API Harry Potter DB search')) {
      this.setState({
        characters: JSON.parse(localStorage.getItem('API Harry Potter DB search'))
      })
    } else {
      this.fetchCharacters();
    }
  }

  fetchCharacters() {
    alert('fetching');
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
    //======== Set "estado" (vivo/a o muerto/a) in Spanish language
    //---- Determines ending of adjectives for Spanish gender reference
    let genderEnding;
    if (character.gender === 'female') {
      genderEnding = 'a';
    } else {
      genderEnding = 'o';
    }
    //---- Determines the correct adjective in Spanish
    if (character.alive) {
      character.estado = `viv${genderEnding}`;
    } else {
      character.estado = `muert${genderEnding}`;
    }
  }

  //======== Save all info on the state
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

temp() {
}

//======== Filter characters
filterCharacters() {

  //---- Filters by name (ignores case) - input
  const searchResultsbyName = this.state.characters.filter(character => { return character.name.toLowerCase().includes(this.state.searchString.toLowerCase())
  });

  //---- Filters by house - select
  const searchResultsbyHouse = searchResultsbyName.filter(character => character.house.includes(this.state.searchByHouse)
);

//---- Filters by alive and/or deceased - checkbox
const finalSearch = searchResultsbyHouse.filter(character => character.estado.includes(this.state.searchCharactersIsAlive)
);

this.setState({
  searchResults: finalSearch
});

}

filterByHouse(e) {

const eventValue = e.currentTarget.value;

  setTimeout(() => {
    this.setState({ searchByHouse: eventValue });
    this.filterCharacters();
  },1);

}

filterByDead(e) {

  //---- determines on searchAliveOrDead state what conditions are to me met (dead/aline)
  this.setState({
    searchAliveOrDead: { ...this.state.searchAliveOrDead, [e.currentTarget.name]: e.currentTarget.checked }
  })

  //--- verifies what above conditions are to be met and and saves to state a search string for dead and/or alive
  setTimeout(() => { // Trying ternary conditional...
    this.state.searchAliveOrDead.alive && this.state.searchAliveOrDead.dead
    ? this.setState({ searchCharactersIsAlive: '' })
    : this.state.searchAliveOrDead.alive
    ? this.setState({ searchCharactersIsAlive: 'viv' })
    : this.state.searchAliveOrDead.dead
    ? this.setState({ searchCharactersIsAlive: 'muert' })
    : this.setState({ searchCharactersIsAlive: 'no one' })

    this.filterCharacters();
  },1);

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
            filterCharacters={this.filterCharacters}
            filterByHouse={this.filterByHouse}
            searchByHouse={this.state.searchByHouse}
            filterByDead={this.filterByDead}
            searchCharactersIsAlive={this.state.searchCharactersIsAlive}
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
