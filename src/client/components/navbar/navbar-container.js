import { connect } from "react-redux";
import { logout } from "../user/user-actions";
import Navbar from "./navbar";

const mapDispatchToProps = dispatch => ({
  logout: () => { return dispatch(logout()); },
});

const mapStateToProps = (state) => {
  return {
    user: state.get("user"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);