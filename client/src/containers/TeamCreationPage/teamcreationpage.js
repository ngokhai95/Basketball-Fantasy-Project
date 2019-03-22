import React, { Component } from 'react';

class TeamCreationPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		let teamInfo = this.props.teamInfo;

		return (
			<div>
				<h1>Team Creation Page</h1>
				<p>Team Name: {teamInfo.team_name}</p>
				<p>Player 1</p>
				<p>Player 2</p>
				<p>Player 3</p>
				<p>Player 4</p>
				<p>Player 5</p>
			</div>
			
		);
	}
}

export default TeamCreationPage;