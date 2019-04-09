import React, { Component } from "react";
import InputComponent from "./../../components/InputComponent/inputcomponent.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import axios from "axios";

const SERVER_ADDRESS = "http://127.0.0.1:8000";

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			setTeamName: "",
			calculateError: false
		};

		if (this.props.teamInfo != null) {
			this.state.defenseScore = this.props.teamInfo.defensive_score;
			this.state.offenseScore = this.props.teamInfo.offensive_score;
			this.state.overallSCore = this.props.teamInfo.overall_score;
		}
	}

	handleErrorShow = () => {
		this.setState({ calculateError: true });
	};

	handleErrorClose = () => {
		this.setState({ calculateError: false });
	};

	handleTeamNameChange = event => {
		this.setState({
			setTeamName: event.target.value
		});
	};

	createNewTeam = () => {
		axios
			.post(`${SERVER_ADDRESS}/createTeam`, {
				teamName: this.state.setTeamName,
				userID: this.props.userID
			})
			.then(response => {
				if (response.data.teamCreated) {
					this.props.addNewTeam(response.data.teamInfo);
					this.goToTeamCreationPage();
				}
			});
	};

	goToTeamCreationPage = () => {
		this.props.history.push({
			pathname: "/createteam"
		});
	};

	calculateTeamStats = () => {
		let numOfNull = 0;
		for (let i = 0; i < this.props.teamPlayers.length; i++) {
			if (this.props.teamPlayers[i] == null) {
				numOfNull++;
			}
		}
		if (numOfNull > 0) {
			this.handleErrorShow();
		} else {
			axios
				.post(`${SERVER_ADDRESS}/calculateStats`, {
					teamPlayers: this.props.teamPlayers,
					teamID: this.props.teamInfo.team_id
				})
				.then(response => {
					this.props.updateStats(response.data);
					this.setState({
						defenseScore: this.props.teamInfo.defensive_score,
						offenseScore: this.props.teamInfo.offensive_score,
						overallScore: this.props.teamInfo.overall_score
					});
				});
		}
	};

	goToComparisonPage = () => {
		let numOfNull = 0;
		for (let i = 0; i < this.props.teamPlayers.length; i++) {
			if (this.props.teamPlayers[i] == null) {
				numOfNull++;
			}
		}
		if (numOfNull > 0) {
			this.handleErrorShow();
		} else {
			this.props.history.push("./compare");
		}
	};

	render() {
		let pageDisplay = null;

		if (this.props.teamInfo == null) {
			pageDisplay = (
				<label>
					Set a Team Name:
					<InputComponent
						name={this.setTeamName}
						handleChange={this.handleTeamNameChange}
					/>
					<br />
					<button onClick={this.createNewTeam}>Create Team</button>
				</label>
			);
		} else {
			let teamInfo = this.props.teamInfo;
			let calculateError = null;

			if (this.state.calculateError) {
				calculateError = (
					<CalculateError
						handleClose={this.handleErrorClose}
						show={this.state.calculateError}
					/>
				);
			}

			pageDisplay = (
				<div>
					<p>TeamName: {teamInfo.team_name}</p>
					<p>Captain: {teamInfo.captain}</p>
					<p>
						Defensive Score: {this.props.teamInfo.defensive_score}
					</p>
					<p>
						Offensive Score: {this.props.teamInfo.offensive_score}
					</p>
					<p>Overall Score: {this.props.teamInfo.overall_score}</p>

					<Button
						variant="primary"
						type="button"
						onClick={this.goToTeamCreationPage}
					>
						Edit Team
					</Button>
					<br />
					<Button
						variant="info"
						type="button"
						onClick={this.calculateTeamStats}
					>
						Calculate Team Stats
					</Button>
					<br />
					<Button
						variant="info"
						type="button"
						onClick={this.goToComparisonPage}
					>
						Compare with Other Teams
					</Button>
					{calculateError}
				</div>
			);
		}

		return (
			<div>
				<h1>Main Page</h1>
				{pageDisplay}
			</div>
		);
	}
}

export default MainPage;

const CalculateError = props => {
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Not enough players</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				You do not have enough players to use this function.
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
