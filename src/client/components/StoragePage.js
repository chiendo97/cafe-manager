import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { storageService } from '../_services/storage.service.js'

const columns = [
	{
		Header: 'Name',
		accessor: 'name'
	},
	{
		Header: 'Price',
		accessor: 'price',
	},
	{
		Header: 'Amount',
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
			.then( items => {
				this.setState({
					items
				})
			} )

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
				item => {
					storageService.getStorage()
						.then( items => {
							this.setState({
														items
							})
						} )

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
				<h2> Add new item </h2>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="name">Name </label> 
						<input type="text" name="name" value={name} autoComplete="off" onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="price">Price </label> 
						<input type="text" name="price" value={price} autoComplete="off" onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="amount">Amount </label> 
						<input type="text" name="amount" value={amount} autoComplete="off" onChange={this.handleChange} />
					</div>
					<div>
						<button>Add item</button>
					</div>
					<div>
						{error &&
								<div> { error } </div>
						}
					</div>
				</form>
				<h1>Storage</h1>
				<ReactTable
					data = {items}
					columns = {columns}
				/>
			</div>
		)
	}
}

export { StoragePage }
