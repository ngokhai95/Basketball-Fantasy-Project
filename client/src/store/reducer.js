import * as actionTypes from './actions.js';
import axios from 'axios';

const initialState = {
	something: [],
	test: false,
	loggedIn: false,
	username: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
		axios.get('http://127.0.0.1:8000/')
			.then(response => console.log(response));
			return {
				...state,
				loggedIn: action.action
			};
		case actionTypes.LOGOUT:
			return {
				...state,
				loggedIn: action.action
			}
		default:
			return state;
	}
}

export default reducer;