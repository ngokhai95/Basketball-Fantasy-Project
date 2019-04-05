import "./loginpage.css";
import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SERVER_ADDRESS = "http://127.0.0.1:8000";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    failedLogin: false,
    failedLoginMessage: null
  };

  handleNameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  goToRegisterPage = () => {
    this.props.history.push("./register");
  };

  sendLogin = () => {
    axios
      .post(`${SERVER_ADDRESS}/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.data.login) {
          this.props.completeLogin(response.data);
          this.props.history.push("./main");
        } else {
          this.setState({
            failedLogin: true,
            failedLoginMessage: response.data.message
          });
        }
      });
  };

  render() {
    let failLoginMessage = null;

    if (this.state.failedLogin) {
      failLoginMessage = (
        <FailLoginMessage message={this.state.failedLoginMessage} />
      );
    }
    return (
      <Container>
        <h3>Sign In</h3>
        <Form className="form-signin">
          <Form.Group controlId="loginUserId">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="form-control"
              value={this.state.username}
              placeholder="Enter Username"
              onChange={this.handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="form-control"
              value={this.state.password}
              placeholder="Enter Password"
              type="password"
              onChange={this.handlePasswordChange}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={this.sendLogin}>
            Login
          </Button>
          {failLoginMessage}
          <br />
          <br />
          <Button variant="info" type="button" onClick={this.goToRegisterPage}>
            Register
          </Button>
        </Form>
      </Container>
    );
  }
}

const FailLoginMessage = props => {
  return <p>{props.message}</p>;
};

export default LoginPage;
