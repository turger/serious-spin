import React, { Component } from 'react'
import {getFennicaGroupedData ,getFennicaAllData} from './services/firebase'
import {mapCloudWordsPerYear} from './utils/utils'
import Cloud from 'react-d3-cloud'
import './WordCloud.css'

const fontSizeMapper = word => Math.log2(word.value) * 5
const rotate = word => word.value % 45

class WordCloud extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wordData: null,
      width: 500,
      height: 500
    }
  }

  componentDidMount() {
    const selectedYear = this.props.selectedYear || '2018'
    const selectedGroup = this.props.selectedGroup || '00 General Terms'
    if (selectedGroup === 'allGroups') {
      getFennicaAllData(selectedYear).then(wordData =>
        this.setState({wordData})
      )
    } else {
      getFennicaGroupedData(selectedGroup, selectedYear).then(wordData =>
        this.setState({wordData})
      )
    }
    window.addEventListener("resize", this.updateDimensions)
    this.updateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = () => {
    this.setState({width: window.innerWidth})
  }

  render() {
    if (!this.state.wordData) return null
    const data = mapCloudWordsPerYear(this.state.wordData)
    return (
      <div className="WordCloud">
        <Cloud
          data={data}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          onWordClick={(word) => console.log('wordClick', word)}
          padding={10}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    )
  }
}

export default WordCloud
