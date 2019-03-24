import { authHeader, postHeader } from '../_helpers/auth-header.js';
import handleResponse from '../_helpers/handle-response.js'

export const userService = {
	login,
	logout,
	getAll,
	addUser,
};

function addUser(username, password, firstName, lastName) {

	const requestOptions = {
		method: 'POST',
		headers: postHeader(),
		body: JSON.stringify({ username, password, firstName, lastName })
	};

	return fetch('/api/users/addUser', requestOptions)
		.then(handleResponse)

}

function login(username, password) {

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	};

	return fetch('/api/users/authenticate', requestOptions)
		.then(handleResponse)
		.then(
				user => {
					// login successful if there's a user in the response
					if (user) {
						// store user details and basic auth credentials in local storage 
						// to keep user logged in between page refreshes
						user.authdata = window.btoa(username + ':' + password);
						localStorage.setItem('user', JSON.stringify(user));
					}

					return user;
				},
		)
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	}

	return fetch('/api/users/getAll', requestOptions).then(handleResponse)

}

function logout() {
	localStorage.removeItem('user');
}
