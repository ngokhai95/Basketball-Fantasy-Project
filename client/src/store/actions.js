// import axios from 'axios';

// const SERVER_ADDRESS = 'http://127.0.0.1:8000';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADDTEAM = "ADDTEAM";
export const ADDPLAYER = "ADDPLAYER";
export const SELLPLAYER = "SELLPLAYER";

export const logout = () => {
	return {
		type: LOGOUT
	};
};

export const completeLogin = data => {
	return {
		type: LOGIN,
		payload: data
	};
};

export const addNewTeam = data => {
	return {
		type: ADDTEAM,
		payload: data
	};
};

export const addPlayer = data => {
	return {
		type: ADDPLAYER,
		payload: data
	};
};

export const sellPlayer = data => {
	return {
		type: SELLPLAYER,
		payload: data
	};
};
