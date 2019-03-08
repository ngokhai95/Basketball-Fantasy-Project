// import axios from 'axios';

// const SERVER_ADDRESS = 'http://127.0.0.1:8000';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const logout = () => {
	return {
		type: LOGOUT
	}
}

export const completeLogin = (data) => {
	return {
		type: LOGIN,
		payload: data
	}
}