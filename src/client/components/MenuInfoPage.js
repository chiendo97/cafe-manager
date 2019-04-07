import React from 'react'

import { Redirect } from 'react-router-dom'
import { Form, Col, Button, ButtonToolbar } from "react-bootstrap"

import { menuService } from '../_services/menu.service'

class MenuInfoPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.name,
      name: '',
      price: '',
      desc: '',
      found: false,
      redirect: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    e.preventDefault()

    const { name } = this.state

    menuService.deleteMenu(name)
      .then(() => {
        this.setState({
          redirect: true
        })
      })

  }

  handleUpdate(e) {
    e.preventDefault()
    
    const { name, price, desc } = this.state

    menuService.updateMenu(name, price, desc)
      .then(
        menu => {
          if (menu) {
            this.setState({
              redirect: true,
              name: menu.name,
              price: menu.price,
              desc: menu.desc,
              found: true
            })
          }
        }
      )
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {

    const { id } = this.state

    menuService.getMenuByName(id)
      .then(
        menu => {
          if (menu) {
            this.setState({
              name: menu.name,
              price: menu.price,
              desc: menu.desc,
              found: true
            })
          }
        }
      )

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/menu'></Redirect>
    }

    const { found } = this.state

    if (!found) {
      return (
        <div>
          <h1>Menu Info: {this.state.id} not found</h1>
        </div>
      )
    }

    const {name, price, desc} = this.state

    return (
      <div>
        <h1>Menu Info: {this.state.id} </h1>
        <form onSubmit={this.handleUpdate}>
          <Form.Row>
            <Form.Group as={Col} controlId="username">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" value={price} autoComplete="off" type="text" placeholder="Price" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="lastname">
              <Form.Label>Description</Form.Label>
              <Form.Control name="desc" value={desc} autoComplete="off" type="text" placeholder="Description" onChange={this.handleChange} />
            </Form.Group>
          </Form.Row>
          <ButtonToolbar>
            <Button variant="primary" size="lg" type="submit">
              Update
            </Button>
            <Button variant="secondary" size="lg" onClick={this.handleDelete}>
              Delete
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    )
  }
}

export { MenuInfoPage }

