import React from 'react'
import { getFennicaGraphData } from '../services/firebase'
var LineChart = require("react-chartjs").Line

export default class Chart extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			data: []
		}

		this.fetchData = this.fetchData.bind(this)
		this.getData = this.getData.bind(this)
		this.getChartOptions = this.getChartOptions.bind(this)
	}

	componentDidMount() {
	    this.fetchData()
	}

	/*componentDidUpdate(prevProps) {
	    if(prevProps.selectedYear !== this.props.selectedYear || prevProps.selectedGroup !== this.props.selectedGroup) {
	      this.fetchData()
	    }
	}*/

	fetchData() {
	    getFennicaGraphData().then((wordData) => {
	    	var newData = Object.keys(wordData)
	    	.filter((year) => { return parseInt(year) >= 1980 })
	    	.map((year) => { return wordData[year][this.props.word] || 0 })
	        this.setState({ data: newData })
	    })
	}

	getData() {
		let labels = []
		for (let i=1980; i<=2018; i++) { 
			labels.push(i)
		}
		return {
			labels: labels,
			datasets: [
				{
					label: this.props.word,
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: this.state.data
				}
			]
		}
	}

	getChartOptions() {
		return {
			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines : true,

			//String - Colour of the grid lines
			scaleGridLineColor : "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth : 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - Whether the line is curved between points
			bezierCurve : true,

			//Number - Tension of the bezier curve between points
			bezierCurveTension : 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot : true,

			//Number - Radius of each point dot in pixels
			pointDotRadius : 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth : 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius : 20,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke : true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth : 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill : true,

			//Boolean - Whether to horizontally center the label and point dot inside the grid
			offsetGridLines : false
		}
	}

//var LineChart = require("react-chartjs").Line;
    render() {
    	return(
    		<LineChart 
    			data={this.getData()} 
    			options={this.getChartOptions()} 
    			width="1200" 
    			height="250" />
    	)
	}
}