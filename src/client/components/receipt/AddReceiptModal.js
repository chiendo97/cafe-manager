import React from 'react'

import {
  Modal,
  Card,
  Form,
  Icon,
  Input,
  Button,
  Message,
  TextArea,
  Table,
  Label,
  Checkbox,
  Image
} from 'semantic-ui-react'

class AddReceiptModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      total: 0,
      name: '',
      list: [],
      modalOpen: false,
      error: {
        visible: false,
        message: ''
      }
    }
  }

  handleClose = () => this.setState({ modalOpen: false })

  handleOpen = () => this.setState({ modalOpen: true })

  handleSubmit = () => {
    const { list } = this.state

    if (list.length === 0) {
      this.setState({
        error: {
          visible: true,
          message: 'Empty list'
        }
      })
      return
    }

    const emptyItems = list.filter(item => item.total === 0)

    if (emptyItems.length > 0) {
      this.setState({
        error: {
          visible: true,
          message: 'Item has empty amount'
        }
      })
      return
    }

    const checkedItems = list.filter(item => item.checked)

    if (checkedItems.length > 0) {
      this.setState({
        error: {
          visible: true,
          message: 'Some items has checked. Need to uncheck items first'
        }
      })
      return
    }

    this.props.handleAddReceipt(list).then(() => {
      this.setState({
        list: [],
        modalOpen: false
      })
    })
  }

  handleCheck = (event, { value }) => {
    let { list } = this.state
    list[value].checked = !list[value].checked
    this.setState({ list })
  }

  handleDeleteSelectedRows = () => {
    let { list } = this.state
    list = list.filter(item => !item.checked)
    this.setState({ list })
  }

  handleDeleteAllRows = () => {
    this.setState({
      list: []
    })
  }

  handleCardOnClick = (name, amount) => {
    console.log('card click ' + name + ' ' + amount)
    const { menu } = this.props

    const menuItem = menu.find(menu => menu.name === name)
    const listItem = {
      name,
      amount,
      total: menuItem.price * amount,
      checked: false
    }

    let { list } = this.state

    const index = list.findIndex(item => item.name === name)

    if (index === -1) {
      list.push(listItem)
    } else {
      list[index].amount =
        parseInt(list[index].amount) + parseInt(listItem.amount)
      list[index].total = parseInt(list[index].total) + parseInt(listItem.total)
    }

    let total = 0
    list.forEach(item => (total += item.total))

    this.setState({
      list: list,
      total,
      modalMenu: false
    })
  }

  handleInputAmountChange = (e, { name, value }) => {
    let { list } = this.state

    const { menu } = this.props
    const menuItem = menu.find(menu => menu.name === name)

    const index = list.findIndex(item => item.name === name)
    list[index].amount = value
    list[index].total = (value === '' ? 0 : parseInt(value)) * menuItem.price

    let total = 0
    list.forEach(item => (total += item.total))

    this.setState({
      list: list,
      total
    })
  }

  handleDismiss = () => {
    this.setState({
      error: {
        visible: false,
        message: ''
      }
    })
  }

  render() {
    const { list, total } = this.state
    const { menu } = this.props

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
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group>
                <Card.Group itemsPerRow={5}>
                  {menu.map(m => (
                    <MenuModal
                      key={m.name}
                      menu={m}
                      handleAdd={this.handleCardOnClick}
                    />
                  ))}
                </Card.Group>
              </Form.Group>
              <Form.Group>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {list.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell collapsing>
                          <Checkbox
                            checked={item.checked}
                            onChange={this.handleCheck}
                            slider
                            value={index}
                          />
                        </Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Amount"
                            name={item.name}
                            value={item.amount}
                            onChange={this.handleInputAmountChange}
                          />
                        </Table.Cell>
                        <Table.Cell>{item.total}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell colSpan="4">
                        <Button
                          onClick={this.handleSubmit}
                          floated="right"
                          icon
                          labelPosition="left"
                          primary
                          size="small"
                        >
                          <Icon name="add" /> Submit
                        </Button>
                        <Button
                          disabled={list.length === 0}
                          primary
                          size="small"
                          onClick={this.handleDeleteSelectedRows}
                        >
                          Delete Selected Rows
                        </Button>
                        <Button
                          disabled={list.length === 0}
                          negative
                          size="small"
                          onClick={this.handleDeleteAllRows}
                        >
                          Delete All
                        </Button>
                        {this.state.error.visible && (
                          <Message
                            negative
                            header="Could you check something!"
                            list={[this.state.error.message]}
                            onDismiss={this.handleDismiss}
                          />
                        )}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell>Total:</Table.HeaderCell>
                      <Table.HeaderCell />
                      <Table.HeaderCell>{total}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

class MenuModal extends React.Component {
  state = {
    amount: 0,
    modalOpen: false
  }

  open = () => {
    this.setState({
      modalOpen: true
    })
  }

  close = () => {
    this.setState({
      modalOpen: false
    })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleAdd = () => {
    const name = this.props.menu.name
    const amount = this.state.amount

    this.props.handleAdd(name, amount)
    this.setState({
      modalOpen: false
    })
  }

  render() {
    const { modalOpen } = this.state
    const { amount } = this.state

    const m = this.props.menu

    return (
      <Modal
        trigger={
          <Card onClick={this.open}>
            {m.image ? (
              <Image
                src={'images/' + m.image}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
                avatar
              />
            ) : (
              <Image
                src="images/default.jpg"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
                avatar
              />
            )}
            <Card.Content>
              <Card.Header>{m.name}</Card.Header>
              <Card.Meta>
                <Label tag size="tiny">
                  ${m.price}
                </Label>
              </Card.Meta>
            </Card.Content>
          </Card>
        }
        open={modalOpen}
        onClose={this.close}
        closeIcon
      >
        <Modal.Header>{m.name}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group inline>
                <Form.Field>
                  <label>Name</label>
                  <input disabled value={m.name} />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input disabled value={m.price} />
                </Form.Field>
                <Form.Field>
                  <label>Amount</label>
                  <input
                    type="number"
                    min="0"
                    name="amount"
                    value={amount}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field control={TextArea} disabled value={m.description} />
              <Button primary type="submit" onClick={this.handleAdd}>
                Add
              </Button>
              <Button positive type="submit" onClick={this.close}>
                Cancel
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AddReceiptModal
