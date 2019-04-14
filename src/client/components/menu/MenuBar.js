import React, { Component } from 'react';

import { Container, Menu} from 'semantic-ui-react'

class MenuBar extends Component {
  constructor(props) {

    super(props)
    this.state = {
      user: JSON.parse(localStorage.getItem('user'))
    }
  }
  render() {

    const { user } = this.state

    return (
      <div>
        <Menu color='black'  fixed='top' inverted>
          <Container>
            <Menu.Item as='a' href="/" header>
              Cafe-Manager
            </Menu.Item>
            { user && user.role === 'admin' && <Menu.Item as='a' href="/users">Users</Menu.Item>}
            <Menu.Item as='a' href="/menu">Menu</Menu.Item>
            <Menu.Item as='a' href="/receipt">Receipt</Menu.Item>
            { user && ( user.role === 'manager' || user.role === 'admin' ) && <Menu.Item as='a' href="/storage">Storage</Menu.Item>}
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
