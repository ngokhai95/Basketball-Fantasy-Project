import React, { Component } from 'react';
import axios from 'axios';
import InputComponent from './../../components/InputComponent/inputcomponent.js';

const SERVER_ADDRESS = 'http://127.0.0.1:8000';

class RegisterPage extends Component {
	state = {
		username: '',
		password: '',
		fullname: '',
		registered: false,
		registerMessage: null
	}

	goToLoginPage = () => {
		this.props.history.push('./');
	}

	handleUsernameChange = (event) => {
		this.setState({
			username: event.target.value
		});
	}

	handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value
		});
	}

	handleFullNameChange = (event) => {
		this.setState({
			fullname: event.target.value
		})
	}

	registerAccount = () => {
		axios.post(`${SERVER_ADDRESS}/register`, {
			username: this.state.username,
			password: this.state.password,
			fullname: this.state.fullname
		})
		.then(response => {
			this.setState({
				registered: true,
				registerMessage: response.data.message
			})
		});
	}

	render() {
		let registerMessageBlock = null;

		if (this.state.registered) {
			registerMessageBlock = <RegisterMessage message={this.state.registerMessage}></RegisterMessage>
		}

		return (
			<div>
				<h1>RegisterPage</h1>
				<label>
					Username:
					<InputComponent 
						name={this.state.username} 
						handleChange={this.handleUsernameChange}
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
				<label>
					Full Name:
					<InputComponent
						name={this.state.fullname}
						handleChange={this.handleFullNameChange}
					/>
				</label>
				<br/>
				<button onClick={this.registerAccount}>
					Register Account
				</button>

				{registerMessageBlock}
				<br/>
				
				<button onClick={this.goToLoginPage}>Go back to Login</button>
			</div>
			
		);
	}
}

const RegisterMessage = (props) => {
	return (
		<div>{props.message}</div>
	);
}

export default RegisterPage;