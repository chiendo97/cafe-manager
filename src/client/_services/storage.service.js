import { authHeader, postHeader } from '../_helpers/auth-header.js'
import handleResponse from '../_helpers/handle-response.js'

export const storageService = {
  getStorage,
  addItem,
  exportItem,
  removeItem
}

async function removeItem(name) {
  const requestOptions = {
    method: 'DELETE',
    headers: postHeader(),
    body: JSON.stringify({ name })
  }

  return fetch('/api/storage/removeItem', requestOptions).then(handleResponse)
}

async function exportItem(name, amount) {
  const requestOptions = {
    method: 'PUT',
    headers: postHeader(),
    body: JSON.stringify({ name, amount })
  }

  return fetch('/api/storage/exportItem', requestOptions).then(handleResponse)
}

async function getStorage() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch('/api/storage/getStorage', requestOptions).then(handleResponse)
}

async function addItem(name, amount) {
  const requestOptions = {
    method: 'POST',
    headers: postHeader(),
    body: JSON.stringify({ name, amount })
  }

  return fetch('/api/storage/addItem', requestOptions).then(handleResponse)
}
