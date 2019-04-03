import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Form, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

import { storageService } from '../_services/storage.service.js'

const columns = [
	{
		Header: 'Name',
		accessor: 'name'
	},
	{
		Header: 'Price (vnd)',
		accessor: 'price',
	},
	{
		Header: 'Amount (kg)',
		accessor: 'amount'
	}
]

class StoragePage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			items : [],
			name: '',
			price: '',
			amount: '',
			error: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {

		storageService.getStorage()
			.then( items => this.setState({ items }) )
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { name, price, amount } = this.state

		if (!(name && price && amount)) {
			this.setState({
				error: 'Invalid input'
			})
			return
		}

		storageService.addItem(name, price, amount)
			.then(
				() => {
					storageService.getStorage()
						.then( items => this.setState({ items }) )

					this.setState({
						name: '',
						price: '',
						amount: ''
					})
				},
				error => this.setState({ error })
			)

	}

	render() {
		const { items } = this.state
		const { name, price, amount } = this.state
		const { error } = this.state
		return (
			<div>
				<h1>Storage</h1>
				<ReactTable
					data = {items}
					columns = {columns}
					defaultPageSize={5}
				/>
				<h2> Add new item </h2>
				<form onSubmit={this.handleSubmit}>
					<Form.Row>
						<Form.Group as={Col} >
							<Form.Label>Name</Form.Label>
							<Form.Control name="name" value={name} autoComplete="off" type="text" placeholder="Name" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group as={Col} >
							<Form.Label>Price</Form.Label>
							<Form.Control name="price" value={price} autoComplete="off" type="text" placeholder="Price (.000 vnd)" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group as={Col} >
							<Form.Label>Amount</Form.Label>
							<Form.Control name="amount" value={amount} autoComplete="off" type="text" placeholder="Amount" onChange={this.handleChange} />
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

export { StoragePage }
