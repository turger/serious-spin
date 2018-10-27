import React, { Component } from 'react'
import Header from './Header'
import YearSlider from './YearSlider'
import WordCloud from './WordCloud'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedYear: 2018,
      selectedGroup: '00 General Terms'
    }
  }

  setSelectedYear = selectedYear => this.setState({selectedYear})
  setSelectedGroup = selectedGroup => this.setState({selectedGroup})

  render() {
    return(
      <div className="App">
        <Header/>
        <YearSlider
          setSelectedYear={this.setSelectedYear}
        />
        <WordCloud
          selectedYear={this.state.selectedYear}
        />
      </div>
    )
  }
}


export default App
