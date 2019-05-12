import React from 'react'
import { Card } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'

import ReceiptCard from './ReceiptCard'
import AddReceiptModal from './AddReceiptModal'

import { menuService } from '../../_services/menu.service'
import { receiptService } from '../../_services/receipt.service'

class ReceiptPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      menu: [],
      receipt: []
    }
  }

  componentDidMount = () => {
    menuService.getMenu().then(menu => this.setState({ menu }))
    receiptService.getReceipt().then(receipt => {
      this.setState({ receipt })
    })
  }

  handleAddReceipt = list => {
    const { user } = this.state
    return receiptService.addReceipt(user.username, list).then(receipt => {
      receiptService.getReceipt().then(receipt => {
        this.setState({ receipt })
      })
    })
  }

  render() {
    const { receipt } = this.state
    const { menu } = this.state

    const receiptGroupByYear = receipt.reduce((groupByYear, receipt) => {
      const year = new Date(receipt.created).getFullYear()
      groupByYear[year] = groupByYear[year]
        ? groupByYear[year] + receipt.total
        : receipt.total
      return groupByYear
    }, {})

    const receiptGroupByMonth = receipt.reduce((groupByMonth, receipt) => {
      const month = new Date(receipt.created).getMonth() + 1
      groupByMonth[month] = groupByMonth[month]
        ? groupByMonth[month] + receipt.total
        : receipt.total
      return groupByMonth
    }, {})

    return (
      <div>
        <Tab
          panes={[
            {
              menuItem: 'Day',
              render: () => (
                <Tab.Pane>
                  <Card.Group itemsPerRow={4}>
                    <AddReceiptModal
                      menu={menu}
                      handleAddReceipt={this.handleAddReceipt}
                    />
                    {receipt.map(r => (
                      <ReceiptCard key={r._id} receipt={r} />
                    ))}
                  </Card.Group>
                </Tab.Pane>
              )
            },
            {
              menuItem: 'Month',
              render: () => (
                <Tab.Pane>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Month</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {Object.keys(receiptGroupByMonth).map(key => {
                        return (
                          <Table.Row key={key}>
                            <Table.Cell>{key}</Table.Cell>
                            <Table.Cell>{receiptGroupByMonth[key]}</Table.Cell>
                          </Table.Row>
                        )
                      })}
                    </Table.Body>
                  </Table>
                </Tab.Pane>
              )
            },
            {
              menuItem: 'Year',
              render: () => (
                <Tab.Pane>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Year</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {Object.keys(receiptGroupByYear).map(key => {
                        return (
                          <Table.Row key={key}>
                            <Table.Cell>{key}</Table.Cell>
                            <Table.Cell>{receiptGroupByYear[key]}</Table.Cell>
                          </Table.Row>
                        )
                      })}
                    </Table.Body>
                  </Table>
                </Tab.Pane>
              )
            }
          ]}
        />
      </div>
    )
  }
}

export default ReceiptPage
