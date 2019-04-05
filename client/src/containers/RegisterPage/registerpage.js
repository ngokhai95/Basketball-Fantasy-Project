import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const SERVER_ADDRESS = "http://127.0.0.1:8000";

class RegisterPage extends Component {
	state = {
		username: "",
		password: "",
		fullname: "",
		registered: false,
		registerMessage: null
	};

	goToLoginPage = () => {
		this.props.history.push("./");
	};

	handleUsernameChange = event => {
		this.setState({
			username: event.target.value
		});
	};

	handlePasswordChange = event => {
		this.setState({
			password: event.target.value
		});
	};

	handleFullNameChange = event => {
		this.setState({
			fullname: event.target.value
		});
	};

	registerAccount = () => {
		axios
			.post(`${SERVER_ADDRESS}/register`, {
				username: this.state.username,
				password: this.state.password,
				fullname: this.state.fullname
			})
			.then(response => {
				this.setState({
					registered: true,
					registerMessage: response.data.message
				});
			});
	};

	render() {
		let registerMessageBlock = null;

		if (this.state.registered) {
			registerMessageBlock = (
				<RegisterMessage message={this.state.registerMessage} />
			);
		}

		return (
			<Container>
				<h3>Register Page</h3>
				<Form className="form-signin">
					<Form.Group controlId="registerUserId">
						<Form.Label>Username</Form.Label>
						<Form.Control
							className="form-control"
							value={this.state.username}
							placeholder="Enter Username"
							onChange={this.handleUsernameChange}
						/>
					</Form.Group>

					<Form.Group controlId="registerPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							className="form-control"
							value={this.state.password}
							placeholder="Enter Password"
							type="password"
							onChange={this.handlePasswordChange}
						/>
					</Form.Group>

					<Form.Group controlId="registerFullname">
						<Form.Label>Full Name</Form.Label>
						<Form.Control
							className="form-control"
							value={this.state.fullname}
							placeholder="Enter your Full Name"
							onChange={this.handleFullNameChange}
						/>
					</Form.Group>
				</Form>
				<Button
					variant="secondary"
					type="button"
					onClick={this.registerAccount}
				>
					Register Account
				</Button>
				{registerMessageBlock}
				<br />
				<Button
					variant="info"
					type="button"
					onClick={this.goToLoginPage}
				>
					Go back to Login
				</Button>
			</Container>
		);
	}
}

const RegisterMessage = props => {
	return <div>{props.message}</div>;
};

export default RegisterPage;
