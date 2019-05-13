import React from 'react'

import {
  Modal,
  Card,
  Form,
  Icon,
  Input,
  Message,
  Button
} from 'semantic-ui-react'

class AddStorageModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      amount: '',
      modalOpen: false,
      error: {
        visible: false,
        message: ''
      }
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleClose = () => this.setState({ modalOpen: false })

  handleOpen = () => this.setState({ modalOpen: true })

  handleSubmit = () => {
    const { name, amount } = this.state

    if (name === '' || amount === 0 || amount === null || amount === '') {
      this.setState({
        error: {
          visible: true,
          message: 'Invalid input'
        }
      })
      return
    }

    return this.props.handleAddStorage(name, amount).then(storage => {
      this.handleClose()
      return storage
    })
  }

  render() {
    const { name, amount } = this.state

    return (
      <Modal
        trigger={
          <Card onClick={this.handleOpen}>
            <Icon
              color="black"
              name="add circle"
              fitted={true}
              size="massive"
            />
          </Card>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>Add new item</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  value={name}
                  label="Name"
                  placeholder="Name"
                  name="name"
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={Input}
                  value={amount}
                  label="Amount"
                  placeholder="Amount"
                  name="amount"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group inline>
                <Button positive type="submit" onClick={this.handleSubmit}>
                  Submit
                </Button>
                <Button negative type="submit" onClick={this.handleClose}>
                  Cancel
                </Button>
              </Form.Group>
              {this.state.error.visible && (
                <Message
                  negative
                  header="Could you check something!"
                  list={[this.state.error.message]}
                  onDismiss={this.handleDismiss}
                />
              )}
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AddStorageModal
