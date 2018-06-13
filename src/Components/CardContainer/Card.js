import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  border: '2px solid red',
  borderRadius: '10px',
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
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    // eslint-disable-next-line
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.x - hoverBoundingRect.left;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.moveCard(dragIndex, hoverIndex);
    // eslint-disable-next-line
        monitor.getItem().index = hoverIndex;
  },
};

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}


function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

class Card extends Component {
    static propTypes = {
      connectDragSource: PropTypes.func.isRequired,
      connectDropTarget: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired,
      avatar: PropTypes.any.isRequired,
      nickname: PropTypes.string.isRequired,
      totalKills: PropTypes.number.isRequired,
      totalDeaths: PropTypes.number.isRequired,
      totalTime: PropTypes.number.isRequired,
      totalMatches: PropTypes.number.isRequired,
      totalWins: PropTypes.number.isRequired,
      totalMvps: PropTypes.number.isRequired,
    };


    createCard() {
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
      } = this.props;
      const opacity = isDragging ? 0 : 1;

      return (
        <div style={{ ...style, opacity }}>
          <img src={avatar} style={{ borderRadius: 10 }} alt="avatar" />
          <br />
          <div style={{ display: 'inline-block', marginLeft: 10 }}>
            <div className="player-nickname" style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{nickname}</div>
          </div>
          <div style={{ textAlign: 'justify', marginLeft: 10 }}>
                    Total kills: {totalKills}<br />
                    Total deaths: {totalDeaths}<br />
                    Total time: {totalTime}<br />
                    Total matches: {totalMatches}<br />
                    Total wins: {totalWins}<br />
                    Total MVPs: {totalMvps}
          </div>
        </div>
      );
    }

    render() {
      const {
        connectDragSource,
        connectDropTarget,
      } = this.props;
      return connectDragSource(connectDropTarget(this.createCard()));
    }
}

const dropTargetHOC = DropTarget(ItemTypes.CARD, cardTarget, collectDrop);
const dragSourceHOC = DragSource(ItemTypes.CARD, cardSource, collectDrag);

export default dropTargetHOC(dragSourceHOC(Card));
