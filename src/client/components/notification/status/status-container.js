import { connect } from "react-redux";
import Status from "./status";
import { removeStatus } from "./status-actions";

const mapStateToProps = (state) => {
  return {
    status: state.get("status"),
  };
};

const mapDispatchToProps = dispatch => ({
  removeStatus: () => { dispatch(removeStatus()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);