import React from 'react'

import { Card } from 'semantic-ui-react'

import AddStorageModal from './AddStorageModal'
import StorageCard from './StorageCard'

import { storageService } from '../../_services/storage.service'

class StoragePage extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      user: {},
      storage : []
    }
  }

  componentDidMount = () => {
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })

    storageService.getStorage().then(storage => this.setState({storage}))
  }

  handleAddStorage = (name, amount) => {

    return storageService.addItem(name, amount).then(storage => {

      storageService.getStorage().then(storage => this.setState({storage}))
      return storage
    })
  }

  handleExport = (name, amount) => {

    return storageService.exportItem(name, amount).then(storage => {

      storageService.getStorage().then(storage => {
        this.setState({storage})
      })
      return storage
    })
  }

  render() {

    const { storage } = this.state

    return (
      <div>
        <Card.Group itemsPerRow={4}>
          {
            storage.map(s => {
              return <StorageCard key={s.name} item={s} handleExport={this.handleExport}/>
            })
          }
          <AddStorageModal handleAddStorage={this.handleAddStorage}/>
        </Card.Group>
      </div>
    )
  }
}

export default StoragePage
