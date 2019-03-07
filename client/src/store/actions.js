import axios from 'axios';

const SERVER_ADDRESS = 'http://127.0.0.1:8000';

export const LOGIN = 'LOGIN';
export const SENDLOGIN = 'SENDLOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export const sendLogin = (data) => {
	return dispatch => {
        axios.post(`${SERVER_ADDRESS}/login`, {
			username: data.username,
			password: data.password
		})
		.then(response => {
			console.log(response);
			dispatch(login(response.data));
		});
    }
}

const login = (data) => {
	return {
		type: LOGIN,
		payload: data
	}
}

export const logout = () => {
	return {
		type: LOGOUT
	}
}

export const register = (data) => {
	return dispatch => {
		axios.post(`${SERVER_ADDRESS}/register`, {
			username: data.username,
			password: data.password,
			fullname: data.fullname
		})
		.then(response => {
			console.log(response.data.success);
		});
	}
}