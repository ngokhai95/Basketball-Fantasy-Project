import * as actionTypes from './actions.js';

const initialState = {
	something: [],
	test: false,
	loggedIn: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
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