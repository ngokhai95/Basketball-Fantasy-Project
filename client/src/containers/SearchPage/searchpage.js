import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const SERVER_ADDRESS = "http://127.0.0.1:8000";
class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerNameSearchTerm: "",
      teamSearchTerm: "",
      jerseyNumberSearchterm: "",
      players: [],
      playerIndexToChange: this.props.match.params.playerIndex
    };
  }

  handlePlayerNameInputChange = event => {
    this.setState({ playerNameSearchTerm: event.target.value });
  };

  handleTeamInputChange = event => {
    this.setState({ teamSearchTerm: event.target.value });
  };

  handleJerseyInputChange = event => {
    this.setState({ jerseyNumberSearchterm: event.target.value });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    console.log("Submitting search");
    axios
      .post(`${SERVER_ADDRESS}/search`, {
        playerSearchTerm: this.state.playerNameSearchTerm,
        teamSearchTerm: this.state.teamSearchTerm,
        jerseyNumberSearchterm: this.state.jerseyNumberSearchterm
      })
      .then(response => {
        // this.props.completeSearch(response.data);
        // this.props.history.push("./main");
        console.log(response);
        this.setState({ players: response.data.playersSearchResult });
      });
  };

  /**
   * handles what happens when player clicks the add button
   * TODO: Either check if a player exist in user's team before displaying in
   * search result or check when adding it to transaction table
   */
  handleAddPlayerToTeamButtonClick = player => {
    console.log(`add player_id=${player.player_id} to team`);
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
        <br />
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Offensive Score</th>
              <th>Defensive Score</th>
              <th>Overall Score</th>
              <th>Position</th>
              <th>Jersey #</th>
              <th>Add to Team</th>
            </tr>
          </thead>
          <PlayersTableBody
            players={this.state.players}
            onAddPlayerButtonClick={this.handleAddPlayerToTeamButtonClick}
          />
        </Table>
      </Container>
    );
  }
}

const PlayersTableBody = props => {
  const players = props.players.map(player => {
    return (
      <PlayersTableRow
        key={player.player_id}
        aPlayer={player}
        onAddPlayerButtonClick={props.onAddPlayerButtonClick}
      />
    );
  });

  return <tbody>{players}</tbody>;
};

const PlayersTableRow = props => {
  return (
    <tr>
      <td>{props.aPlayer.name}</td>
      <td>{props.aPlayer.offense_score}</td>
      <td>{props.aPlayer.defense_score}</td>
      <td>{props.aPlayer.overall_score}</td>
      <td>{props.aPlayer.position}</td>
      <td>{props.aPlayer.jersey_number}</td>
      <td>
        <Button
          type="button"
          onClick={event => props.onAddPlayerButtonClick(props.aPlayer)}
        >
          ADD
        </Button>
      </td>
    </tr>
  );
};

export default SearchPage;
