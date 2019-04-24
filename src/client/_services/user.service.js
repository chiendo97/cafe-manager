import { authHeader, postHeader } from '../_helpers/auth-header.js'
import handleResponse from '../_helpers/handle-response.js'

import { BehaviorSubject } from 'rxjs'

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('user'))
)

export const userService = {
  currentUser: currentUserSubject.asObservable(),
  currentUserValue,
  login,
  logout,
  getAll,
  addUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  checkin
}

function currentUserValue() {
  return currentUserSubject.value
}

async function checkin(username, date, shift) {
  const requestOptions = {
    method: 'POST',
    header: postHeader(),
    body: JSON.stringify({ username, date, shift })
  }

  return fetch('/api/users/checkin', requestOptions).then(handleResponse)
}

async function deleteUser(username) {
  const requestOptions = {
    method: 'DELETE',
    headers: postHeader(),
    body: JSON.stringify({ username })
  }

  return fetch('/api/users/deleteUser', requestOptions).then(handleResponse)
}

async function updateUser(username, firstname, lastname) {
  const requestOptions = {
    method: 'PUT',
    headers: postHeader(),
    body: JSON.stringify({ username, firstname, lastname })
  }

  return fetch('/api/users/updateUser', requestOptions).then(handleResponse)
}

async function getUserByUsername(username) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch('/api/users/getUserByUsername/' + username, requestOptions).then(
    handleResponse
  )
}

async function addUser(username, password, firstname, lastname, role) {
  const requestOptions = {
    method: 'POST',
    headers: postHeader(),
    body: JSON.stringify({ username, password, firstname, lastname, role })
  }

  return fetch('/api/users/addUser', requestOptions).then(handleResponse)
}

async function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  return fetch('/api/users/authenticate', requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password)
        localStorage.setItem('user', JSON.stringify(user))

        currentUserSubject.next(user)
      }

      return user
    })
}

async function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch('/api/users/getAll', requestOptions).then(handleResponse)
}

async function logout() {
  localStorage.removeItem('user')
  currentUserSubject.next(null)
}
