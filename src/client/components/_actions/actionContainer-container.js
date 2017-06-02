import { connect } from "react-redux";
import ActionContainer from "./actionContainer";
import { next, previous, cancelAction } from "./action-actions";

const mapStateToProps = state => ({
  action: state.get("_action"),
});

const mapDispatchToProps = dispatch => ({
  next: () => { dispatch(next()); },
  previous: () => { dispatch(previous()); },
  cancelAction: () => { dispatch(cancelAction()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionContainer);