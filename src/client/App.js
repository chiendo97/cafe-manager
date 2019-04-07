import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom'
import { Button, Breadcrumb, Nav, Alert } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

import { PrivateRoute } from './_components/PrivateRoute.js'
import { LoginPage } from './components/LoginPage.js'
import { HomePage } from './components/HomePage.js'
import { UserManagerPage } from './components/UserManagerPage.js'
import { StoragePage } from './components/StoragePage.js'
import { MenuPage } from './components/MenuPage.js'
import { ReceiptPage } from './components/ReceiptPage.js'
import { UserInfoPage } from './components/UserInfoPage'
import { MenuInfoPage } from './components/MenuInfoPage'

export default class App extends Component {
  render() {
    return (
			<div>
				<Nav
					activeKey="/home"
				>
					<Nav.Item>
						<Nav.Link href="/">Home</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/usermanager">Users Manager</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/receipt">Receipt</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/menu">Menu</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/storage">Storage</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/login">Login/Logout</Nav.Link>
					</Nav.Item>
				</Nav>
				<Switch>
					<PrivateRoute exact path = '/' component = { HomePage } />
					<PrivateRoute exact path = '/usermanager' component = { UserManagerPage } />
          <PrivateRoute path="/user/:username" component={UserInfoPage} />
          <PrivateRoute path="/menu/:name" component={MenuInfoPage} />
          <PrivateRoute exact path = '/menu' component = { MenuPage } />
          <PrivateRoute exact path = '/storage' component = { StoragePage } />
					<PrivateRoute exact path = '/receipt' component = { ReceiptPage } />
					<Route path='/login' component = { LoginPage }/>
					<Route component = { Page404NotFound }/>
				</Switch>
			</div>
    );
  }
}

const Page404NotFound = ( {location} ) => {
	return (
		<div>
			<h3> No match for <code>{location.pathname}</code> </h3>
		</div>
	)
}
