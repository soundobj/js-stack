import React, { PropTypes } from "react";
import classnames from "classnames";

const propTypes = {
  item: PropTypes.object.isRequired,
  beingDragged: PropTypes.bool,
};

const Card = (props) => {
  const { beingDragged, item } = props;

  return (
    <div
      className={classnames({
        board__item: !beingDragged,
        "board__item--dragged": beingDragged,
      }, "item")}
      id={beingDragged ? item.id : null}
    >
      <div className="item-name">{item.status}</div>
      <div className="item-container">
        {item.text}
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;