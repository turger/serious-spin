import React from 'react'
import LineChart from 'react-svg-line-chart'
import { getFennicaGraphData } from '../services/firebase'
import './Chart.css'

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePoint: {x:null,y:null},
      data: null,
      loading: true
    }
  }

  componentDidMount() {
    if (this.props.selectedWord) this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selectedWord !== this.props.selectedWord && this.props.selectedWord) {
      this.setState({loading: true})
      this.fetchData()
    }
  }

  fetchData() {
    getFennicaGraphData().then((wordData) => {
      var data = Object.keys(wordData)
        .filter((year) => { return parseInt(year) >= 1980 })
        .map((year) => {
          return {x: parseInt(year), y: wordData[year][this.props.selectedWord] || 0 }
        })
      this.setState({ data, loading: false })
    })
  }

  render() {
    const {activePoint, data, loading} = this.state
    const {selectedWord} = this.props
    const link = `https://finna.fi/Search/Results?limit=0&type=AllFields&filter%5B%5D=~building%3A%221%2FNLF%2Farto%2F%22&lookfor0[]=${selectedWord}`
    return (
      this.props.selectedWord &&
        <div className='Chart'>
          <div className='Chart__header'>
            <div className='Chart__selectedWord'>{this.props.selectedWord}</div>
            <a className='Chart__button' href={link} target="_blank">Search Finna for articles</a>
          </div>
          {loading && <div className='spinner'/>}
          {!loading && data &&
            <LineChart
              data={data.map((point) => ({...point, active: point.x === activePoint.x ? true : false}))}
              viewBoxHeight={125}
              pathColor='#fff'
              labelsCountY={0}
              labelsFormatY={()=>{''}}
            />
          }
        </div>
    )
  }
}
