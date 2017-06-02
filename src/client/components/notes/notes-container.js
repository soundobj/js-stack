import { connect } from "react-redux";
import Notes from "./notes";
import { fetchNotes } from "./notes-actions";

const mapStateToProps = (state) => {
  return {
    notes: state.get("notes"),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchNotes: (link) => { return dispatch(fetchNotes(link)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);