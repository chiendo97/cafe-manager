import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Form, Col, ButtonGroup, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

import { receiptService } from '../_services/receipt.service.js'
import { menuService } from '../_services/menu.service.js'

const receiptCol = [
	{
		Header: 'Name',
		accessor: 'item'
	},
	{
		Header: 'Amount',
		accessor: 'amount',
	},
	{
		Header: 'Total .000 vnd',
		accessor: 'total'
	},
]

const allReceiptCol = [

]

class ReceiptPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			receipt : [],
			list: [
			],
			menu: [],
			item: {},
			amount: '',
			error: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	componentDidMount() {

		receiptService.getReceipt()
			.then(receipt => this.setState({ receipt }) )

		menuService.getMenu()
			.then(menu => this.setState({ menu }))
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { list } = this.state
		const { username } = JSON.parse(localStorage.getItem('user'))

		if (list.length == 0) {
			this.setState({
				error: 'lenght 0'
			})
			return
		}

		receiptService.addReceipt(username, list)
			.then(
				() => {
					this.setState({
						list: []
					})
					receiptService.getReceipt()
						.then( receipt => this.setState({ receipt }) )
				},
				error => this.setState({ error })
			)

	}

	handleSelect(e) {
		this.setState({ item : JSON.parse(e.target.value)});
  }

	handleAdd(e) {
		e.preventDefault();

		const {item, amount} = this.state

		if (!(item && amount)) {
			this.setState({
				error: 'Invalid input'
			})
			return
		}

		const newItem = {
			item: item.name,
			amount: amount,
			total: item.price * amount
		}

		this.setState({
			list: [...this.state.list, newItem],
			error: ''
		})

	}

	render() {
		const { receipt } = this.state
		const { menu } = this.state
		const { list, item, amount } = this.state
		const { error } = this.state

		return (
			<div>
				<h1>Receipt</h1>
				{
					receipt.map(r => {
						const { user } = r
						return (
							<div key={r._id}>
								<div>
									User: {user.firstname} {user.lastname}
								</div>
								<ul>
									{r.list.map(i => {
										return (
											<li key={i._id}>
												{i.item} : {i.amount} : {i.total}
											</li>
										)
									})}
									<li>
										Data: {r.created}
									</li>
									<li>
										Total: {r.total}
									</li>
								</ul>
							</div>
						)
					})
				}
				<h2> Add new receipt </h2>
				<ReactTable 
					data = { list }
					columns = { receiptCol }
					defaultPageSize = { 3 }
				/>
				<div>
					<h5>
						Total: { list.length ? list.reduce( (acc, curr) => acc + curr.total, 0) : 0 } .000 vnd
					</h5>
				</div>
				<form>
					<Form.Row>
						<Form.Group as={Col} >
							<Form.Label>Menu</Form.Label>
							<Form.Control name="item" as="select" onChange={this.handleSelect}>
								<option disable='true'> -- select an option -- </option>
								{ 
									menu.map(m => (
										<option key={m._id} value={JSON.stringify(m)}>{ m.name }</option>
									))
								}
							</Form.Control>
						</Form.Group>
						<Form.Group as={Col} >
							<Form.Label>Amount</Form.Label>
							<Form.Control name="amount" value={amount} autoComplete="off" type="text" placeholder="Amount" onChange={this.handleChange} />
						</Form.Group>
					</Form.Row>
					<ButtonGroup className="mt-3">
						<Button onClick={this.handleAdd} variant="primary" type="submit">
							Add item
						</Button>
						<Button onClick={this.handleSubmit} variant="primary" type="submit">
							Submit
						</Button>
					</ButtonGroup>
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

export { ReceiptPage }
