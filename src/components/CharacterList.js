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
          />

        </ul>
      </main>

    );
  }

}

export default CharacterList;
