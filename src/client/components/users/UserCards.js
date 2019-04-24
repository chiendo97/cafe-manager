import React from 'react'

import { Card } from 'semantic-ui-react'
import { Button, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

import ConfirmModal from '../_buttons/ConfirmModal'

class UserCards extends React.Component {
  constructor(props) {
    super(props)

    const { user } = this.props

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      description: user.description,
      checkin: user.checkin,
      modalOpen: false
    }
  }

  handleClose = () => {
    this.setState({ modalOpen: false })

    const { user } = this.props

    this.setState({
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      description: user.description
    })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleUpdate = () => {
    const { username, firstname, lastname, description } = this.state
    this.props
      .handleUpdate(username, firstname, lastname, description)
      .then(user => {
        this.setState({ modalOpen: false })
      })
  }

  handleDelete = () => {
    const { username } = this.state
    this.props.handleDelete(username).then(user => {
      this.setState({ modalOpen: false })
    })
  }

  render() {
    const {
      username,
      firstname,
      lastname,
      role,
      description,
      checkin
    } = this.state
    const { user } = this.state

    console.log(checkin)

    return (
      <Modal
        trigger={
          <Card onClick={this.handleOpen}>
            <Card.Content>
              <Image src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" />
              <Card.Content>
                <Card.Header>{firstname + ' ' + lastname}</Card.Header>
                <Card.Meta>Joined in 2016</Card.Meta>
              </Card.Content>
            </Card.Content>
          </Card>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>User Info</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Group inline>
                <Form.Field>
                  <label>User name</label>
                  <input disabled value={username} placeholder="User name" />
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    name="firstname"
                    onChange={this.handleChange}
                    readOnly={!(user && user.role === 'admin')}
                    value={firstname}
                    placeholder="First Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    name="lastname"
                    onChange={this.handleChange}
                    readOnly={!(user && user.role === 'admin')}
                    value={lastname}
                    placeholder="Last Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Role</label>
                  <input disabled value={role} placeholder="Role" />
                </Form.Field>
              </Form.Group>
              <Table celled style={{ textAlign: 'center' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell rowSpan="2">Date</Table.HeaderCell>
                    <Table.HeaderCell colSpan="3">Shift</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>1</Table.HeaderCell>
                    <Table.HeaderCell>2</Table.HeaderCell>
                    <Table.HeaderCell>3</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {checkin.map(checkin => (
                    <Table.Row key={checkin._id}>
                      <Table.Cell>
                        {new Date(checkin.time).toDateString()}
                      </Table.Cell>
                      {checkin.shift === 1 && (
                        <React.Fragment>
                          <Table.Cell textAlign="center">
                            <Icon color="green" name="checkmark" size="large" />
                          </Table.Cell>
                          <Table.Cell />
                          <Table.Cell />
                        </React.Fragment>
                      )}
                      {checkin.shift === 2 && (
                        <React.Fragment>
                          <Table.Cell />
                          <Table.Cell textAlign="center">
                            <Icon color="green" name="checkmark" size="large" />
                          </Table.Cell>
                          <Table.Cell />
                        </React.Fragment>
                      )}
                      {checkin.shift === 3 && (
                        <React.Fragment>
                          <Table.Cell />
                          <Table.Cell />
                          <Table.Cell textAlign="center">
                            <Icon color="green" name="checkmark" size="large" />
                          </Table.Cell>
                        </React.Fragment>
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Button
                disabled={!(user && user.role === 'admin')}
                primary
                type="submit"
                onClick={this.handleUpdate}
              >
                Update
              </Button>
              {user && user.role === 'admin' && (
                <ConfirmModal onConfirm={this.handleDelete}>
                  Delete
                </ConfirmModal>
              )}
              <Button positive type="submit" onClick={this.handleClose}>
                Cancel
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UserCards
