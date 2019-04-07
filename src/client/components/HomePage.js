import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import { MiniMenu } from './MiniMenu'
import { MiniStorage } from './MiniStorage'
import { MiniReceipt } from './MiniReceipt'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Cafe manager
        </h1>
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row style={{ marginLeft: 0, marginRight: 0}}>
            <Col style={{ paddingLeft: 0, paddingRight: 0}}> <MiniMenu></MiniMenu> </Col>
            <Col style={{ paddingLeft: 0, paddingRight: 0}}> <MiniStorage></MiniStorage> </Col>
          </Row>
          <Row style={{ marginLeft: 0, marginRight: 0}}>
            <Col style={{ paddingLeft: 0, paddingRight: 0}}> <MiniReceipt></MiniReceipt> </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export { HomePage }
