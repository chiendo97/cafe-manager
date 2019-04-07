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
    Header: 'Amount (kg)',
    accessor: 'amount'
  },
]

class StoragePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items : [],
      name: '',
      amount: '',
      exportItem: '',
      exportAmount: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {

    storageService.getStorage()
      .then( items => this.setState({ items }) )
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

	handleSelect(e) {
		this.setState({ exportItem: e.target.value });
  }

  handleExport(e) {
    e.preventDefault()

    const { exportItem, exportAmount } = this.state
    const item = this.state.items.find(i => i.name === exportItem)

    if (!item) {
      this.setState({
        error: "invalid export item: " + exportItem
      })
      return
    }

    if (exportAmount < 0 || exportAmount > item.amount) {
      this.setState({
        error: "invalid export amount: " + exportAmount
      })
      return
    }

    storageService.exportItem(exportItem, exportAmount)
      .then( 
        item => {
          if (item) {
            storageService.getStorage()
              .then( items => this.setState({ items }) )
          }
        },
        error => {
          this.setState({ error })
        } 
      )
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, amount } = this.state

    if (!(name && amount)) {
      this.setState({
        error: 'Invalid input'
      })
      return
    }

    storageService.addItem(name, amount)
      .then(
        () => {
          storageService.getStorage()
            .then( items => this.setState({ items }) )

          this.setState({
            name: '',
            amount: ''
          })
        },
        error => this.setState({ error })
      )

  }

  render() {
    const { items } = this.state
    const { name, amount } = this.state
    const { exportAmount } = this.state
    const { error } = this.state
    return (
      <div>
        <h1>Storage</h1>
        <ReactTable
          data = {items}
          columns = {columns}
          defaultPageSize={5}
        />
        <h2>Export item</h2>
        <form onSubmit={this.handleExport}>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Item</Form.Label>
              <Form.Control required name="exportItem" as="select" onChange={this.handleSelect}>
                <option disable='true'> -- select an item -- </option>
                { 
                  items.map(i => (
                    <option value={i.name} key={i.name}>{ i.name }</option>
                  ))
                }
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Amount</Form.Label>
              <Form.Control required name="exportAmount" value={exportAmount} autoComplete="off" type="text" placeholder="Amount" onChange={this.handleChange} />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Export
          </Button>
          <div>
            {error &&
              <div> { error } </div>
            }
          </div>
        </form>
        <h2> Add new item </h2>
        <form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={name} autoComplete="off" type="text" placeholder="Name" onChange={this.handleChange} />
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
