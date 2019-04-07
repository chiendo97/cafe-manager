import React from 'react'

import { receiptService } from '../_services/receipt.service.js'

class MiniReceipt extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      receipt : [],
    }
  }

  componentDidMount() {

    receiptService.getReceipt()
      .then(receipt => this.setState({ receipt }) )

  }

  render() {
    const { receipt } = this.state

    return (
      <div>
        <h3 style={{textAlign: "center"}}>Mini Receipt</h3>
        {
          receipt.slice(0, 5).map(r => {
            const { user } = r
            return (
              <div style={{textAlign: "center"}} key={r._id}>
                {user && 
                  <div>
                    User: {user.firstname} {user.lastname}
                  </div>
                }
                <ul>
                  {r.list.map(i => {
                    return (
                      <li key={i._id}>
                        {i.item} : {i.amount} : {i.total}
                      </li>
                    )
                  })}
                  <li>
                    Data: {r.created}
                  </li>
                  <li>
                    Total: {r.total}
                  </li>
                </ul>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export { MiniReceipt }
