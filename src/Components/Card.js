import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
    border: '1px dashed gray',
    padding: '1rem 0.5rem',
    marginBottom: '.5rem',
    marginLeft: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.right - hoverBoundingRect.left)/2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.x - hoverBoundingRect.left;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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

function collectDrag(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    };
}

function collectDrop(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    };
}

class Card extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        avatar: PropTypes.any.isRequired,
        nickname: PropTypes.string.isRequired,
        totalKills: PropTypes.number.isRequired,
        totalDeaths: PropTypes.number.isRequired,
        totalTime: PropTypes.number.isRequired,
        totalMatches: PropTypes.number.isRequired,
        totalWins: PropTypes.number.isRequired,
        totalMvps: PropTypes.number.isRequired,
        moveCard: PropTypes.func.isRequired,
    };

    render() {
        const {
            nickname,
            avatar,
            totalKills,
            totalDeaths,
            totalTime,
            totalMatches,
            totalWins,
            totalMvps,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
            connectDropTarget(<div style={{ ...style, opacity }}>
                <img src={avatar}/>
                <div style={{display: 'inline-block', marginLeft: 10}}>
                    <div className="player-nickname" style={{fontSize: '1.25em', fontWeight: 'bold'}}>{nickname}</div>
                </div>
                <div style={{marginLeft: 10}}>
                    Total kills: {totalKills}<br/>
                    Total deaths: {totalDeaths}<br/>
                    Total time: {totalTime}<br/>
                    Total matches: {totalMatches}<br/>
                    Total wins: {totalWins}<br/>
                    Total MVPs: {totalMvps}
                </div>
            </div>),
        )
    }
}

const dropTargetHOC = DropTarget(ItemTypes.CARD, cardTarget, collectDrop);
const dragSourceHOC = DragSource(ItemTypes.CARD, cardSource, collectDrag);

export default dropTargetHOC(dragSourceHOC(Card))
