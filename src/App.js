import React, { Component } from 'react';
import Filters from './components/Filters';
import CharacterList from './components/CharacterList';

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

      <Filters searchCharacter={this.searchCharacter}/>
      <CharacterList
        characters={this.state.characters}
        searchString={this.state.searchString}
      />

    </div>
  );
}
}

export default App;
