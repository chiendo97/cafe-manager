import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

class MenuBar extends Component {

  render() {

    const { user } = this.props

    return (
      <div>
        <Menu color='black' fixed='top' inverted>
          <Container>
            <Menu.Item children={<Link to='/'>Cafe-Manager</Link>} />
            {user && user.role === 'admin' &&
              <Menu.Item children={<Link to='/users'>Users</Link>} />}
            {user &&
              <Menu.Item children={<Link to='/menu'>Menu</Link>}></Menu.Item>}
            {user &&
              <Menu.Item children={<Link to='/receipt'>Receipt</Link>}></Menu.Item>}
            {user && (user.role === 'manager' || user.role === 'admin') &&
              <Menu.Item children={<Link to='/storage'>Storage</Link>}></Menu.Item>}
            {
              user ?
                <Menu.Item as='a' position="right" href="/login">Hello {user.firstname}, Logout</Menu.Item>
                :
                <Menu.Item as='a' position="right" href="/login">Login</Menu.Item>
            }
          </Container>
        </Menu>
      </div>
    );
  }
}

export default MenuBar;
