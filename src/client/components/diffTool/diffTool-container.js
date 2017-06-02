import { connect } from "react-redux";
import { disableAction, addActionPayload } from "../_actions/action-actions";
import DiffTool from "./diffTool";

const mapDispatchToProps = dispatch => ({
  disableAction: (bool) => { return dispatch(disableAction(bool)); },
  addActionPayload: (payload) => { return dispatch(addActionPayload(payload)); },
});

export default connect(null, mapDispatchToProps)(DiffTool);