import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'

import { userService } from '../../_services/user.service'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    userService.logout()

    this.state = {
      username: '',
      password: ''
    }
  }

  handleLogin = () => {
    const { username, password } = this.state
    userService.login(username, password).then(user => {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      this.props.history.push(from)
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { username, password } = this.state

    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  value={username}
                  name="username"
                  onChange={this.handleChange}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  value={password}
                  name="password"
                  onChange={this.handleChange}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Button
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.handleLogin}
                >
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginForm
