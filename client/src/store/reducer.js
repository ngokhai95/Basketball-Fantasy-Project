import * as actionTypes from "./actions.js";

// import axios from 'axios';

// const SERVER_ADDRESS = 'http://127.0.0.1:8000';

const initialState = {
	loggedIn: false,
	username: null,
	userID: null,
	teamInfo: null,
	teamCreation: [null, null, null, null, null]
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			let data = action.payload;
			if (data.login) {
				console.log(data);
				return {
					...state,
					loggedIn: data.login,
					username: data.username,
					userID: data.user_id,
					teamInfo: data.team_info,
					teamCreation: data.team_creation
				};
			} else {
				return {
					...state
				};
			}
		case actionTypes.LOGOUT:
			return {
				...state,
				loggedIn: false
			};
		case actionTypes.ADDTEAM:
			return {
				...state,
				teamInfo: action.payload
			};
		case actionTypes.ADDPLAYER:
			let index = parseInt(action.payload[0]);
			let playerID = action.payload[1];
			let original = initialState.teamCreation;
			original[index] = playerID;
			console.log(original);
			return {
				...state,
				teamCreation: original
			};
		default:
			return state;
	}
};

export default reducer;
