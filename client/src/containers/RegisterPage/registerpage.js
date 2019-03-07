import React, { Component } from 'react';

import InputComponent from './../../components/InputComponent/inputcomponent.js';

class RegisterPage extends Component {
	state = {
		username: '',
		password: '',
		fullname: ''
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

	render() {
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
				<button onClick={() => {this.props.onRegister(this.state.username, this.state.password, this.state.fullname)}}>
					Register Account
				</button>
				<br/>
				<button onClick={this.goToLoginPage}>Go back to Login</button>
			</div>
			
		);
	}
}

export default RegisterPage;