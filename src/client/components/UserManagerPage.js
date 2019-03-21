import React from 'react'

import { userService } from '../_services/user.service.js'

class UserManagerPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
			users: [],
			username: '',
			password:'',
			firstName: '',
			lastName: '',
			error: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			user: JSON.parse(localStorage.getItem('user')),
		})

		userService.getAll().then(users => {
			this.setState( {
				users
			} )
		})
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { username, password } = this.state
		const { firstName, lastName } = this.state

		// stop here if form is invalid
		if (!(username && password && firstName && lastName)) {
			this.setState({
				error: 'No input'
			})
			return;
		}

		userService.addUser(username, password, firstName, lastName)
			.then(
						user => {
							userService.getAll().then(users => {
								this.setState( {
									users
								} )
							})

							this.setState({
								username: '',
								password: '',
								firstName: '',
								lastName: ''
							})
						},
						error => this.setState({ error })
			);
	}

	render() {
		const {user, users } = this.state
		const {username, password, error} = this.state
		const {firstName, lastName} = this.state
		return (
			<div>
				<h1>
					User Manager Page
				</h1>
				<h1> Hello {user.firstName}  </h1>
				<h2> All users: </h2>
				<ul>
					{users.map( (user, index) => 
						<li key={user.id}>
							First name: {user.firstName}
							<br />
							Last name: {user.lastName}
						</li>
					) }
				</ul>
				<h2> Add new user </h2>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="username">Username </label> 
						<input type="text" name="username" value={username} autoComplete="off" onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="firstName">First name </label> 
						<input type="text" name="firstName" value={firstName} autoComplete="off" onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="lastName">Last name </label> 
						<input type="text" name="lastName" value={lastName} autoComplete="off" onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="password">Password </label>
						<input type="password" name="password" value={password} onChange={this.handleChange} />
					</div>
					<div>
						<button>Add user</button>
					</div>
					<div>
						{error &&
								<div> { error } </div>
						}
					</div>
				</form>
			</div>
		)
	}
}

export { UserManagerPage }
