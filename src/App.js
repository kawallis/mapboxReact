import React, { Component } from 'react';
import './App.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import ReactMapboxGl, { Layer, Feature, } from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
const accessToken = 'YOUR TOKEN'

const Map = ReactMapboxGl({
  accessToken: "accessToken"
});

class App extends Component {

  constructor() {
    super()
    this.state = {
      coordinates: []
    }

    this.drawControl = null
  }

  handleCreateDraw = async (e) => {
    let cords = e.features[0].geometry.coordinates.join(';')
    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + cords + '?geometries=geojson&steps=true&&access_token=' + accessToken;
    let res = await fetch(url)
    let response = await res.json()

    this.setState({
      coordinates: response.routes[0].geometry.coordinates
    })
  }

  addLayer() {
    console.log(this)
  }

  handleUpdateDraw = (e) => {
    console.log('update', e)

  }

  handleDeleteDraw = (e) => {
    console.log('delete', e)

  }

  render() {
    return (
      <div className="App">
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>
          <DrawControl
            ref={(drawControl) => { this.drawControl = drawControl; }}
            onDrawCreate={this.handleCreateDraw}
            onDrawUpdate={this.handleUpdateDraw}
            onDrawDelete={this.handleDeleteDraw}
          />
          <Layer
            type="line"
            id="power"
            layout={{ 
              "line-join": "round",
              "line-cap": "round" 
            }}
            paint={{
              "line-color": "#3b9ddd",
              "line-width": 8,
              "line-opacity": 0.8
            }}
            >
            <Feature coordinates={this.state.coordinates} />
          </Layer>
        </Map>
      </div>
    );
  }
}

export default App;
