import React from 'react'

import { Card } from 'semantic-ui-react'
import { Button, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

class StorageCard extends React.Component {
  constructor(props) {
    super(props)

    const { item } = this.props

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      name: item.name,
      amount: item.amount,
      exportAmount: '',
      importAmount: '',
      modalOpen: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.item.name,
      amount: nextProps.item.amount,
      exportAmount: 0
    })
  }

  handleChange = e => {
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

  handleImport = () => {
    const { name, importAmount } = this.state
    this.props.handleExport(name, -importAmount).then(storage => {
      this.setState({
        modalOpen: false
      })
      return storage
    })
  }

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
    const { name, amount, exportAmount, importAmount } = this.state
    const { user } = this.state

    return (
      <Modal
        trigger={
          <Card onClick={this.handleOpen}>
            <Card.Content>
              <Card.Header>{this.props.item.name}</Card.Header>
              <Card.Meta>
                <span className="date">{this.props.item.amount}</span>
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
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="Name"
                  placeholder="Name"
                  readOnly
                  value={name}
                />
                <Form.Field
                  control={Input}
                  label="Amount"
                  placeholder="Amount"
                  readOnly
                  value={amount}
                />
              </Form.Group>
              <Form.Group inline>
                <Form.Field>
                  <label>Export</label>
                  <input
                    name="exportAmount"
                    onChange={this.handleChange}
                    value={exportAmount}
                    placeholder="Export amount"
                  />
                </Form.Field>
                <Button
                  disabled={!(user && user.role === 'admin')}
                  primary
                  type="submit"
                  onClick={this.handleExport}
                >
                  Export
                </Button>
              </Form.Group>
              <Form.Group inline>
                <Form.Field>
                  <label>Import</label>
                  <input
                    name="importAmount"
                    onChange={this.handleChange}
                    value={importAmount}
                    placeholder="Import amount"
                  />
                </Form.Field>
                <Button
                  disabled={!(user && user.role === 'admin')}
                  positive
                  type="submit"
                  onClick={this.handleImport}
                >
                  Import
                </Button>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default StorageCard
