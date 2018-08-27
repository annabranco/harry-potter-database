import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ShowCharacters from './components/ShowCharacters';
import ShowDetails from './components/ShowDetails';
import Footer from './components/Footer';
import './styles/App.css';

const url = 'https://hp-api.herokuapp.com/api/characters';
const newCharacters = 'https://raw.githubusercontent.com/Adalab/dorcas-s3-evaluacion-final-annabranco/master/src/newDB/new-characters.json';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      characters: [],
      searchString: '',
      searchResults:[],
      searchByHouse: '',
      seachByFavorites: '',
      searchAliveOrDead: {alive: true, dead: true}, //[display alive, display dead]
      searchCharactersIsAlive: ''
    }

    this.searchCharacter = this.searchCharacter.bind(this);
    this.filterCharacters = this.filterCharacters.bind(this);
    this.filterByHouse = this.filterByHouse.bind(this);
    this.filterByDead = this.filterByDead.bind(this);
    this.filterByFavorites = this.filterByFavorites.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  componentDidMount() {
    //======== Verifica si ya existe el resultado del fetch en el state
    if (this.state.characters.length > 0) {
      this.manageComplementaryData();
    }
    //======== Verifica si ya existe el resultado del fetch en localStorage
    // if (localStorage.getItem('API Harry Potter DB search')) {
    //  console.log('Fetching data from localStorage');
    //   this.setState({
    //     characters: JSON.parse(localStorage.getItem('API Harry Potter DB search'))
    //   })
    // } else {
    this.fetchCharacters();
    //    }
  }

  fetchCharacters() {
    console.log('Fetching new data from API');
    fetch(url)
    .then (response => response.json())
    .then (responseJson => {
      this.setState({
        characters: responseJson
      })
      this.addMissingCharacters();
    }
  );
}

//======== Adds new characters, defined on external JSON
addMissingCharacters() {
  const charactersArray = this.state.characters;

  fetch(newCharacters)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    for (const newCharacter of data) {
      charactersArray.push(newCharacter)
    }
    this.manageComplementaryData();
  });
}

