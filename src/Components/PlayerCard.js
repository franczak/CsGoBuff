import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        }
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        const hoverMiddleY = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

        const clientOffset = monitor.getClientOffset();

        const hoverClientY = clientOffset.x - hoverBoundingRect.left;

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))

function collect(connect, monitor){
    return{
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


export default class PlayerCard extends Component {
    static propType = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
    };
    render() {
        const {
            text,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
            connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
        )
    }
}