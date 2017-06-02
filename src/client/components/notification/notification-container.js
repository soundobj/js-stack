import { connect } from "react-redux";
import Notification from "./notification";
import { clearNotifications } from "./notification-actions";

const mapStateToProps = (state) => {
  return {
    notification: state.get("notification"),
  };
};

const mapDispatchToProps = dispatch => ({
  clearNotifications: () => { dispatch(clearNotifications()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);