import React from 'react';

import './Header.css';

const Header = (props) => {
	let accountInfo = null;

	if (props.loggedIn) {
		accountInfo = <AccountInfo username={props.username}></AccountInfo>
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

const AccountInfo = (props) => {

	return (
		<div className="AccountInfo">
			<h3>{props.username}</h3>
			<h4>Some dropdown menu</h4>
		</div>
	);
}
		
export default Header;