import { connect } from "react-redux";
import { fetchUser } from "../user/user-actions";
import Login from "./login";

const mapDispatchToProps = dispatch => ({
  fetchUser: (user) => { return dispatch(fetchUser(user)); },
});

const mapStateToProps = (state) => {
  return {
    user: state.get("user"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);