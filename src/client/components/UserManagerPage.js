import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Form, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

import { userService } from '../_services/user.service.js'

const columns = [
	{
		Header: 'First name',
		accessor: 'firstname',
	},
	{
		Header: 'Last name',
		accessor: 'lastname'
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

		userService.getAll().then(
			users => {
				this.setState( {
					users
				})
			},
			error => {
				this.setState({
					error
				})
			}
		)
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
						() => {
							userService.getAll().then(
								users => {
									this.setState( { users })
								},
								error => {
									this.setState({ error })
								}
							)

							this.setState({
								username: '',
								password: '',
								firstName: '',
								lastName: ''
							})
						}
			)
			.catch( error => this.setState({ error }) )
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
					Current user:
				</h3>
					<div>
						<span> First Name: { user.firstname }</span>
					</div>
					<div>
						<span> Last Name: { user.lastname }</span>
					</div>
				<h3> All users: </h3>
				<div>
					{error &&
							<div> { error } </div>
					}
				</div>
				<ReactTable
					data = {users}
					columns = {columns}
					defaultPageSize={5}
				/>
				<h3> Add new user </h3>
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
				</form>
			</div>
		)
	}
}

export { UserManagerPage }
