import React, { Component } from 'react';

import { Divider } from 'semantic-ui-react'
import { Segment } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute } from './_components/PrivateRoute'
import MenuBar from './components/menu/MenuBar'
import LoginForm from './components/login/LoginForm.js'
import UsersPage from './components/users/UsersPage'
import MenuPage from './components/menu/MenuPage'
import StoragePage from './components/storage/StoragePage'
import ReceiptPage from './components/receipt/ReceiptPage'
import HomePage from './components/home/HomePage'

import { userService } from './_services/user.service'

class App extends Component {

  constructor(props) {

    super(props)

    this.state = {
      user: {}
    }
  }

  componentDidMount = () => {

    userService.currentUser.subscribe(user => this.setState({user}))
  }
  render() {
    return (
      <div>
        <Segment basic>
          <MenuBar fixed='top' inverted user={this.state.user}></MenuBar>
          <Divider horizontal> And </Divider>
          <Switch>
            <PrivateRoute exact path = '/' component = { HomePage } />
            <PrivateRoute exact roles={['admin']} path = '/users' component = { UsersPage } />
            <PrivateRoute exact roles={['admin', 'manager']} path = '/menu' component = { MenuPage } />
            <PrivateRoute exact roles={['admin', 'manager']} path = '/storage' component = { StoragePage } />
            <PrivateRoute exact roles={[]} path = '/receipt' component = { ReceiptPage } />
            <Route path='/login' component = { LoginForm }/>
            <Route component={ Page404 }/>
          </Switch>
        </Segment>
      </div>
    );
  }
}

const Page404 = ({location}) => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='x' circular />
      <Header.Content>THE PAGE YOU REQUESTED COULD NOT FOUND</Header.Content>
    </Header>
  </div>
)

export default App;
