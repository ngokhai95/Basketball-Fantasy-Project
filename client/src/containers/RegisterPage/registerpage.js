import React, { Component } from 'react';

import InputComponent from './../../components/InputComponent/inputcomponent.js';

class RegisterPage extends Component {
	state = {
		username: '',
		password: ''
	}

	test = () => {
		console.log(this.state.username);
		console.log(this.state.password);
		this.props.history.push('./');
	}

	handleNameChange = (event) => {
		this.setState({
			username: event.target.value
		});
	}

	handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value
		});
	}

	render() {
		return (
			<div>
				<h1>RegisterPage</h1>
				<label>
					Username:
					<InputComponent 
						name={this.state.username} 
						handleChange={this.handleNameChange}
					/>
				</label>
				<br/>
				<label>
					Password:
					<InputComponent 
						name={this.state.password} 
						handleChange={this.handlePasswordChange}
						type={"password"}
					/>
				</label>
				<br/>
				<button onClick={this.test}>Test</button>
			</div>
			
		);
	}
}

export default RegisterPage;