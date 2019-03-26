import React, { Component } from 'react';

import AddPlayerComponent from './../../components/AddPlayerComponent/addplayercomponent.js';

class TeamCreationPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	goToSearchPage = () => {
		this.props.history.push({
			pathname: '/search'
		});
	}

	render() {
		let teamInfo = this.props.teamInfo;

		let teamCreation = this.props.teamCreation;

		const teamMembers = teamCreation.map((player, index) => {
			if (player == null) {
				return (<div key={index}>
					<AddPlayerComponent index={index} searchForPlayer={this.goToSearchPage}/>
					<br/>
				</div>);
			} else {
				return (
					<p>player: {player}</p>
				);
			}
			
		})
		return (
			<div>
				<h1>Team Creation Page</h1>
				<p>Team Name: {teamInfo.team_name}</p>
				{teamMembers}
			</div>
			
		);
	}
}

export default TeamCreationPage;