import React, { PropTypes } from "react";
import Card from "./cards/card";

const styles = {
  display: "inline-block",
  opacity: 0.5,
  transform: "rotate(-7deg)",
  WebkitTransform: "rotate(-7deg)",
};

const propTypes = {
  card: PropTypes.object,
};

const CardDragPreview = (props) => {
  styles.width = `${props.card.clientWidth || 243}px`;
  styles.height = `${props.card.clientHeight || 243}px`;

  return (
    <div style={styles}>
      <Card item={props.card.item} />
    </div>
  );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;