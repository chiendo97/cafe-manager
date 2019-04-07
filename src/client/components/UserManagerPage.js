import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Form, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import { Link } from 'react-router-dom'

import { userService } from '../_services/user.service.js'
import { roleService } from '../_services/role.service'

const columns = [
  {
    Header: 'First name',
    accessor: 'firstname',
  },
  {
    Header: 'Last name',
    accessor: 'lastname'
  },
  {
    Header: 'Role',
    accessor: 'role.role'
  },
  {
    Header: 'Edit',
    accessor: 'username',
    Cell: props => <Link to={`/user/${props.value}`} >Edit</Link> 
  },
]

class UserManagerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      users: [],
      roles: [],
      username: '',
      password:'',
      firstName: '',
      lastName: '',
      role: '',
      error: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
    })

    roleService.getAllRole().then(
      roles => {
        this.setState({roles})
      }
    )

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

  handleSelect(e) {
    this.setState({ role : e.target.value});
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state
    const { firstName, lastName } = this.state
    const { role } = this.state

    if (!(username && password && firstName && lastName && role)) {
      this.setState({
        error: 'No input'
      })
      return;
    }

    userService.addUser(username, password, firstName, lastName, role)
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
            lastName: '',
            error: ''
          })
        }
      )
      .catch( error => this.setState({ error }) )
  }

  render() {
    const {user, users, roles } = this.state
    const {username, password, error} = this.state
    const {firstName, lastName} = this.state

    return (
      <div>
        <h1>
          User Manager Page
        </h1>
        <h3>
          Current user: {user.firstname} {user.lastname}
        </h3>
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
        {
          user.role && user.role.role == "admin" && 
            <div>
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
                  <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label>First name</Form.Label>
                    <Form.Control name="firstName" value={firstName} autoComplete="off" type="text" placeholder="First name" onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control name="lastName" value={lastName} autoComplete="off" type="text" placeholder="Last name" onChange={this.handleChange} />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Label>Role</Form.Label>
                  <Form.Control name="item" as="select" onChange={this.handleSelect}>
                    <option disable='true'> -- select an option -- </option>
                    {
                      roles.map(r => (
                        <option key={r._id} value={r.role}>{r.role}</option>
                      ))
                    }
                  </Form.Control>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </form>
            </div>
        }
      </div>
    )
  }
}

export { UserManagerPage }
