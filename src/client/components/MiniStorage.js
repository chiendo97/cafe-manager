import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { storageService } from '../_services/storage.service.js'

const columns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Amount (kg)',
    accessor: 'amount'
  },
]

class MiniStorage extends React.Component {

  constructor(props) {
    super(props)

    this.state =  {
      items: []
    }
  }

  componentDidMount() {

    storageService.getStorage()
      .then( items => this.setState({ items }) )
  }

  render() {
    const { items } = this.state

    return (
      <div>
        <h3 style={{textAlign: "center"}}> Mini Storage </h3>
        <ReactTable
          data = {items}
          columns = {columns}
          defaultPageSize={5}
        />
      </div>
    )
  }
}

export { MiniStorage }
