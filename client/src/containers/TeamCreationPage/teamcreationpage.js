import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";

const SERVER_ADDRESS = "http://127.0.0.1:8000";

class TeamCreationPage extends Component {
	constructor(props) {
		super(props);

		let playerList = this.props.teamCreation.slice(
			0,
			this.props.teamCreation.indexOf(null)
		);
		if (playerList.length !== 0) {
			axios
				.post(`${SERVER_ADDRESS}/getPlayers`, {
					players: playerList
				})
				.then(response => {
					let list = response.data;
					for (let i = response.data.length; i < 5; i++) {
						list.push(null);
					}
					this.setState({ players: list });
				});
		}

		this.state = {
			players: this.props.teamCreation
		};
	}

	goToSearchPage = index => {
		this.props.history.push({
			pathname: `/search/${index}`
		});
	};

	render() {
		let teamInfo = this.props.teamInfo;

		let teamCreation = this.state.players;

		const teamMembers = teamCreation.map((player, index) => {
			if (player == null) {
				return (
					<Button
						key={index}
						onClick={() => {
							this.goToSearchPage(index);
						}}
					>
						Add Player {index + 1}
					</Button>
				);
			} else {
				return <p key={index}>player: {player.name}</p>;
			}
		});
		return (
			<div>
				<h1>Team Creation Page</h1>
				<p>Team Name: {teamInfo.team_name}</p>
				<ButtonGroup vertical>{teamMembers}</ButtonGroup>
			</div>
		);
	}
}

export default TeamCreationPage;
