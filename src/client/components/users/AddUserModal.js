import React from 'react'

import {
  Modal,
  Card,
  Form,
  Icon,
  Input,
  Radio,
  TextArea,
  Button,
  Image
} from 'semantic-ui-react'

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
    const {
      username,
      password,
      firstname,
      lastname,
      role,
      description
    } = this.state
    console.log(username, password, firstname, lastname, role, description)
    this.props
      .handleAddUser(username, password, firstname, lastname, role)
      .then(user => {
        this.handleClose()
      })
  }

  render() {
    const {
      username,
      password,
      firstname,
      lastname,
      role,
      description
    } = this.state

    return (
      <Modal
        trigger={
          <Card onClick={this.handleOpen}>
            <Image src="data:image/jpeg;base64,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" />
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
              <Form.Group widths="equal">
                <Form.Field
                  autoComplete="false"
                  control={Input}
                  value={username}
                  label="Username"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  type="password"
                  value={password}
                  label="Password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  value={firstname}
                  label="First name"
                  placeholder="First name"
                  name="firstname"
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  value={lastname}
                  label="Last name"
                  placeholder="Last name"
                  name="lastname"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group inline>
                <label>Role</label>
                <Form.Field
                  control={Radio}
                  label="Admin"
                  value="admin"
                  checked={role === 'admin'}
                  name="role"
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label="Manager"
                  value="manager"
                  checked={role === 'manager'}
                  name="role"
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Radio}
                  label="Employee"
                  value="employee"
                  checked={role === 'employee'}
                  name="role"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Field
                control={TextArea}
                value={description}
                label="Description"
                placeholder="Make description about new user..."
                name="description"
                onChange={this.handleChange}
              />
              <Form.Group inline>
                <Button positive type="submit" onClick={this.handleSubmit}>
                  Submit
                </Button>
                <Button negative type="submit" onClick={this.handleClose}>
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AddUserModal
