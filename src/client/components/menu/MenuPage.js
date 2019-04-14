import React from 'react'

import { Card } from 'semantic-ui-react'

import MenuCard from './MenuCard'
import AddMenuModal from './AddMenuModal'

import { menuService } from '../../_services/menu.service'

class MenuPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {},
      menu : []
    }

  }

  componentDidMount() {

    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })

    menuService.getMenu().then(menu => this.setState({menu}))
  }

  handleAddMenu = (name, price, description) => {

    return menuService.addMenu(name, price, description).then(menu => {
      menuService.getMenu().then(menu => this.setState({menu}))
    })
  }

  handleUpdate = (name, price, description) => {

    return menuService.updateMenu(name, price, description).then(menu => {
      menuService.getMenu().then(menu => this.setState({menu}))
    })
  }

  handleDelete = (name) => {

    return menuService.deleteMenu(name).then(menu => {
      menuService.getMenu().then(menu => this.setState({menu}))
    })
  }

  render() {

    const { menu, user } = this.state

    return (
      <div>
        <Card.Group itemsPerRow={4}>
          {
            menu.map(m => <MenuCard key={m.name} menu={m} user={user} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} />)
          }
          <AddMenuModal handleAddMenu={this.handleAddMenu}/>
        </Card.Group>
      </div>
    )
  }
}

export default MenuPage
