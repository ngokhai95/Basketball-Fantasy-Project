import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class TeamCreationPage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	goToSearchPage = index => {
		this.props.history.push({
			pathname: `/search/${index}`
		});
	};

	render() {
		let teamInfo = this.props.teamInfo;

		let teamCreation = this.props.teamCreation;

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
				return <p key={index}>player: {player}</p>;
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
