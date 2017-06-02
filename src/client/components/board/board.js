import React, { Component, PropTypes } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import io from "socket.io-client";
import "./board.scss";
import CardsContainer from "./cards/cardsContainer";
import CustomDragLayer from "./customDragLayer";

// eslint-disable-next-line new-cap
@DragDropContext(HTML5Backend)
export default class Board extends Component {
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    pushItem: PropTypes.func.isRequired,
    cardComponent: PropTypes.element.isRequired,
    socket: PropTypes.string.isRequired,
    _canDrop: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.startScrolling = this.startScrolling.bind(this);
    this.state = { isScrolling: false };
    this.socket = undefined;
  }

  componentWillMount() {
    this.props.getLists();

    this.socket = io(this.props.socket);
    this.socket.on("connect", () => {
      console.error("@ client connected to socket", null);
    });

    this.socket.on("pushBoardItem", (payload) => {
      this.props.pushItem(payload);
    });

    this.socket.on("disconnect", () => {
      console.error("@ client disconnected to socket", null);
    });
  }

  startScrolling(direction) {
    switch (direction) {
      case "toLeft":
        this.setState({ isScrolling: true }, this.scrollLeft());
        break;
      case "toRight":
        this.setState({ isScrolling: true }, this.scrollRight());
        break;
      default:
        break;
    }
  }

  scrollRight() {
    function scroll() {
      document.getElementsByTagName("main")[0].scrollLeft += 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  scrollLeft() {
    function scroll() {
      document.getElementsByTagName("main")[0].scrollLeft -= 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  stopScrolling() {
    this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
  }

  moveCard(lastX, lastY, nextX, nextY, id, item) {
    item = Object.assign(item, { status: id });
    this.props.moveCard(lastX, lastY, nextX, nextY, item);
  }

  moveList(id, nextX) {
    this.props.moveList(this.props.lists.findIndex(x => x.id === id), nextX);
  }

  render() {
    const { lists } = this.props;

    return (
      <div className="board" style={{ height: "100%" }}>
        <CustomDragLayer snapToGrid={false} />
        {lists.map((item, i) =>
          <CardsContainer
            key={item.id}
            id={item.id}
            item={item}
            moveCard={this.moveCard}
            moveList={this.moveList}
            startScrolling={this.startScrolling}
            stopScrolling={this.stopScrolling}
            isScrolling={this.state.isScrolling}
            x={i}
            cardComponent={this.props.cardComponent}
            _canDrop={this.props._canDrop}
          />
        )}
      </div>
    );
  }
}