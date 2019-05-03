import { authHeader, postHeader } from '../_helpers/auth-header.js'
import handleResponse from '../_helpers/handle-response.js'

export const menuService = {
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuByName
}

async function getMenuByName(name) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch('/api/menu/getMenuByName/' + name, requestOptions).then(
    handleResponse
  )
}

async function deleteMenu(name) {
  const requestOptions = {
    method: 'DELETE',
    headers: postHeader(),
    body: JSON.stringify({ name })
  }

  return fetch('/api/menu/deleteMenu', requestOptions).then(handleResponse)
}

async function updateMenu(name, price, desc) {
  const requestOptions = {
    method: 'PUT',
    headers: postHeader(),
    body: JSON.stringify({ name, price, desc })
  }

  return fetch('/api/menu/updateMenu', requestOptions).then(handleResponse)
}

async function getMenu() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch('/api/menu/getMenu', requestOptions).then(handleResponse)
}

async function addMenu(name, price, desc, image) {
  const formData = new FormData()

  formData.append('image', image)
  formData.append('body', JSON.stringify({ name, price, desc }))

  return fetch('/api/menu/addMenu', {
    method: 'POST',
    headers: authHeader(),
    body: formData
  }).then(handleResponse)
}
