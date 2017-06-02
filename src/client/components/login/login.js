import React, { PropTypes } from "react";
import template from "./login.jsx";
import "./login.scss";
import { intl } from "../../i18n";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      user: "",
      password: "",
      hasError: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user.toJS();
    if (user.error) {
      this.setState({
        hasError: intl.formatMessage({ id: user.error }),
        processing: false,
      });
    } else if (user.user) {
      this.setState({
        hasError: false,
      });
      this.context.router.replace(this.context.router.location.query.from || "/");
    }
  }

  handleLogin(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.fetchUser({ user: this.state.user, password: this.state.password });

    this.setState({
      hasError: false,
      processing: true,
    });
  }

  handleUserChange(event) {
    this.setState({ user: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Login.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};

Login.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};

export default Login;