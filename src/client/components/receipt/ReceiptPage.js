import React from 'react'
import { Card } from 'semantic-ui-react'

import ReceiptCard from './ReceiptCard'
import AddReceiptModal from './AddReceiptModal'

import { menuService } from '../../_services/menu.service'
import { receiptService } from '../../_services/receipt.service'

class ReceiptPage extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      menu: [],
      receipt : []
    }
  }

  componentDidMount = () => {

    menuService.getMenu().then(menu => this.setState({menu}))
    receiptService.getReceipt().then(receipt => {
      console.log(receipt)
      this.setState({receipt})
    })
  }

  handleAddReceipt = (list) => {

    const { user } = this.state
    return receiptService.addReceipt(user.username, list).then(receipt => {
      receiptService.getReceipt().then(receipt => {
        this.setState({receipt})
      })
    })
  }

  render() {

    const { receipt } = this.state
    const { menu } = this.state

    return (
      <div>
        <Card.Group itemsPerRow={4}>
          {
            receipt.map(r => <ReceiptCard key={r._id} receipt={r} />)
          }
          <AddReceiptModal menu={menu} handleAddReceipt={this.handleAddReceipt}></AddReceiptModal>
        </Card.Group>
      </div>
    )
  }
}

export default ReceiptPage
