import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const SERVER_ADDRESS = "http://127.0.0.1:8000";

class AccountManagementPage extends Component {
	constructor(props) {
		super(props);

		axios
			.post(`${SERVER_ADDRESS}/getName`, {
				userID: this.props.userID
			})
			.then(response => {
				this.setState({ fullname: response.data.full_name });
			});
		this.state = {
			password: "",
			confirmPassword: "",
			fullname: "",
			confirmNameChange: false,
			confirmPasswordChange: false
		};
	}

	handlePasswordChange = event => {
		this.setState({
			password: event.target.value
		});
	};

	handleConfirmPasswordChange = event => {
		this.setState({
			confirmPassword: event.target.value
		});
	};

	handleFullNameChange = event => {
		this.setState({
			fullname: event.target.value
		});
	};

	requestNameChange = () => {
		if (
			this.state.fullname.length <= 20 &&
			this.state.fullname.length > 0
		) {
			axios
				.post(`${SERVER_ADDRESS}/requestUserChange`, {
					type: "name",
					userID: this.props.userID,
					fullName: this.state.fullname
				})
				.then(response => {
					this.setState({
						confirmNameChange: response.data
					});
				});
		}
	};

	requestPasswordChange = () => {
		if (
			this.state.password === this.state.confirmPassword &&
			this.state.password.length <= 20 &&
			this.state.password.length > 0
		) {
			axios
				.post(`${SERVER_ADDRESS}/requestUserChange`, {
					type: "password",
					userID: this.props.userID,
					password: this.state.password
				})
				.then(response => {
					this.setState({
						confirmPasswordChange: response.data
					});
				});
		}
	};

	goToMainPage = () => {
		this.props.history.push("./main");
	};

	render() {
		let confirmNameChange = null;

		if (this.state.confirmNameChange) {
			confirmNameChange = <h3>Name change successful!</h3>;
		}

		let confirmPasswordChange = null;

		if (this.state.confirmPasswordChange) {
			confirmPasswordChange = <h3>Password change successful!</h3>;
		}

		return (
			<Container>
				<h3>Account Management</h3>
				<Form>
					<Form.Group controlId="changePassword">
						<Form.Label>Change Password</Form.Label>
						<Form.Control
							className="form-control"
							value={this.state.password}
							type="password"
							placeholder="Enter New Password"
							onChange={this.handlePasswordChange}
						/>
					</Form.Group>
					<Form.Group controlId="changeConfirmPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							className="form-control"
							value={this.state.confirmPassword}
							placeholder="Enter Password"
							type="password"
							onChange={this.handleConfirmPasswordChange}
						/>
					</Form.Group>
					<Button onClick={this.requestPasswordChange}>
						Confirm Change
					</Button>
					{confirmPasswordChange}
				</Form>
				<Form>
					<br />
					<Form.Group controlId="changeFullName">
						<Form.Label>Change Name</Form.Label>
						<Form.Control
							className="form-control"
							value={this.state.fullname}
							placeholder="Full Name"
							onChange={this.handleFullNameChange}
						/>
					</Form.Group>
					<Button onClick={this.requestNameChange}>
						Confirm Name Change
					</Button>
					{confirmNameChange}
				</Form>
				<br />
				<Button onClick={this.goToMainPage}>Go Back</Button>
			</Container>
		);
	}
}

export default AccountManagementPage;
