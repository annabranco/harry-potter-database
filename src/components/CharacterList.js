import React from 'react'
import CharacterCard from './CharacterCard';

class CharacterList extends React.Component {

  render () {

    return (

      <main className="main__box">
        <ul className="main__cardsArea">

          <CharacterCard
            characters={this.props.characters}
            searchString={this.props.searchString}
            searchResults={this.props.searchResults}
            filterCharacters={this.props.filterCharacters}
            searchByHouse={this.props.searchByHouse}
            searchCharactersIsAlive={this.props.searchCharactersIsAlive}
            seachByFavorites={this.props.seachByFavorites}
          />

        </ul>
      </main>

    );
  }

}

export default CharacterList;
