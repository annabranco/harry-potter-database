import React from 'react';
import Filters from './Filters';
import CharacterList from './CharacterList';


class ShowCharacters extends React.Component {

  render () {

    return (

      <React.Fragment>

        <Filters
          searchCharacter={this.props.searchCharacter}
          searchString={this.props.searchString}
          filterByHouse={this.props.filterByHouse}
          searchByHouse={this.props.searchByHouse}
          filterByDead={this.props.filterByDead}
          searchAliveOrDead={this.props.searchAliveOrDead}
          resetFilters={this.props.resetFilters}
          filterByFavorites={this.props.filterByFavorites}
          seachByFavorites={this.props.seachByFavorites}
        />
        <CharacterList
          characters={this.props.characters}
          searchString={this.props.searchString}
          searchResults={this.props.searchResults}
          filterCharacters={this.props.filterCharacters}
          searchByHouse={this.props.searchByHouse}
          searchCharactersIsAlive={this.props.searchCharactersIsAlive}
          seachByFavorites={this.props.seachByFavorites}
        />

      </React.Fragment>

    );
  }

}

export default ShowCharacters;
