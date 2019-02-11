import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import * as actionTypes from './store/actions.js';

import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/Header/header.js';
import LoginPage from './components/LoginPage/loginpage.js';
import RegisterPage from './components/RegisterPage/registerpage.js';

class App extends Component {
	state = {

	}

	render() {

		return (
			<div className="App">
				<Header 
					loggedIn={this.props.loggedIn}
					 />
				<Switch>
					<Route path="/register" component={RegisterPage}/>
					<Route path="/" exact component={LoginPage} />
				</Switch>
					

				<button onClick={this.props.onLogin}>Log in</button>
				<button onClick={this.props.onLogout}>Log out</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: () => dispatch({
			type: actionTypes.LOGIN,
			action: true
		}),
		onLogout: () => dispatch({
			type: actionTypes.LOGOUT,
			action: false
		})
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
