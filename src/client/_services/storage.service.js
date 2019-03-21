import { authHeader, postHeader } from '../_helpers/auth-header.js'
import handleResponse from '../_helpers/handle-response.js'

export const storageService = {
	getStorage,
	addItem,
}

function getStorage() {
	const requestOptions = {
		method : 'GET',
		headers: authHeader()
	}

	return fetch('/api/storage/getStorage', requestOptions).then(handleResponse)

}

function addItem(name, price, amount) {
	const requestOptions = {
		method: 'POST',
		headers: postHeader(),
		body: JSON.stringify({ name, price, amount })
	}

	return fetch('/api/storage/addItem', requestOptions)
		.then(handleResponse)
		.then(item => {
			return item
		})
}
