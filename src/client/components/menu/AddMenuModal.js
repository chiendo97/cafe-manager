import React from 'react'

import { Modal, Card, Form, Icon, Input, TextArea, Button } from 'semantic-ui-react'

class AddMenuModal extends React.Component {

  constructor(props) {
  
    super(props)

    this.state = {
      name: '',
      price: '',
      description: '',
      modalOpen: false
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleClose = () => this.setState({ modalOpen: false })

  handleOpen = () => this.setState({ modalOpen: true })

  handleSubmit = () => {
    const { name, price, description } = this.state

    console.log(name, price, description)
    this.props.handleAddMenu(name, price, description).then(menu => {
      this.handleClose()
    })
  }

  render() {

    const { name, price, description } = this.state

    return (
      <Modal 
        trigger={
          <Card
            onClick={this.handleOpen}
          >
            <Icon color='black' name='add circle' fitted={true} size='massive'></Icon>
          </Card>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>Add new menu</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field control={Input} value={name} label='Name' placeholder='Name' name='name' onChange={this.handleChange}/>
                <Form.Field control={Input} value={price} label='Price' placeholder='Price' name='price' onChange={this.handleChange}/>
              </Form.Group>
              <Form.Field control={TextArea} value={description} label='Description' placeholder='Make description about new menu...' name='description' onChange={this.handleChange} />
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

export default AddMenuModal
