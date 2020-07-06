import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper,Polyline } from 'google-maps-react';
 
export class MapContainer extends Component {
  render() {
    
    return (
      <Map google={this.props.google} zoom={14} initialCenter={this.props.actualLocal}>
  
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={this.props.actualLocal}
        />

        <Polyline
                  path={this.props.path}
                  strokeColor="#EA4335"
                  strokeOpacity={0.8}
                  strokeWeight={5} 
        />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('')
})(MapContainer)