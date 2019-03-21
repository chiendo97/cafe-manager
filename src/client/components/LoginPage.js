import React from 'react'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

import { userService } from '../_services/user.service.js'

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		userService.logout();

		this.state = {
			username: '',
			password: '',
			error: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { username, password, returnUrl } = this.state;

		// stop here if form is invalid
		if (!(username && password)) {
			return;
		}

		userService.login(username, password)
			.then(
						user => {
							const { from } = this.props.location.state || { from: { pathname: "/" } };
							this.props.history.push(from);
						},
						error => this.setState({ error })
			);
	}

	render() {
		const { username, password, error } = this.state;
		return (
						<div>
							<h2>Login</h2>
							<form onSubmit={this.handleSubmit}>
								<div>
									<label htmlFor="username">Username</label> 
									<input type="text" name="username" value={username} autoComplete="off" onChange={this.handleChange} />
								</div>
								<div>
									<label htmlFor="password">Password</label>
									<input type="password" name="password" value={password} onChange={this.handleChange} />
								</div>
								<div>
									<button>Login</button>
								</div>
								<div>
									{error &&
											<div> { error } </div>
									}
								</div>
							</form>
						</div>
		);
	}
}

export { LoginPage }; 
