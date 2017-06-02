import React from "react";
import { Form, FormControl, FormGroup, ControlLabel, Col, Button } from "react-bootstrap";
import { intl } from "../../i18n";

const template = function () {
  return (
    <section className="app__container__main userLoginForm container-fluid">
      {this.state.hasError &&
        <header className="alert alert-danger" style={{ marginTop: "10px" }}>
          <p>{this.state.hasError}</p>
        </header>
      }
      <Form
        horizontal={true}
        onSubmit={this.handleLogin}
      >
        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={4}>
            {intl.formatMessage({ id: "login.username" })}
          </Col>
          <Col sm={8}>
            <FormControl
              type="email"
              label={intl.formatMessage({ id: "login.username" })}
              value={this.state.user}
              placeholder={intl.formatMessage({ id: "login.username.placeholder" })}
              required="true"
              onChange={this.handleUserChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="password">
          <Col componentClass={ControlLabel} sm={4}>
            {intl.formatMessage({ id: "login.password" })}
          </Col>
          <Col sm={8}>
            <FormControl
              type="password"
              label={intl.formatMessage({ id: "login.password" })}
              value={this.state.password}
              placeholder={intl.formatMessage({ id: "login.password.placeholder" })}
              required="true"
              onChange={this.handlePasswordChange}
            />
          </Col>
        </FormGroup>
        <Button
          disabled={this.state.processing}
          className="btn btn-primary pull-right"
          type="submit"
        >
          {intl.formatMessage({ id: "login.login" })}
        </Button>
      </Form>
    </section>
  );
};
export default template;