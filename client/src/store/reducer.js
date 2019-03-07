import * as actionTypes from './actions.js';
import axios from 'axios';

const SERVER_ADDRESS = 'http://127.0.0.1:8000';

const initialState = {
	something: [],
	test: false,
	loggedIn: false,
	username: null,
	userID: 123
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.REGISTER:
		// keys: username, password, fullname
			axios.post(`${SERVER_ADDRESS}/register`, {
				username: action.username,
				password: action.password,
				fullname: action.fullname
			})
			.then(response => console.log(response));
			return {
				...state
			}
		case actionTypes.LOGIN:
			let data = action.payload;

			if (data.login) {
				return {
					...state,
					loggedIn: data.login,
					username: data.user_name,
					userID: data.user_id
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
		default:
			return state;
	}
}

// const asyncDispatchMiddleware = store => next => action => {
//   let syncActivityFinished = false;
//   let actionQueue = [];

//   function flushQueue() {
//     actionQueue.forEach(a => store.dispatch(a)); // flush queue
//     actionQueue = [];
//   }

//   function asyncDispatch(asyncAction) {
//     actionQueue = actionQueue.concat([asyncAction]);

//     if (syncActivityFinished) {
//       flushQueue();
//     }
//   }

//   const actionWithAsyncDispatch =
//     Object.assign({}, action, { asyncDispatch });

//   const res = next(actionWithAsyncDispatch);

//   syncActivityFinished = true;
//   flushQueue();

//   return res;
// };


export default reducer;