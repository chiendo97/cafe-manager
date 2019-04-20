import React from 'react'
import _ from 'lodash'

import { Card } from 'semantic-ui-react'
import { Search } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'

import MenuCard from './MenuCard'
import AddMenuModal from './AddMenuModal'

import { menuService } from '../../_services/menu.service'
import { userService } from '../../_services/user.service'

class MenuPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {},
      search: '',
      menu: [],
      searchMenu: [],
    }

  }

  componentDidMount() {

    userService.currentUser.subscribe(user => this.setState({ user }))

    //menuService.getMenu().then(menu => this.setState({ menu }))
    menuService.getMenu().then(menu => this.setState({ menu, searchMenu: menu }))
  }

  handleAddMenu = (name, price, description, image) => {

    return menuService.addMenu(name, price, description, image).then(menu => {
      //menuService.getMenu().then(menu => this.setState({ menu }))
      menuService.getMenu().then(menu => this.setState({ menu, searchMenu: menu }))
    })
  }

  handleUpdate = (name, price, description) => {

    return menuService.updateMenu(name, price, description).then(menu => {
      //menuService.getMenu().then(menu => this.setState({ menu }))
      menuService.getMenu().then(menu => this.setState({ menu, searchMenu: menu }))
    })
  }

  handleDelete = (name) => {

    return menuService.deleteMenu(name).then(menu => {
      //menuService.getMenu().then(menu => this.setState({ menu }))
      menuService.getMenu().then(menu => this.setState({ menu, searchMenu: menu }))
    })
  }

  handleSearch = (e, { value }) => {

    this.setState({ search: value })
  }

  handleSearchBlur = () => {

    this.setState({ search: '' })
  }

  handleImage = (url) => {

  }

  render() {

    const { menu, user } = this.state

    const re = new RegExp(_.escapeRegExp(this.state.search), 'i')
    const isMatch = result => re.test(result.name)
    const searchMenu = menu.filter(isMatch)

    console.log(searchMenu)

    return (
      <div>
        <Search
          input={{ icon: 'search', iconPosition: 'left' }}
          placeholder='Search menu'
          open={false}
          style={{ 'textAlign': 'center' }}
          value={this.state.search}
          onSearchChange={this.handleSearch}
          onBlur={this.handleSearchBlur}
        />
        <Divider horizontal>Menu</Divider>
        <Card.Group itemsPerRow={6}>
          {
            searchMenu.map(m => <MenuCard key={m.name} menu={m} user={user} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} />)
          }
          {user && user.role === 'admin' &&
            <AddMenuModal handleAddMenu={this.handleAddMenu} />
          }
        </Card.Group>
      </div>
    )
  }
}

export default MenuPage
