import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const SERVER_ADDRESS = "http://127.0.0.1:8000";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      playerNameSearchTerm: "",
      teamSearchTerm: "",
      jerseyNumberSearchterm: "",
      players: [],
      playerIndexToChange: this.props.match.params.playerIndex,
      show: false,
      selectedPlayer: null
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleAddPlayerConfirmation = player => {
    console.log(this.props.teamID);
    axios
      .post(`${SERVER_ADDRESS}/addplayer`, {
        teamID: this.props.teamID,
        playerID: player.player_id
      })
      .then(response => {
        this.props.addPlayer([
          this.state.playerIndexToChange,
          player.player_id
        ]);
        this.props.history.push({ pathname: "/createteam" });
      });
  };

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
  handleToggleAddPlayerConfirmation = player => {
    this.setState({ selectedPlayer: player });
    this.handleShow();
  };

  render() {
    let buyConfirm = null;

    if (this.state.show) {
      buyConfirm = (
        <BuyConfirm
          handleClose={this.handleClose}
          show={this.state.show}
          selectedPlayer={this.state.selectedPlayer}
          confirmAdd={this.handleAddPlayerConfirmation}
        />
      );
    }
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
            onAddPlayerButtonClick={this.handleToggleAddPlayerConfirmation}
          />
        </Table>
        {buyConfirm}
      </Container>
    );
  }
}

const BuyConfirm = props => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to add {props.selectedPlayer.name} to your team?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          No
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.confirmAdd(props.selectedPlayer);
          }}
        >
          Yes, Add!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

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
