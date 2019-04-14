import React, { Component } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

class ConfirmModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  onConfirm = () => this.props.onConfirm()

  render() {
    const { open } = this.state
    const { children } = this.props

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button negative icon>
            {children} 
          </Button>
        }
      >
        <Modal.Header>Confirm?</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <h1>Are you sure?</h1>
            <Button negative icon='check' content='Sure' onClick={this.onConfirm} />
            <Button icon='check' content='Cancel' onClick={this.close} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ConfirmModal
