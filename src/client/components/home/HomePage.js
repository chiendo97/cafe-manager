import React from 'react'

import { Grid, Card, Image } from 'semantic-ui-react'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Image src={'images/home.jpg'} centered bordered verticalAlign />
      </div>
    )
  }
}

export default HomePage