//======== Manages ID, missing data and other information for each character
manageComplementaryData() {
  const charactersArray = this.state.characters;

  for (const character of charactersArray) {
    //======== Determines characters' IDs and updates state
    let characterNameId = character.name;

    //--- Generates ID based on character's name. ex: harry-potter
    characterNameId = characterNameId.replace(/ /g,'-').toLowerCase();

    //--- adds random number on the end of character's ID to prevent diplicates. ex: harry-potter-398
    let idSufix = '';

    if (character.house === 'Gryffindor') {
      idSufix = '001';
    } else if (character.house === 'Slytherin') {
      idSufix = '002';
    } else if (character.house === 'Ravenclaw') {
      idSufix = '003';
    } else if (character.house === 'Hufflepuff') {
      idSufix = '004';
    } else {
      idSufix = '000';
    }
    character.id = characterNameId + '-' + idSufix + '-' + (Math.floor(Math.random()*1000));

    //======== Manages empty House information
    if (character.house === '') {
      character.house = ' ';
    }
    //======== Manages empty Patronus information
    if (character.patronus === '') {
      character.patronus = 'unknown';
    }

    //======== Manages empty Birth information
    if (character.yearOfBirth === '') {
      character.yearOfBirth = 'unknown';
    }

    //======== Flags as favorite if it is favorited in localStorage
    const fixedId = character.id.substring(0, character.id.length-4);

    if ( (JSON.parse(localStorage.getItem('API Harry Potter DB favorites')) !== null) && (JSON.parse(localStorage.getItem('API Harry Potter DB favorites').indexOf(fixedId) > -1)) ) {
      character.favorite = 'yes';
    } else {
      character.favorite = 'no'
    }

    //======== Set "estado" (vivo/a o muerto/a) in Spanish language
    //--- Determines ending of adjectives for Spanish gender reference
    let genderEnding;

    if (character.gender === 'female') {
      genderEnding = 'a';
    } else {
      genderEnding = 'o';
    }
    //--- Determines the correct adjective in both Spanish and English
    if (character.alive) {
      character.estado = `viv${genderEnding}`;
      character.alive = 'alive';
    } else {
      character.estado = `muert${genderEnding}`;
      character.alive = 'deceased';
    }
  }

  //======== Sorts characters alphabeticaly
  charactersArray.sort((a,b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    let comparison = 0;

    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  });
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

//======== Filter characters
filterCharacters() {

  //--- Filters by favorites
  const searchResultsbyFavorites = this.state.characters.filter(character =>  character.favorite.includes(this.state.seachByFavorites)
);

  //--- Filters by name (ignores case) - input
  const searchResultsbyName = searchResultsbyFavorites.filter(character => { return character.name.toLowerCase().includes(this.state.searchString.toLowerCase())
  });
  //--- Filters by house - select
  const searchResultsbyHouse = searchResultsbyName.filter(character => character.house.includes(this.state.searchByHouse)
);
//--- Filters by alive and/or deceased - checkbox
const finalSearch = searchResultsbyHouse.filter(character => character.estado.includes(this.state.searchCharactersIsAlive)
);
this.setState({
  searchResults: finalSearch
});
}

filterByFavorites() {
  if (this.state.seachByFavorites === '') {
    this.setState({
      seachByFavorites: 'yes'
    })
  } else {
    this.setState({
      seachByFavorites: ''
    })
  }
setTimeout(this.filterCharacters,1);
}

filterByHouse(e) {
  const eventValue = e.currentTarget.value;
  setTimeout(() => {
    this.setState({ searchByHouse: eventValue });
    this.filterCharacters();
  },1);
}

filterByDead(e) {
  //---- determines on searchAliveOrDead state what conditions are to me met (dead/alive)
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

//======== RESET filters
resetFilters() {

  document.querySelector('.header__searchField').value = '';
  document.querySelector('.header__select').value = '';
  for (const checkbox of document.querySelectorAll('.header__checkbox')){
    checkbox.checked = true;
  }

  this.setState({
    searchString: '',
    searchByHouse: '',
    searchAliveOrDead: {alive: true, dead: true},
    searchCharactersIsAlive: '',
    filterByFavorites: ''
  })
}

saveFavorite = id => {
  const fixedId = id.substring(0, id.length-4);

  for (const character of this.state.characters) {
    if (character.id.substring(0, id.length-4) === fixedId) { //Compares IDs

      if (character.favorite === 'yes') {

        character.favorite = 'no';
        let favorites = JSON.parse(localStorage.getItem('API Harry Potter DB favorites'));

        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i] === fixedId) {
            favorites.splice(i, 1);
          }
        }
        localStorage.setItem('API Harry Potter DB favorites', JSON.stringify(favorites));
      } else {
        character.favorite = 'yes';
        let favorites = JSON.parse(localStorage.getItem('API Harry Potter DB favorites'));
        favorites = [ ... favorites, fixedId];
        localStorage.setItem('API Harry Potter DB favorites', JSON.stringify(favorites));
      }
    }
  }
}

render() {

  return (

    <div className="App">

      <Header />

      <Switch>
        <Route exact path='/' render={
          () =>
          <ShowCharacters
            searchCharacter={this.searchCharacter}
            characters={this.state.characters}
            searchString={this.state.searchString}
            searchResults={this.state.searchResults}
            filterCharacters={this.filterCharacters}
            filterByHouse={this.filterByHouse}
            searchByHouse={this.state.searchByHouse}
            filterByDead={this.filterByDead}
            searchAliveOrDead={this.state.searchAliveOrDead}
            searchCharactersIsAlive={this.state.searchCharactersIsAlive}
            resetFilters={this.resetFilters}
            saveFavorite={this.saveFavorite}
            filterByFavorites={this.filterByFavorites}
            seachByFavorites={this.state.seachByFavorites}
          />}
        />
        <Route path='/character/:id' render={
          (props) => <ShowDetails
            match={props.match}
            characters={this.state.characters}
            saveFavorite={this.saveFavorite}
          />}
        />
      </Switch>

      <Footer />

    </div>
  );
}
}

export default App;
