import React from 'react'
import LineChart from 'react-svg-line-chart'
import { getFennicaGraphData } from '../services/firebase'
import './Chart.css'

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePoint: {x:null,y:null},
      data: null
    }
  }

  componentDidMount() {
    if (this.props.selectedWord) this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selectedWord !== this.props.selectedWord && this.props.selectedWord) {
      this.fetchData()
    }
  }

  fetchData() {
    getFennicaGraphData().then((wordData) => {
      var newData = Object.keys(wordData)
        .filter((year) => { return parseInt(year) >= 1980 })
        .map((year) => {
          return {x: parseInt(year), y: wordData[year][this.props.selectedWord] || 0 }
        })
      this.setState({ data: newData })
    })
  }

  render() {
    const {activePoint, data} = this.state
    if (!data) return null
    return (
      this.props.selectedWord &&
        <div className='Chart'>
          <div className='Chart__selectedWord'>Selected word: {this.props.selectedWord}</div>
          <LineChart
          data={data.map((point) => ({...point, active: point.x === activePoint.x ? true : false}))}
          viewBoxHeight={125}
          pathColor='#fff'
          />
        </div>
    )
  }
}
