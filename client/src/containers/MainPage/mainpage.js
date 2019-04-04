import React, { Component } from "react";
import InputComponent from "./../../components/InputComponent/inputcomponent.js";

import axios from "axios";

const SERVER_ADDRESS = "http://127.0.0.1:8000";

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			setTeamName: ""
		};
	}

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

			pageDisplay = (
				<div>
					<p>TeamName: {teamInfo.team_name}</p>
					<p>Captain: {teamInfo.captain}</p>
					<p>Defensive Score: {teamInfo.defensive_score}</p>
					<p>Offensive Score: {teamInfo.offensive_score}</p>
					<p>Overall Score: {teamInfo.overall_score}</p>
					<button onClick={this.goToTeamCreationPage}>
						Create New Team
					</button>
					<button>Simulate</button>
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
