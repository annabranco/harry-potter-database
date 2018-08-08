import React from 'react';
import Filters from './Filters';
import CharacterList from './CharacterList';


class ShowCharacters extends React.Component {

  render () {

    return (

      <React.Fragment>
        <Filters searchCharacter={this.props.searchCharacter}/>
        <CharacterList
          characters={this.props.characters}
          searchString={this.props.searchString}
        />
      </React.Fragment>

    );
  }

}

export default ShowCharacters;
