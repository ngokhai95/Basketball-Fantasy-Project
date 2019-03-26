import * as actionTypes from './actions.js';

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
					teamInfo: data.team_info
				}
			} else {
				// let user know of failure
				return {
					...state
				}
			}
		case actionTypes.LOGOUT:
			return {
				...state,
				loggedIn: false
			}
		case actionTypes.ADDTEAM:
			return {
				...state,
				teamInfo: action.payload
			}
		default:
			return state;
	}
}

export default reducer;