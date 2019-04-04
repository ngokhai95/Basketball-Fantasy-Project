import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const SERVER_ADDRESS = "http://127.0.0.1:8000";
class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerNameSearchTerm: "",
      teamSearchTerm: "",
      jerseyNumberSearchterm: ""
    };
  }

  handlePlayerNameInputChange = event => {
    this.setState({ playerNameSearchTerm: event.target.value });
  };

  handleTeamInputChange = event => {
    this.setState({ playerNameSearchTerm: event.target.value });
  };

  handleJerseyInputChange = event => {
    this.setState({ playerNameSearchTerm: event.target.value });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    console.log("Submitting search");
    axios
      .post(`${SERVER_ADDRESS}/search`, {
        playerSearchTerm: this.state.playerNameSearchTerm,
        teamSearchTerm: this.state.teamSearchTerm,
        jerseySearchterm: this.state.jerseyNumberSearchterm
      })
      .then(response => {
        this.props.completeSearch(response.data);
        this.props.history.push("./main");
      });
  };

  render() {
    return (
      <Container>
        <h1>SearchPage</h1>
        <Form className="search-form" onSubmit={this.handleSearchSubmit}>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Player Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                value={this.state.playerNameSearchTerm}
                type="text"
                placeholder="e.g. Lebron James"
                onChange={this.handlePlayerNameInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Label>OR</Form.Label>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Team
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                value={this.state.teamSearchTerm}
                type="text"
                placeholder="e.g. Chicago Bulls"
                onChange={this.handleTeamInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Label>OR</Form.Label>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={2}>
              Jersey Number
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                value={this.state.jerseyNumberSearchterm}
                type="text"
                placeholder="e.g. 15"
                onChange={this.handleJerseyInputChange}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SearchPage;
