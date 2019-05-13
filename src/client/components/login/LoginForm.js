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
      password: '',
      error: {
        visible: false,
        message: ''
      }
    }
  }

  handleLogin = () => {
    const { username, password } = this.state

    if (username === '' || password === '') {
      this.setState({
        error: {
          visible: true,
          message: 'Invalid input'
        }
      })
      return
    }

    userService
      .login(username, password)
      .then(user => {
        const { from } = this.props.location.state || {
          from: { pathname: '/' }
        }
        this.props.history.push(from)
      })
      .catch(error => {
        this.setState({
          error: {
            visible: true,
            message: error
          }
        })
      })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleDismiss = () => {
    this.setState({
      error: {
        visible: false,
        message: ''
      }
    })
  }

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
                {this.state.error.visible && (
                  <Message
                    negative
                    header="Could you check something!"
                    list={[this.state.error.message]}
                    onDismiss={this.handleDismiss}
                  />
                )}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginForm
