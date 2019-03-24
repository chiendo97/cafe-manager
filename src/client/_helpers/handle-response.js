import { userService } from '../_services/user.service.js'
console.log()

export default function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// 401 Unauthorized
				userService.logout();
				location.reload(true);
			}

			const error = (data && data.message) || response.statusText;
			console.log('handleResponse', error)
			return Promise.reject(error);
		}

		return data;
	});
}
