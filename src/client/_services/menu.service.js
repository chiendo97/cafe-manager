import { authHeader, postHeader } from '../_helpers/auth-header.js'
import handleResponse from '../_helpers/handle-response.js'

export const menuService = {
	getMenu,
	addMenu
}

function getMenu() {
	const requestOptions = {
		method : 'GET',
		headers: authHeader()
	}

	return fetch('/api/menu/getMenu', requestOptions).then(handleResponse)

}

function addMenu(name, price, desc) {
	const requestOptions = {
		method: 'POST',
		headers: postHeader(),
		body: JSON.stringify({ name, price, desc })
	}

	return fetch('/api/menu/addMenu', requestOptions)
		.then(handleResponse)
}
