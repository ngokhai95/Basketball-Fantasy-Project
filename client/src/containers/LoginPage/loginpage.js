import React, { Component } from 'react';

import InputComponent from './../../components/InputComponent/inputcomponent.js';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
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

	render() {
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

				<button onClick={() => {this.props.onLogin(this.state.username, this.state.password)}}>Log in</button>
				<button onClick={this.props.onLogout}>Log out</button>
			</div>
		);
	}
}


export default LoginPage;