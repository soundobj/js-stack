import React, { Component, PropTypes } from "react";
import { DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import classnames from "classnames";

import Card from "./draggableCard";

const CARD_HEIGHT = 161;  // height of a single card(excluding marginBottom/paddingBottom)
const CARD_MARGIN = 10;  // height of a marginBottom+paddingBottom
const OFFSET_HEIGHT = 84; // height offset from the top of the page

function getPlaceholderIndex(y, scrollY) {
  // shift placeholder if y position more than card height / 2
  const yPos = y - OFFSET_HEIGHT + scrollY;
  let placeholderIndex;
  if (yPos < CARD_HEIGHT / 2) {
    placeholderIndex = -1; // place at the start
  } else {
    placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
  }
  return placeholderIndex;
}

const specs = {
  drop(props, monitor, component) {
    document.getElementById(monitor.getItem().id).style.display = "block";
    const { placeholderIndex } = component.state;
    const lastX = monitor.getItem().x;
    const lastY = monitor.getItem().y;
    const nextX = props.x;
    let nextY = placeholderIndex;

    if (lastY > nextY) { // move top
      nextY += 1;
    } else if (lastX !== nextX) { // insert into another list
      nextY += 1;
    }

    if (lastX === nextX && lastY === nextY) { // do nothing if item to be drop in it's original position
      return;
    }

    props.moveCard(lastX, lastY, nextX, nextY, props.id, monitor.getItem().item);
  },
  hover(props, monitor, component) {
    // defines where placeholder is rendered
    const placeholderIndex = getPlaceholderIndex(
      monitor.getClientOffset().y,
      findDOMNode(component).scrollTop
    );

    // horizontal scroll
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

    // IMPORTANT!
    // HACK! Since there is an open bug in react-dnd, making it impossible
    // to get the current client offset through the collect function as the
    // user moves the mouse, we do this awful hack and set the state (!!)
    // on the component from here outside the component.
    // https://github.com/gaearon/react-dnd/issues/179
    component.setState({ placeholderIndex });

    // when drag begins, we hide the card and only display cardDragPreview
    const item = monitor.getItem();
    document.getElementById(item.id).style.display = "none";
  },
  canDrop: (props, monitor) => {
    return props._canDrop(monitor.getItem().item.status, props.id);
  },
};

// eslint-disable-next-line new-cap
@DropTarget("card", specs, (connectDragSource, monitor) => ({ /* collect impl */
  connectDropTarget: connectDragSource.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem(),
}))
export default class Cards extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    isOver: PropTypes.bool,
    item: PropTypes.object,
    canDrop: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
    cardComponent: PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      placeholderIndex: undefined,
      isScrolling: false,
    };
  }

  render() {
    const { connectDropTarget, x, cards, isOver, canDrop } = this.props;
    const { placeholderIndex } = this.state;

    let isPlaceHold = false;
    const cardList = [];
    cards.forEach((item, i) => {
      if (isOver && canDrop) {
        isPlaceHold = false;
        if (i === 0 && placeholderIndex === -1) {
          cardList.push(<div key="placeholder" className="item placeholder" />);
        } else if (placeholderIndex > i) {
          isPlaceHold = true;
        }
      }

      if (item !== undefined) {
        cardList.push(
          <Card
            x={x}
            y={i}
            item={item}
            key={item.id}
            stopScrolling={this.props.stopScrolling}
            cardComponent={this.props.cardComponent}
          />
        );
      }

      if (isOver && canDrop && placeholderIndex === i) {
        cardList.push(<div key="placeholder" className="item placeholder" />);
      }
    });

    // if placeholder index is greater than array.length, display placeholder as last
    if (isPlaceHold) {
      cardList.push(<div key="placeholder" className="item placeholder" />);
    }

    // if there is no items in cards currently, display a placeholder anyway
    if (isOver && canDrop && cards.length === 0) {
      cardList.push(<div key="placeholder" className="item placeholder" />);
    }

    return connectDropTarget(
      <div className={classnames({ "cannot-drop": canDrop === false && isOver }, "desk-items")}>
        {cardList}
      </div>
    );
  }
}