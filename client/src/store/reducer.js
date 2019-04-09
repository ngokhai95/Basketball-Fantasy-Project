import * as actionTypes from "./actions.js";

// import axios from 'axios';

// const SERVER_ADDRESS = 'http://127.0.0.1:8000';

const initialState = {
	loggedIn: false,
	username: null,
	userID: null,
	teamInfo: null,
	teamCreation: [null, null, null, null, null],
	playerMoney: 25
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
			let original = state.teamCreation;
			original[index] = playerID;
			return {
				...state,
				teamCreation: original
			};
		case actionTypes.SELLPLAYER:
			let playerIDToSell = action.payload;
			let indexToSell = state.teamCreation.indexOf(playerIDToSell);

			let originalToSell = state.teamCreation;
			originalToSell[indexToSell] = null;
			return {
				...state,
				teamCreation: originalToSell
			};
		case actionTypes.DEDUCTMONEY:
			let moneyToDeduct = action.payload;
			let newValue = initialState.playerMoney - moneyToDeduct;
			return {
				...state,
				playerMoney: newValue
			}
		case actionTypes.REFUNDMONEY:
			let refund = action.payload;
			let newRefunded = state.playerMoney + refund;
			return {
				...state,
				playerMoney: newRefunded
			}
		default:
			return state;
	}
};

export default reducer;
