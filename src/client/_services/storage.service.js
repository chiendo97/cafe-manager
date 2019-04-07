import { authHeader, postHeader } from '../_helpers/auth-header.js'
import handleResponse from '../_helpers/handle-response.js'

export const storageService = {
	getStorage,
	addItem,
  exportItem,
}

function exportItem(name, amount) {

  const requestOptions = {
    method: 'PUT',
    headers: postHeader(),
    body: JSON.stringify({ name, amount })
  }

  return fetch('/api/storage/exportItem', requestOptions)
    .then(handleResponse)
}

function getStorage() {
	const requestOptions = {
		method : 'GET',
		headers: authHeader()
	}

	return fetch('/api/storage/getStorage', requestOptions).then(handleResponse)

}

function addItem(name, amount) {
	const requestOptions = {
		method: 'POST',
		headers: postHeader(),
		body: JSON.stringify({ name, amount })
	}

	return fetch('/api/storage/addItem', requestOptions)
		.then(handleResponse)
}
