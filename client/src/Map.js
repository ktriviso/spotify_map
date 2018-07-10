import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

// this component was built using the following github tutorial
// https://github.com/zimrick/react-svg-maps-tutorial

export default class Map extends Component {
  constructor() {
    super()
    this.state = {
      worldData: [],
      userLocation: [
        {coordinates: [139.6917,35.6895]},
        {coordinates: [106.8650,-6.1751]},
        {coordinates: [77.1025,28.7041]},
        {coordinates: [120.9842,14.5995]},
        {coordinates: [126.9780,37.5665]},
        {coordinates: [121.4737,31.2304]},
        {coordinates: [67.0099,24.8615]},
        {coordinates: [116.4074,39.9042]},
        {coordinates: [-74.0059,40.7128]},
        {coordinates: [113.2644,23.1291]},
        {coordinates: [-46.6333,-23.5505]},
        {coordinates: [-99.1332,19.4326]},
        {coordinates: [72.8777,19.0760]},
        {coordinates: [135.5022,34.6937]},
        {coordinates: [37.6173,55.7558]},
        {coordinates: [90.4125,23.8103]},
        {coordinates: [31.2357,30.0444]},
        {coordinates: [-118.2437,34.0522]},
        {coordinates: [100.5018,13.7563]},
        {coordinates: [88.3639,22.5726]},
        {coordinates: [-58.3816,-34.6037]},
        {coordinates: [51.3890,35.6892]},
        {coordinates: [28.9784,41.0082]},
        {coordinates: [3.3792,6.5244]},
        {coordinates: [114.0579,22.5431]},
        {coordinates: [-43.1729,-22.9068]},
        {coordinates: [15.2663,-4.4419]},
        {coordinates: [117.3616,39.3434]},
        {coordinates: [2.3522,48.8566]},
        {coordinates: [-77.0428,-12.0464]}
      ],
    }
  }
  projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
  }
  componentDidMount() {
    fetch("/world.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worldData => {
          this.setState({
            worldData: feature(worldData, worldData.objects.countries).features,
          })
        })
      })
  }
  render() {
    return (
      <svg width={ '100vw' } height={ '100vh' } viewBox="0 0 800 450">
        <g className="countries">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                fill={ `rgba(38,50,56,${1 / this.state.worldData.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
              />
            ))
          }
        </g>
        <g className="markers">
          {
            this.state.userLocation.map((location, i) => (
              <circle
                key={ `marker-${i}` }
                cx={ this.projection()(location.coordinates)[0] }
                cy={ this.projection()(location.coordinates)[1] }
                r={ 5 }
                fill="#E91E63"
                stroke="#FFFFFF"
                className="marker"
                onClick={ () => this.handleMarkerClick(i) }
              />
            ))
          }
        </g>
      </svg>
    )
  }
}
