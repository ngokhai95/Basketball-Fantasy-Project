import React, { Component } from 'react';
import InputComponent from './../../components/InputComponent/inputcomponent.js';

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			setTeamName: ''
		}
	}

	handleTeamNameChange = (event) => {
		this.setState({
			setTeamName: event.target.value
		});
	}

	goToTeamCreationPage = () => {
		this.props.history.push({
			pathname: '/createteam',
			state: {
				teamName: this.state.setTeamName
			}
		});
	}

	render() {
		let pageDisplay = null;

		if (this.props.teamInfo == null) {
			pageDisplay = (
				<label>Set a Team Name:
					<InputComponent
						name={this.setTeamName}
						handleChange={this.handleTeamNameChange}/>
					<br/>
					<button onClick={this.goToTeamCreationPage}>Create Team</button>
				</label>
			);
		} else {
			pageDisplay = <p>Team exists</p>
		}

		return (
			<div>
				<h1>Main Page</h1>
				{pageDisplay}
			</div>
		);
		
	}
}

export default MainPage
