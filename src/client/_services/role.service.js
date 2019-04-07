import {authHeader, postHeader} from '../_helpers/auth-header'
import handleResponse from '../_helpers/handle-response'

export const roleService = {
  getAllRole
}

async function getAllRole() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch('/api/role/getAllRole', requestOptions).then(handleResponse)
}
