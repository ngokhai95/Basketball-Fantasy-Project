import React, { Component } from 'react';
import axios from 'axios';

import InputComponent from './../../components/InputComponent/inputcomponent.js';

const SERVER_ADDRESS = 'http://127.0.0.1:8000';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			failedLogin: false,
			failedLoginMessage: null
		}
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

	goToRegisterPage = () => {
		this.props.history.push('./register');
	}

	sendLogin = () => {
		axios.post(`${SERVER_ADDRESS}/login`, {
			username: this.state.username,
			password: this.state.password
		})
		.then(response => {
			if (response.data.login) {
				this.props.completeLogin(response.data);
				this.props.history.push('./main');
			} else {
				this.setState({
					failedLogin: true,
					failedLoginMessage: response.data.message
				})
			}
		});
	}

	render() {
		let failLoginMessage = null;

		if (this.state.failedLogin) {
			failLoginMessage = <FailLoginMessage message={this.state.failedLoginMessage}></FailLoginMessage>;
		}
		return (
			<div>
				<h1>LoginPage</h1>

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
				
				<button onClick={this.goToRegisterPage}>Register</button>

				<button onClick={this.sendLogin}>Log in</button>
				{failLoginMessage}
				<br/>
				<button onClick={this.props.onLogout}>Log out</button>
			</div>
		);
	}
}

const FailLoginMessage = (props) => {
	return (
		<p>{props.message}</p>
	);
}


export default LoginPage;