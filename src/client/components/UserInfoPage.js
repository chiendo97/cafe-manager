import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Col, Button, ButtonToolbar } from "react-bootstrap"

import { userService } from '../_services/user.service'


class UserInfoPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      id: '',
      firstname: '',
      lastname: '',
      role: '',
      found: false,
      redirect: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    e.preventDefault()

    const { username } = this.state


    userService.deleteUser(username)
      .then(() => {
        this.setState({
          redirect: true
        })
      })

  }

  handleUpdate(e) {
    e.preventDefault()
    
    const { username, firstname, lastname } = this.state
    userService.updateUser(username, firstname, lastname)
      .then(
        u => {
          this.setState({
            redirect: true
          })
        }
      )
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    const { match: { params } } = this.props
    const username = params.username

    this.setState({
      id: username
    })

    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })

    userService.getUserByUsername(username)
      .then(
        u => {
          this.setState({
            username: u.username,
            firstname: u.firstname,
            lastname: u.lastname,
            role: u.role.role,
            found: true
          })
        }
      )
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/usermanager'/>;
    }

    const { username, firstname, lastname, role } = this.state
    const { user } = this.state

    return (
      <div>
        { !this.state.found && 
            <h1>User not found: {this.state.id}</h1>
        }
        { this.state.found && 
            <div>
              <h1>
                User Info: { username }
              </h1>
              <form onSubmit={this.handleUpdate}>
                <Form.Row>
                  <Form.Group as={Col} controlId="username">
                    <Form.Label>First name</Form.Label>
                    <Form.Control name="firstname" value={firstname} autoComplete="off" type="text" placeholder="First name" onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="lastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control name="lastname" value={lastname} autoComplete="off" type="text" placeholder="Last name" onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control disabled name="role" value={role} autoComplete="off" type="text" placeholder="Role" onChange={this.handleChange} />
                  </Form.Group>
                </Form.Row>
                <ButtonToolbar>
                  <Button variant="primary" size="lg" type="submit">
                    Update
                  </Button>
                  {
                    user.role && user.role.role === 'admin' && 
                      <Button variant="secondary" size="lg" onClick={this.handleDelete}>
                        Delete
                      </Button>
                  }
                </ButtonToolbar>
              </form>
            </div>
        }
      </div>
    )
  }
}

export { UserInfoPage }
