import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { userService } from '../_services/user.service'

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {

  const currentUser = userService.currentUserValue()

  return (
    <Route {...rest} render={props => {
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      // check if route is restricted by role
      if (roles && roles.length > 0 && roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: '/401'}} />
      }

      // authorised so return component
      return <Component {...props} />
    }} />
  )

}
