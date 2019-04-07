import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { menuService } from '../_services/menu.service.js'

const columns = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Price (.000 vnd)',
    accessor: 'price',
  },
  {
    Header: 'Description',
    accessor: 'desc'
  }
]

class MiniMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menu : [],
    }
  }

  componentDidMount() {
    menuService.getMenu()
      .then( menu => this.setState({ menu }) )
  }

  render() {
    const { menu } = this.state
    return (
      <div>
        <h3 style={{textAlign: "center"}}>Mini Menu</h3>
        <ReactTable
          data = {menu}
          columns = {columns}
          defaultPageSize={5}
        />
      </div>
    )
  }
}

export { MiniMenu }
