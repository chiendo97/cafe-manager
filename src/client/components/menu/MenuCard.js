import React from 'react'
import ConfirmModal from '../_buttons/ConfirmModal'

import { Card } from 'semantic-ui-react'
import { Button, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { TextArea } from 'semantic-ui-react'
import { Label } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'

class MenuCard extends React.Component {

  constructor(props) {
    super(props)

    const { menu } = this.props

    this.state = {
      name: menu.name,
      price: menu.price,
      description: menu.desc,
      image: menu.image,
      modalOpen: false
    }
  }



  handleChange = (e) => {

    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleClose = () => {

    this.setState({ modalOpen: false })

    const { menu } = this.props
    this.setState({
      name: menu.name,
      price: menu.price,
      description: menu.desc,
      modalOpen: false
    })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleUpdate = () => {

    const { name, price, description } = this.state
    this.props.handleUpdate(name, price, description).then(
      menu => {

        this.setState({ modalOpen: false })
      },
      error => {

        this.handleClose()
      }
    )
  }

  handleDelete = () => {

    const { name } = this.state
    this.props.handleDelete(name).then(menu => this.setState({ modalOpen: false }))
  }

  render() {

    const { name, price, description, image } = this.state
    const { user } = this.props

    console.log(image)

    return (
      <Modal
        trigger={
          <Card
            onClick={this.handleOpen}
          >
            {
              image ?
                <Image src={'http://localhost:4000/images/' + image} style={{ 'width': '100%', 'height': 'auto' }} avatar />
                :
                <Image src='images/default.jpg' style={{ 'width': '100%', 'height': 'auto' }} avatar />
            }
            <Card.Content>
              <Card.Header>
                <span>{name}</span>
              </Card.Header>
              <Card.Meta>
                <Label tag size='tiny'>${price}</Label>
              </Card.Meta>
              <Card.Description>{description}</Card.Description>
            </Card.Content>
          </Card>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>Menu Info</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Group inline>
                <Form.Field>
                  <label>Name</label>
                  <input name='name' onChange={this.handleChange} disabled value={name} placeholder='Name' />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input name='price' onChange={this.handleChange} readOnly={!(user && user.role === 'admin')} value={price} placeholder='Price' />
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

export default MenuCard
