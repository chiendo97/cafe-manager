import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import { PrivateRoute } from './_components/PrivateRoute.js'

import { LoginPage } from './components/LoginPage.js'
import { HomePage } from './components/HomePage.js'
import { UserManagerPage } from './components/UserManagerPage.js'
import { StoragePage } from './components/StoragePage.js'

export default class App extends Component {
  render() {
    return (
			<div>
				<PrivateRoute exact path = '/' component = { HomePage } />
				<PrivateRoute exact path = '/usermanager' component = { UserManagerPage } />
				<PrivateRoute exact path = '/storage' component = { StoragePage } />
				<Route path='/login' component = { LoginPage }/>
			</div>
    );
  }
}
