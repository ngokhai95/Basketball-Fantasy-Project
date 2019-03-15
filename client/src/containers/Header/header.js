import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showMenu: false
		}

		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	showMenu = (event) => {
		event.preventDefault();
    
	    this.setState({ showMenu: true }, () => {
			document.addEventListener('click', this.closeMenu);
		});
	}
	closeMenu = (event) => {
    
		if (!this.dropdownMenu.contains(event.target)) {
      
			this.setState({ showMenu: false }, () => {
				document.removeEventListener('click', this.closeMenu);
			});
    	}
    }

	render() {
		let accountInfo = null;

		if (this.props.loggedIn) {
			accountInfo = (
				<div className="AccountInfo">
					<h3>{this.props.username}</h3>

					{this.state.showMenu ? (
						<div 
							className="menu"
							ref={(element) => {
								this.dropdownMenu = element;
							}}>
							<button>Manage Account</button>
							<button>Manage Team</button>
							<button>Search</button>
						</div>) : null}
					<button onClick={this.showMenu}>Show menu</button>
				</div>);
		}

		return (
			<div className="Header">
				<header>
					<h1 id="title">NBA Simulating Game</h1>
					{accountInfo}
				</header>
			</div>
		);
	}
	
}


		
export default Header;