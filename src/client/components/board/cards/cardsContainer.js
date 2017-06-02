import React, { Component, PropTypes } from "react";
import { DropTarget, DragSource } from "react-dnd";
import Cards from "./cards";

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x,
    };
  },
  endDrag(props) {
    props.stopScrolling();
  },
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling("toRight");
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling("toLeft");
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
        monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  },
};
// eslint-disable-next-line new-cap
@DropTarget("list", listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))

// eslint-disable-next-line new-cap
@DragSource("list", listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging(),
}))
class CardsContainer extends Component {

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    id: PropTypes.string,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
    cardComponent: PropTypes.element.isRequired,
    _canDrop: PropTypes.func,
  }

  render() {
    const { connectDropTarget, connectDragSource, id, item, x, moveCard, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(connectDropTarget(
      <div className="desk" style={{ opacity }}>
        <div className="desk-head">
          <div className="desk-name">{item.id}</div>
        </div>
        <Cards
          moveCard={moveCard}
          x={x}
          id={id}
          cards={item.cards}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
          cardComponent={this.props.cardComponent}
          _canDrop={this.props._canDrop}
        />
      </div>
    ));
  }
}

export default CardsContainer;