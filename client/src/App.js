import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import * as actionTypes from './store/actions.js';

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
					<Route path="/register" component={RegisterPage}/>
					<Route path="/" exact component={LoginPage} />
				</Switch>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn,
		username: state.username
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
