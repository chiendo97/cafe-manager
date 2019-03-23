import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Form, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

import { userService } from '../_services/user.service.js'

const columns = [
	{
		Header: 'First name',
		accessor: 'firstName',
	},
	{
		Header: 'Last name',
		accessor: 'lastName'
	},
]

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
				<h3>
					 Hello {user.firstName}
				</h3>
				<h2> All users: </h2>
				<ReactTable
					data = {users}
					columns = {columns}
					defaultPageSize={5}
				/>
				<h2> Add new user </h2>
				<form onSubmit={this.handleSubmit}>
					<Form.Row>
						<Form.Group as={Col} controlId="formBasicEmail">
							<Form.Label>Username</Form.Label>
							<Form.Control name="username" value={username} autoComplete="off" type="text" placeholder="Username" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group as={Col} controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control name="password" value={password} type="password" placeholder="Password" onChange={this.handleChange} />
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="formBasicEmail">
							<Form.Label>First name</Form.Label>
							<Form.Control name="firstName" value={firstName} autoComplete="off" type="text" placeholder="Username" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group as={Col} controlId="formBasicEmail">
							<Form.Label>Last name</Form.Label>
							<Form.Control name="lastName" value={lastName} autoComplete="off" type="text" placeholder="Username" onChange={this.handleChange} />
						</Form.Group>
					</Form.Row>
					<Button variant="primary" type="submit">
						Submit
					</Button>
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
