import React from 'react';
import AccountInfo from './account_info.js';

import './Header.css';

const Header = (props) => {
	let accountInfo = null;

	if (props.loggedIn) {
		accountInfo = <AccountInfo></AccountInfo>
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
		
export default Header;