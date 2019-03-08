import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import * as actionCreators from './store/actions.js';

import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './containers/Header/header.js';
import LoginPage from './containers/LoginPage/loginpage.js';
import RegisterPage from './containers/RegisterPage/registerpage.js';
import MainPage from './containers/MainPage/mainpage.js';

class App extends Component {
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
									completeLogin={this.props.completeLogin}
									onLogout={this.props.onLogout}
									loggedIn={this.props.loggedIn}/>
								} 
					/>
					<Route
						path="/main"
						exact
						render={
							(props) =>
								<MainPage
									{...props}/>
						}
					/>
				</Switch>
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
		completeLogin: (data) => {
			dispatch(actionCreators.completeLogin(data));
		},
		onLogout: () => dispatch(actionCreators.logout()),
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
