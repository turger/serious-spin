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
    getAllGroups().then(groupNames => {
      const groupOptions = groupNames.map(groupName => ({ value: groupName, label: groupName }))
      this.setState({groupOptions, loading: false})
    })
  }

  handleChange = (selectedGroup) => {
    this.setState({ selectedGroup })
    this.props.setSelectedGroup(selectedGroup)
  }

  render() {
    const { selectedGroup } = this.props
    const { groupOptions, loading } = this.state
    return (
      <div className='GroupSelector'>
        {loading && <div>lololoading</div> }
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