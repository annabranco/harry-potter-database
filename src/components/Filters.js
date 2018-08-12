import React from 'react'
import FiltersItems from './FiltersItems';
import parchmentLeft from '../images/parchment-left.png';
import parchmentRight from '../images/parchment-right.png';

const scrollOpen = new Audio('http://freesound.org/data/previews/377/377086_3728489-lq.mp3');
const scrollClose = new Audio('http://freesound.org/data/previews/416/416179_5121236-lq.mp3');

class Filters extends React.Component {

  openScroll = () => {
    scrollOpen.currentTime = 0;
    scrollOpen.volume = 0.1;
    scrollOpen.pause()
    scrollOpen.play()
  }
  closeScroll = () => {
    scrollClose.currentTime = 0;
    scrollOpen.pause()
    scrollClose.play()
  }

  render () {

    return (

      <div className="parchment__outer">
        <div className="parchment" onMouseOver={this.openScroll} onMouseOut={this.closeScroll}>

          <div className="parchmentLeftDIV">
            <img src={parchmentLeft} alt="" className="parchmentLeft"/>
          </div>

          <div className="parchmentMiddleDIV">

            <FiltersItems
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

          </div>

          <div className="parchmentRightDIV">
            <img src={parchmentRight} alt="" className="parchmentRight"/>
          </div>

        </div>
      </div>

    );
  }
}

export default Filters;
