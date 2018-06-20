import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import Card from './Card';

const style = {
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

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      cards: nextProps.cards,
    });
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
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
        >
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


const mapStateToProps = ({ cards }) => {
  const selectedIds = cards.cards;
  return {
    cards: selectedIds,
  };
};


export default DragDropContext(HTML5Backend)(connect(mapStateToProps, null)(Container));
