import { connect } from "react-redux";
import Dialog from "./dialog";

const mapStateToProps = (state) => {
  return {
    action: state.get("_action"),
  };
};

export default connect(mapStateToProps, null)(Dialog);