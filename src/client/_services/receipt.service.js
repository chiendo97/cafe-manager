import { authHeader, postHeader } from '../_helpers/auth-header.js'
import handleResponse from '../_helpers/handle-response.js'

export const receiptService = {
  getReceipt,
  addReceipt
}

function getReceipt() {
  const requestOptions = {
    method : 'GET',
    headers: authHeader()
  }

  return fetch('/api/receipt/getReceipt', requestOptions)
    .then(handleResponse)

}

function addReceipt(username, list) {
  const requestOptions = {
    method: 'POST',
    headers: postHeader(),
    body: JSON.stringify({username, list})
  }

  return fetch('/api/receipt/addReceipt', requestOptions)
    .then(handleResponse)
}
