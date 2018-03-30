import React, {Component} from 'react';
import update from 'immutability-helper';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';

const style = {
    width: 200,
    display: 'inline-block'
};

class Container extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.state = {
            cards: this.props.cards,
        }
        console.log(this.state.cards);
    }


    moveCard(dragIndex, hoverIndex) {
        const {cards} = this.state;
        const dragCard = cards[dragIndex];

        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    }

    render() {
        const {cards} = this.state;

        return (
            <div>
                {cards.map((card, i) => (
                    <div style={style}>
                        <Card
                            key={card.id}
                            index={i}
                            id={card.id}
                            text={card.text}
                            moveCard={this.moveCard}
                        />
                    </div>
                ))}


            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Container);

