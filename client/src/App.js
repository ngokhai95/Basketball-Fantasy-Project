import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import * as actionCreators from "./store/actions.js";

import { Route, Switch, withRouter } from "react-router-dom";

import Header from "./containers/Header/header.js";
import LoginPage from "./containers/LoginPage/loginpage.js";
import RegisterPage from "./containers/RegisterPage/registerpage.js";
import MainPage from "./containers/MainPage/mainpage.js";
import TeamCreationPage from "./containers/TeamCreationPage/teamcreationpage.js";
import SearchPage from "./containers/SearchPage/searchpage.js";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header
					history={this.props.history}
					loggedIn={this.props.loggedIn}
					username={this.props.username}
					onLogOut={this.props.onLogout}
				/>

				<Switch>
					<Route
						path="/register"
						render={props => (
							<RegisterPage
								{...props}
								onRegister={this.props.onRegister}
							/>
						)}
					/>
					<Route
						path="/"
						exact
						render={props => (
							<LoginPage
								{...props}
								completeLogin={this.props.completeLogin}
								onLogout={this.props.onLogout}
								loggedIn={this.props.loggedIn}
							/>
						)}
					/>
					<Route
						path="/main"
						exact
						render={props => (
							<MainPage
								{...props}
								teamInfo={this.props.teamInfo}
								userID={this.props.userID}
								addNewTeam={this.props.addNewTeam}
							/>
						)}
					/>
					<Route
						path="/createteam"
						exact
						render={props => (
							<TeamCreationPage
								{...props}
								teamInfo={this.props.teamInfo}
								teamCreation={this.props.teamCreation}
							/>
						)}
					/>
					<Route
						path="/search/:playerIndex"
						render={props => (
							<SearchPage
								{...props}
								addPlayer={this.props.addPlayer}
								teamID={this.props.teamInfo.team_id}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.loggedIn,
		username: state.username,
		userID: state.userID,
		teamInfo: state.teamInfo,
		teamCreation: state.teamCreation
	};
};

const mapDispatchToProps = dispatch => {
	return {
		completeLogin: data => {
			dispatch(actionCreators.completeLogin(data));
		},
		onLogout: () => dispatch(actionCreators.logout()),
		addNewTeam: data => {
			dispatch(actionCreators.addNewTeam(data));
		},
		addPlayer: data => {
			dispatch(actionCreators.addPlayer(data));
		}
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
