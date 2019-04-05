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

	render() {
		let accountInfo = null;

		if (this.props.loggedIn) {
			accountInfo = (
				<Nav className="mr-auto">
					<h3>{this.props.username}</h3>

					<NavDropdown title="Menu" id="basic-nav-dropdown">
						<NavDropdown.Item href="#/action-1">
							Manage Account
						</NavDropdown.Item>
						<NavDropdown.Item href="#/action-2">
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
