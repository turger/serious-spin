import React, { Component } from 'react'
import {getAllData} from './services/firebase'
import {mapCloudWords} from './utils/utils'
import Cloud from 'react-d3-cloud'

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

class WordCloud extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wordData: null
    }
  }

  componentDidMount() {
    getAllData().then(wordData =>
      this.setState({wordData})
    )
  }

  render() {
    if (!this.state.wordData) return null
    const data = mapCloudWords(this.state.wordData, [], 2017, 2018)
    return (
      <div className="WordCloud">
        <Cloud
          data={data}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          onWordClick={(word) => console.log('wordClick', word)}
        />
      </div>
    )
  }
}

export default WordCloud
