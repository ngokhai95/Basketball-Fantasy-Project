// import axios from 'axios';

// const SERVER_ADDRESS = 'http://127.0.0.1:8000';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADDTEAM = "ADDTEAM";
export const ADDPLAYER = "ADDPLAYER";
export const SELLPLAYER = "SELLPLAYER";
export const DEDUCTMONEY = "DEDUCTMONEY";
export const REFUNDMONEY = "REFUNDMONEY";
export const SETCAPTAIN = "SETCAPTAIN";

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

export const deductMoney = data => {
	return {
		type: DEDUCTMONEY,
		payload: data
	}
}

export const refundMoney = data => {
	return {
		type: REFUNDMONEY,
		payload: data
	}
}

export const setCaptain = data => {
	return {
		type: SETCAPTAIN,
		payload: data
	}
}