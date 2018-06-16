import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import PlayerStats from './PlayerStats';

const style = {
  width: 180,
  display: 'inline-block',
};


class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [],
    };
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    }));
  }

    addNewCard = (cardInfo) => {
      if (this.state.cards.length < 3) {
        this.setState(prevState => ({
          cards: prevState.cards.concat(cardInfo),
        }));
      }
    };

    render() {
      return (
        <div>
          <PlayerStats onSubmit={this.addNewCard} />
          {this.state.cards.map((card, i) => (
            <div style={style}>
              <Card
                id={card.steamID}
                key={card.steamID}
                {...card}
                index={i}
                moveCard={this.moveCard}
              />
            </div>
                ))}

        </div>
      );
    }
}

export default DragDropContext(HTML5Backend)(Container);
