import React, { Component } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './YearSlider.css'

class YearSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedYear: 1999,
      minYear: 1998,
      maxYear: 2018
    }
  }

  onSliderChange = (selectedYear) => {
    this.setState({selectedYear})
    this.props.setSelectedYear(selectedYear)
  }

  getMarks = () => {
    const {minYear, maxYear, selectedYear} = this.state
    const marks = {}
    for (let i = minYear; i <= maxYear; i++) {
      if([minYear, maxYear, selectedYear].includes(i)) {
        marks[i] = i
      } else {
        marks[i] = ''
      }
    }
    return marks
  }

  render() {
  const {selectedYear} = this.state
    console.log(selectedYear)
    return (
      <div className='YearSlider'>
        <Slider
          min={1999}
          max={2018}
          defaultValue={2018}
          trackStyle={{ backgroundColor: 'white' }}
          activeDotStyle={{ borderColor: 'white' }}
          marks={this.getMarks()}
          onChange={this.onSliderChange}
        />
      </div>
    )
  }
}

export default YearSlider