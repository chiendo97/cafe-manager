import React from 'react'

import { Card } from 'semantic-ui-react'
import { Button, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { TextArea } from 'semantic-ui-react'

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
      description: user.description,
    })
  }

  handleChange = (e) => {

    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleUpdate = () => {

    const { username, firstname, lastname, description } = this.state
    this.props.handleUpdate(username, firstname, lastname, description).then(user => {
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

    const { username, firstname, lastname, role, description } = this.state
    const { user } = this.state

    return (
      <Modal 
        trigger={
          <Card
            onClick={this.handleOpen}
          >
            <Card.Content>
              <Card.Header>{firstname} {lastname}</Card.Header>
              <Card.Meta>
                <span className='date'>{role}</span>
              </Card.Meta>
              <Card.Description>{description}</Card.Description>
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
                  <input disabled value={username} placeholder='User name' />
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <Form.Field>
                  <label>First Name</label>
                  <input name='firstname' onChange={this.handleChange} readOnly={!(user && user.role === 'admin')} value={firstname} placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input name='lastname' onChange={this.handleChange} readOnly={!(user && user.role === 'admin')} value={lastname} placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                  <label>Role</label>
                  <input disabled value={role} placeholder='Role' />
                </Form.Field>
              </Form.Group>
              <Form.Field name='description' onChange={this.handleChange} readOnly={!(user && user.role === 'admin')} control={TextArea} value={description} label='Description' placeholder='' />
              <Button disabled={!(user && user.role === 'admin')} primary type='submit' onClick={this.handleUpdate}>Update</Button>
              {
                user && user.role === 'admin' && 
                  <ConfirmModal onConfirm={this.handleDelete}>Delete</ConfirmModal>
              }
              <Button positive type='submit' onClick={this.handleClose}>Cancel</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UserCards
