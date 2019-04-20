import React from 'react'

import { Card, Search, Icon, Divider } from 'semantic-ui-react'

import AddStorageModal from './AddStorageModal'
import StorageCard from './StorageCard'

import { storageService } from '../../_services/storage.service'

class StoragePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {},
      storage: [],
      search: '',
    }
  }

  componentDidMount = () => {
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })

    storageService.getStorage().then(storage => this.setState({ storage }))
  }

  handleAddStorage = (name, amount) => {

    return storageService.addItem(name, amount).then(storage => {

      storageService.getStorage().then(storage => this.setState({ storage }))
      return storage
    })
  }

  handleExport = (name, amount) => {

    return storageService.exportItem(name, amount).then(storage => {

      storageService.getStorage().then(storage => {
        this.setState({ storage })
      })
      return storage
    })
  }

  handleSearch = (e, { value }) => {

    this.setState({ search: value })
  }

  handleSearchBlur = () => {

    this.setState({ search: '' })
  }

  render() {

    const { storage } = this.state

    const re = new RegExp(_.escapeRegExp(this.state.search), 'i')
    const isMatch = result => re.test(result.name)
    const searchStorage = storage.filter(isMatch)

    return (
      <div>
        <Search
          input={{ icon: 'search', iconPosition: 'left' }}
          placeholder='Search storage'
          open={false}
          style={{ 'textAlign': 'center' }}
          value={this.state.search}
          onSearchChange={this.handleSearch}
          onBlur={this.handleSearchBlur}
        />
        <Divider horizontal>Storage</Divider>
        <Card.Group itemsPerRow={4}>
          {
            searchStorage.map(s => {
              return <StorageCard key={s.name} item={s} handleExport={this.handleExport} />
            })
          }
          <AddStorageModal handleAddStorage={this.handleAddStorage} />
        </Card.Group>
      </div>
    )
  }
}

export default StoragePage
