import React, { Component } from 'react'
import Select from 'react-select'
import './GroupSelector.css'
import { getAllGroups } from './services/firebase'

class GroupSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupOptions: [],
      loading: true
    }
  }

  componentDidMount() {
    const localStorageOptions = localStorage.getItem('wordCloud-groupOptions')
    if (localStorageOptions) {
      const groupOptions = JSON.parse(localStorageOptions)
      this.setState({groupOptions, loading: false})
    } else {
      getAllGroups().then(groupNames => {
        const groupOptions = groupNames.map(groupName => ({ value: groupName, label: groupName }))
        this.setState({groupOptions, loading: false})
        localStorage.setItem('wordCloud-groupOptions', JSON.stringify(groupOptions))
      })
    }
  }

  handleChange = (selectedGroup) => {
    this.props.setSelectedGroup(selectedGroup.label)
  }

  render() {
    const { groupOptions, loading } = this.state
    const selectedGroup = { value: this.props.selectedGroup, label: this.props.selectedGroup }
    return (
      <div className='GroupSelector'>
        {loading && <div className='loader'/> }
        {!loading &&
          <Select
            value={selectedGroup}
            onChange={this.handleChange}
            options={groupOptions}
          />
        }
      </div>
    )
  }
}

export default GroupSelector