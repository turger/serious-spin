import React, { Component } from 'react'
import { getFennicaGroupedData } from './services/firebase'
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
    this.updateDimensions()
    this.fetchData()
    window.addEventListener("resize", this.updateDimensions)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selectedYear !== this.props.selectedYear || prevProps.selectedGroup !== this.props.selectedGroup) {
      this.fetchData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  fetchData = () => {
    const selectedYear = this.props.selectedYear || '2018'
    const selectedGroup = this.props.selectedGroup || '00 General Terms'
    getFennicaGroupedData(selectedGroup, selectedYear).then(wordData => {
      this.setState({wordData})
    })

  }

  updateDimensions = () => {
    this.setState({width: window.innerWidth-20})
  }

  onWordClick = word => {
    const link = `https://finna.fi/Search/Results?limit=0&type=AllFields&filter%5B%5D=~building%3A%221%2FNLF%2Farto%2F%22&lookfor0[]=${word.text}`
    window.open(link, '_blank')
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
          onWordClick={this.onWordClick}
          padding={10}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    )
  }
}

export default WordCloud
