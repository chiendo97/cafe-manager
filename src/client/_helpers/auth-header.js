export function authHeader() {
	const user = JSON.parse(localStorage.getItem('user'))

	if (user && user.authdata) {
		return { 'Authorization': 'Basic ' + user.authdata }
	} else {
		return {}
	}
}


export function postHeader() {
	return Object.assign( authHeader(), { 'Content-Type': 'application/json' } )
}

