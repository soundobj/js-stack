import { connect } from "react-redux";
import ActionContainer from "./actionContainer";
import { completeActionAll } from "../actions/action-actions";

const mapStateToProps = state => ({
  action: state.get("action"),
});

const mapDispatchToProps = dispatch => ({
  completeActionAll: () => { dispatch(completeActionAll()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionContainer);