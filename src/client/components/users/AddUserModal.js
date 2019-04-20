import React from 'react'

import { Modal, Card, Form, Icon, Input, Radio, TextArea, Button } from 'semantic-ui-react'

class AddUserModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      role: '',
      description: '',
      modalOpen: false
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleClose = () => this.setState({ modalOpen: false })

  handleOpen = () => this.setState({ modalOpen: true })

  handleSubmit = () => {
    const { username, password, firstname, lastname, role, description } = this.state
    console.log(username, password, firstname, lastname, role, description)
    this.props.handleAddUser(username, password, firstname, lastname, role)
      .then(
        user => {
          this.handleClose()
        }
      )
  }

  render() {

    const { username, password, firstname, lastname, role, description } = this.state

    return (
      <Modal
        trigger={
          <Card
            onClick={this.handleOpen}
          >
            <Icon
              style={{
                'margin': '0',
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%, -50%)',
              }}
              color='black' name='add circle' size='massive'></Icon>
          </Card>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>Add a new user</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field autoComplete="false" control={Input} value={username} label='Username' placeholder='Username' name='username' onChange={this.handleChange} />
                <Form.Field control={Input} type='password' value={password} label='Password' placeholder='Password' name='password' onChange={this.handleChange} />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field control={Input} value={firstname} label='First name' placeholder='First name' name='firstname' onChange={this.handleChange} />
                <Form.Field control={Input} value={lastname} label='Last name' placeholder='Last name' name='lastname' onChange={this.handleChange} />
              </Form.Group>
              <Form.Group inline>
                <label>Role</label>
                <Form.Field
                  control={Radio}
                  label='Admin'
                  value='admin'
                  checked={role === 'admin'}
                  name='role'
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Manager'
                  value='manager'
                  checked={role === 'manager'}
                  name='role'
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label='Employee'
                  value='employee'
                  checked={role === 'employee'}
                  name='role'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Field control={TextArea} value={description} label='Description' placeholder='Make description about new user...' name='description' onChange={this.handleChange} />
              <Form.Group inline>
                <Button positive type='submit' onClick={this.handleSubmit}>Submit</Button>
                <Button negative type='submit' onClick={this.handleClose}>Cancel</Button>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AddUserModal
