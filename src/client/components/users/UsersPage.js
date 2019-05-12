import React from 'react'

import { Card, Search, Icon, Divider } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'

import AddUserModal from './AddUserModal'
import UserCards from './UserCards'

import { userService } from '../../_services/user.service'

class UsersPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {},
      users: [],
      search: ''
    }
  }

  componentDidMount = () => {
    userService.currentUser.subscribe(user =>
      this.setState({ currentUser: user })
    )

    userService.getAll().then(users => {
      this.setState({ users })
    })
  }

  handleAddUser = async (
    username,
    password,
    firstname,
    lastname,
    role,
    description
  ) => {
    return userService
      .addUser(username, password, firstname, lastname, role, description)
      .then(user => {
        userService.getAll().then(users => {
          this.setState({ users })
        })

        return user
      })
  }

  handleUpdate = async (username, firstname, lastname, description) => {
    return userService.updateUser(username, firstname, lastname).then(user => {
      userService.getAll().then(users => {
        this.setState({ users })
      })

      return user
    })
  }

  handleDelete = async username => {
    return userService.deleteUser(username).then(user => {
      userService.getAll().then(users => {
        this.setState({ users })
      })

      return user
    })
  }

  handleSearch = (e, { value }) => {
    this.setState({ search: value })
  }

  handleSearchBlur = () => {
    this.setState({ search: '' })
  }

  handleCheckIn = async (username, day, shift) => {
    return userService.checkin(username, day, shift).then(() => {
      userService.getAll().then(users => {
        this.setState({ users })
      })
    })
  }

  render() {
    const { users } = this.state

    const re = new RegExp(_.escapeRegExp(this.state.search), 'i')
    const isMatch = result => re.test(result.firstname + ' ' + result.lastname)
    const searchUsers = users.filter(isMatch)

    const managers = searchUsers.filter(user => user.role === 'manager')
    const employee = searchUsers.filter(user => user.role === 'employee')

    return (
      <div>
        <Search
          input={{ icon: 'search', iconPosition: 'left' }}
          placeholder="Search user"
          open={false}
          style={{ textAlign: 'center' }}
          value={this.state.search}
          onSearchChange={this.handleSearch}
          onBlur={this.handleSearchBlur}
        />
        <Divider horizontal>
          <Header as="h4">
            <Icon name="user" />
            Managers
          </Header>
        </Divider>
        <Card.Group itemsPerRow={6}>
          <AddUserModal handleAddUser={this.handleAddUser} />
          {managers.map(user => (
            <UserCards
              user={user}
              key={user.username}
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete}
              handleCheckIn={this.handleCheckIn}
            />
          ))}
        </Card.Group>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="user" />
            Employee
          </Header>
        </Divider>
        <Card.Group itemsPerRow={6}>
          <AddUserModal handleAddUser={this.handleAddUser} />
          {employee.map(user => (
            <UserCards
              user={user}
              key={user.username}
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete}
              handleCheckIn={this.handleCheckIn}
            />
          ))}
        </Card.Group>
      </div>
    )
  }
}

export default UsersPage
