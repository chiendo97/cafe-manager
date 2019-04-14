import React from 'react'

import { Card } from 'semantic-ui-react'

import AddUserModal from './AddUserModal'
import UserCards from './UserCards'

import { userService } from '../../_services/user.service'

class UsersPage extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      currentUser: {},
      users : []
    }
  }

  componentDidMount = () => {
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('user'))
    })

    userService.getAll()
      .then(users => {
        this.setState({users})
      })
  }

  handleAddUser = (username, password, firstname, lastname, role, description) => {

    return userService.addUser(username, password, firstname, lastname, role, description)
      .then(user => {
        userService.getAll()
          .then(users => {
            this.setState({users})
          })

        return user
      })
  }

  handleUpdate = (username, firstname, lastname, description) => {

    return userService.updateUser(username, firstname, lastname).then(user => {

        userService.getAll()
          .then(users => {
            this.setState({users})
          })

        return user
    })
  }

  handleDelete = (username) => {

    return userService.deleteUser(username).then(user => {

        userService.getAll()
          .then(users => {
            this.setState({users})
          })

        return user
    })
  }

  render() {

    const { users } = this.state

    return (
      <div>
        <Card.Group itemsPerRow={4}>
          { users.map(user => <UserCards user={user} key={user.username} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete}/>)}
          <AddUserModal handleAddUser={this.handleAddUser}/>
        </Card.Group>
      </div>
    )
  }
}

export default UsersPage
