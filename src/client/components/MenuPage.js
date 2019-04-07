
import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Form, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import { Link } from 'react-router-dom'

import { menuService } from '../_services/menu.service.js'

const columns = [
	{
		Header: 'Name',
		accessor: 'name'
	},
	{
		Header: 'Price (.000 vnd)',
		accessor: 'price',
	},
	{
		Header: 'Description',
		accessor: 'desc'
	},
  {
    Header: 'Edit',
    accessor: 'name',
    Cell: props => <Link to={`/menu/${props.value}`} >Edit</Link> 
  },
]

class MenuPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			menu : [],
			name: '',
			price: '',
			desc: '',
			error: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {

		menuService.getMenu()
			.then( menu => this.setState({ menu }) )
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const { name, price, desc } = this.state

		if (!(name && price)) {
			this.setState({
				error: 'Invalid input'
			})
			return
		}

		menuService.addMenu(name, price, desc) 
			.then(
				() => {
					menuService.getMenu()
						.then( menu => this.setState({ menu }) )

					this.setState({
						name: '',
						price: '',
						desc: ''
					})
				},
				error => this.setState({ error })
			)

	}

	render() {
		const { menu } = this.state
		const { name, price, desc } = this.state
		const { error } = this.state
		return (
			<div>
				<h1>Menu</h1>
				<ReactTable
					data = {menu}
					columns = {columns}
					defaultPageSize={5}
				/>
				<h2> Add new menu </h2>
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
							<Form.Label>Description</Form.Label>
							<Form.Control name="desc" value={desc} autoComplete="off" type="text" placeholder="Description" onChange={this.handleChange} />
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

export { MenuPage }
