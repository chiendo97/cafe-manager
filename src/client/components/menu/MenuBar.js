import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

class MenuBar extends Component {
  render() {
    const { user } = this.props

    return (
      <div>
        <Menu color="blue" fixed="top" inverted>
          <Container>
            <Menu.Item children={<Link to="/">Cafe-Manager</Link>} />
            {user && user.role === 'admin' && (
              <Menu.Item children={<Link to="/users">Users</Link>} />
            )}
            {user && (user.role === 'manager' || user.role === 'admin') && (
              <Menu.Item children={<Link to="/menu">Menu</Link>} />
            )}
            {user && (
              <Menu.Item children={<Link to="/receipt">Receipt</Link>} />
            )}
            {user && (user.role === 'manager' || user.role === 'admin') && (
              <Menu.Item children={<Link to="/storage">Storage</Link>} />
            )}
            {user ? (
              <Menu.Item as="a" position="right" href="/login">
                Hello {user.firstname}, Logout
              </Menu.Item>
            ) : (
              <Menu.Item as="a" position="right" href="/login">
                Login
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </div>
    )
  }
}

export default MenuBar
