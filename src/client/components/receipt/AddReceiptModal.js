import React from 'react'

import { Select, Modal, Card, Form, Icon, Input, TextArea, Button } from 'semantic-ui-react'
 
import { Table, Label, Checkbox } from 'semantic-ui-react'

class AddReceiptModal extends React.Component {

  constructor(props) {
  
    super(props)

    this.state = {
      user: '',
      total: 0,
      name: '',
      amount: '',
      list: [],
      modalOpen: false
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSelect = (e, { name, value }) => this.setState({ name: value })

  handleClose = () => this.setState({ modalOpen: false })

  handleOpen = () => this.setState({ modalOpen: true })
  
  handleAddItem = () => {

    const { name, amount } = this.state
    const { menu } = this.props

    const menuItem = menu.find( (menu) => menu.name === name )
    const listItem = {
      name,
      amount,
      total: menuItem.price * amount,
      checked: false
    }

    let { list } = this.state

    const index = list.findIndex((item) => item.name === name)

    if (index === -1) {
      list.push(listItem)
    } else {
      list[index].amount = parseInt(list[index].amount) + parseInt(listItem.amount)
      list[index].total = parseInt(list[index].total) + parseInt(listItem.total)
    }

    this.setState({
      list: list
    })
  }

  handleSubmit = () => {

    const { list } = this.state

    this.props.handleAddReceipt(list).then(receipt => {
      this.setState({
        modalOpen: false
      })
    })
  }

  handleCheck = (event, {value}) => {

    let { list } = this.state
    list[value].checked = !list[value].checked
    this.setState({list})
  }

  handleDeleteSelectedRows = () => {

    let { list } = this.state
    list = list.filter((item) => !item.checked)
    this.setState({list})
  }

  handleDeleteAllRows = () => {

    this.setState({
      list: []
    })
  }

  render() {

    const { list, total } = this.state
    const { menu } = this.props
    const { amount } = this.state

    const menuOptions = menu.map(m => ({
      key: m.name,
      text: m.name,
      value: m.name
    }))

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
        <Modal.Header>Add new item</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form widths='equal'>
              <Form.Group>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {list.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell collapsing>
                          <Checkbox checked={item.checked} onChange={this.handleCheck} slider value={index}/>
                        </Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                        <Table.Cell negative>{item.total}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell colSpan='4'>
                        <Button onClick={this.handleSubmit} floated='right' icon labelPosition='left' primary size='small'>
                          <Icon name='add' /> Submit
                        </Button>
                        <Button disabled={list.length === 0} primary size='small' onClick={this.handleDeleteSelectedRows}>Delete Selected Rows</Button>
                        <Button disabled={list.length === 0} negative size='small' onClick={this.handleDeleteAllRows}>Delete All</Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>Total:</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>{total}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Form.Group>
              <Form.Group>
                <Select onChange={this.handleSelect} placeholder='Select menu' options={menuOptions}/>
                <Form.Field inline>
                  <label>Amount</label>
                  <Input placeholder='Amount' value={amount} name='amount' onChange={this.handleChange} />
                  <Button floated='right' size='small' icon labelPosition='left' positive onClick={this.handleAddItem}>
                    <Icon name='add to cart'></Icon>
                    Add to cart
                  </Button>
                </Form.Field>

              </Form.Group>
            </Form>

          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AddReceiptModal
