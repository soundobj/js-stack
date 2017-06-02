import { connect } from "react-redux";
import Participants from "./participants";
import { fetchParticipants } from "./participants-actions";

const mapStateToProps = (state) => {
  return {
    participants: state.get("participants"),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchParticipants: (onFail) => { return dispatch(fetchParticipants(onFail)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Participants);