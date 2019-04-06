import React, { Component } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Header.css";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	triggerLogout = () => {
		this.props.history.push("./");
		this.props.onLogOut();
	};

	goToMainPage = () => {
		this.props.history.push("./main");
	};

	goToManageTeam = () => {
		this.props.history.push("./createteam");
	};

	// TODO: create manage account page
	goToManageAccount = () => {
		console.log("manage account");
	};

	render() {
		let accountInfo = null;

		if (this.props.loggedIn) {
			accountInfo = (
				<Nav className="mr-auto">
					<h3>{this.props.username}</h3>

					<NavDropdown title="Menu" id="basic-nav-dropdown">
						<NavDropdown.Item onClick={this.goToMainPage}>
							Main
						</NavDropdown.Item>
						<NavDropdown.Item onClick={this.goToManageAccount}>
							Manage Account
						</NavDropdown.Item>
						<NavDropdown.Item onClick={this.goToManageTeam}>
							Manage Team
						</NavDropdown.Item>
						<NavDropdown.Item onClick={this.triggerLogout}>
							Logout
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			);
		}

		return (
			<div className="Header">
				<Navbar bg="primary" variant="dark" expand="lg">
					<Navbar.Brand>NBA Simulating Game</Navbar.Brand>

					{accountInfo}
				</Navbar>
			</div>
		);
	}
}

export default Header;
