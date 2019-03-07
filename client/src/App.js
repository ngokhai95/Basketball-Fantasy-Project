import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import * as actionCreators from './store/actions.js';

import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './containers/Header/header.js';
import LoginPage from './containers/LoginPage/loginpage.js';
import RegisterPage from './containers/RegisterPage/registerpage.js';

class App extends Component {
	state = {

	}

	render() {

		return (
			<div className="App">
				<Header 
					loggedIn={this.props.loggedIn}
					username={this.props.username}
					 />
					
				<Switch>
					<Route 
						path="/register" 
						render={
							(props) => 
								<RegisterPage 
									{...props}
									onRegister={this.props.onRegister} />}
					/>
					<Route 
						path="/" 
						exact 
						render={
							(props) => 
								<LoginPage 
									{...props} 
									onLogin={this.props.onLogin}
									onLogout={this.props.onLogout}/>
								} 
					/>
				</Switch>
				<button>{this.props.userID}</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn,
		username: state.username,
		userID: state.userID
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: (username, password) => dispatch(actionCreators.sendLogin({
			username: username,
			password: password
		})),
		onLogout: () => dispatch(actionCreators.logout()),
		onRegister: (username, password, fullname) => dispatch(actionCreators.register({
			username: username,
			password: password,
			fullname: fullname
		}))
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
