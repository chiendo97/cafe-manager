import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom'

import { PrivateRoute } from './_components/PrivateRoute.js'

import { LoginPage } from './components/LoginPage.js'
import { HomePage } from './components/HomePage.js'
import { UserManagerPage } from './components/UserManagerPage.js'
import { StoragePage } from './components/StoragePage.js'

export default class App extends Component {
  render() {
    return (
			<div>
				<Switch>
					<PrivateRoute exact path = '/' component = { HomePage } />
					<PrivateRoute exact path = '/usermanager' component = { UserManagerPage } />
					<PrivateRoute exact path = '/storage' component = { StoragePage } />
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
