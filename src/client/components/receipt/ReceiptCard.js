import React from 'react'

import { Card } from 'semantic-ui-react'
import { Button, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

class ReceiptCard extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      modalOpen: false
    }
  }

  handleClose = () => this.setState({ modalOpen: false })

  handleOpen = () => this.setState({ modalOpen: true })

  render() {

    const { user, list, total, created } = this.props.receipt
    const time = new Date(created).toLocaleString()

    return (
      <Modal 
        trigger={
          <Card
            onClick={this.handleOpen}
          >
            <Card.Content>
              <Card.Header>
                <span>{user}</span>
              </Card.Header>
              <Card.Meta>
                <span className='date'>{time}</span>
              </Card.Meta>
              <Card.Description>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {list.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                        <Table.Cell negative>{item.total}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell>Total:</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>{total}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Card.Description>
            </Card.Content>
          </Card>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Header>Receipt Info</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Group inline>
                <Form.Field>
                  <label>User: </label>
                  <input readOnly value={user} placeholder='User: ' />
                </Form.Field>
                <Form.Field>
                  <label>Created: </label>
                  <input readOnly value={time} placeholder='Total: ' />
                </Form.Field>
              </Form.Group>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {list.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.amount}</Table.Cell>
                      <Table.Cell negative>{item.total}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell>Total:</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>{total}</Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
              <Button primary type='submit' onClick={this.handleClose}>Cancel</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ReceiptCard
