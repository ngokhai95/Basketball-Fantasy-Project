import React, { Component } from 'react';

class TeamCreationPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
			<div>
				<h1>Team Creation Page</h1>
				<p>{this.props.location.state.teamName}</p>
			</div>
			
		);
	}
}

export default TeamCreationPage;