import React from 'react'

import { Card } from 'semantic-ui-react'
import { Button, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'

class StorageCard extends React.Component {

  constructor(props) {
    super(props)

    const { item } = this.props

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      name: item.name,
      amount: item.amount,
      exportAmount: 0,
      modalOpen: false
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.item.name,
      amount: nextProps.item.amount,
      exportAmount: 0,
    })
  }

  handleChange = (e) => {

    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleClose = () => {

    this.setState({ modalOpen: false })

    const { item } = this.props
    this.setState({
      name: item.name,
      amount: item.amount,
      exportAmount: 0,
      modalOpen: false
    })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleExport = () => {

    const { name, exportAmount } = this.state
    this.props.handleExport(name, exportAmount).then(storage => {
      this.setState({
        modalOpen: false
      })
      return storage
    })
  }

  render() {

    const { name, amount, exportAmount } = this.state
    const { user } = this.state

    return (
      <Modal 
        trigger={
          <Card
            onClick={this.handleOpen}
          >
            <Card.Content>
              <Card.Header>{this.props.item.name}</Card.Header>
              <Card.Meta>
                <span className='date'>{this.props.item.amount}</span>
              </Card.Meta>
            </Card.Content>
          </Card>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>Storage Info</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Group inline>
                <Form.Field>
                  <label>Name</label>
                  <input readOnly value={name} placeholder='Role' />
                </Form.Field>
                <Form.Field>
                  <label>Amount</label>
                  <input readOnly value={amount} placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                  <label>Export</label>
                  <input name='exportAmount' onChange={this.handleChange} value={exportAmount} placeholder='Export amount' />
                </Form.Field>
              </Form.Group>
              <Button disabled={!(user && user.role === 'admin')} primary type='submit' onClick={this.handleExport}>Export</Button>
              <Button positive type='submit' onClick={this.handleClose}>Cancel</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default StorageCard
