import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Board from "./board";
import * as ListsActions from "./lists-actions";
import Card from "./cards/card";

const mapStateToProps = (state) => {
  const lists = state.toJS().lists.lists;
  return {
    lists,
    cardComponent: <Card />,
    _canDrop: (item, column) => lists.find(x => x.id === item).transitions.includes(column),
    socket: state.toJS().user.socket,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(ListsActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);