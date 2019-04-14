import React, { Component } from 'react';

import { Container, Divider } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute } from './_components/PrivateRoute'
import MenuBar from './components/menu/MenuBar'
import LoginForm from './components/login/LoginForm.js'
import UsersPage from './components/users/UsersPage'
import MenuPage from './components/menu/MenuPage'
import StoragePage from './components/storage/StoragePage'
import ReceiptPage from './components/receipt/ReceiptPage'
import HomePage from './components/home/HomePage'

class App extends Component {

  constructor(props) {

    super(props)

    this.state = {
      user: {}
    }
  }

  componentDidMount = () => {

    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })

    this.setState({
      user: {
        role: 'admin'
      }
    })
  }
  render() {
    return (
      <div>
        <MenuBar fixed='top' inverted></MenuBar>
        <Divider/>
        <Container style={{ marginTop: '3em' }}>
          <PrivateRoute exact path = '/' component = { HomePage } />
          <PrivateRoute exact path = '/users' component = { UsersPage } />
          <PrivateRoute exact path = '/menu' component = { MenuPage } />
          <PrivateRoute exact path = '/storage' component = { StoragePage } />
          <PrivateRoute exact path = '/receipt' component = { ReceiptPage } />
          <Route path='/login' component = { LoginForm }/>
        </Container>
      </div>
    );
  }
}

export default App;
