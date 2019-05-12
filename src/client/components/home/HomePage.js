import React from 'react'

import { Grid, Card, Image } from 'semantic-ui-react'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Image
          src={'images/home.jpg'}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          avatar
        />
      </div>
    )
  }
}

export default HomePage
