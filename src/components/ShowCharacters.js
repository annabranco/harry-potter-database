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
        />
        <CharacterList
          characters={this.props.characters}
          searchString={this.props.searchString}
          searchResults={this.props.searchResults}
        />
      </React.Fragment>

    );
  }

}

export default ShowCharacters;
