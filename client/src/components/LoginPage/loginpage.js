import React from 'react';

const LoginPage = (props) => {
	let change = () => { props.history.push('./register');} 

	return (
		<div>
			<h1>LoginPage</h1>
			<button onClick={change}>Change</button>
		</div>
	);
}

export default LoginPage;