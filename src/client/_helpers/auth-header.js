import { userService } from '../_services/user.service'

export function authHeader() {
  const user = userService.currentUserValue()

  if (user && user.authdata) {
    return { Authorization: 'Basic ' + user.authdata }
  } else {
    return {}
  }
}

export function postHeader() {
  return Object.assign(authHeader(), { 'Content-Type': 'application/json' })
}
