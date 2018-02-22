import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class StreetMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 40.705056,
      longitude: -74.009339,
      error: null,
      markers: []
    };
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(event) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: event.nativeEvent.coordinate
        }
      ]
    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
    },
      (error) => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )
  }

  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.705056,
          longitude: -74.009339,
          latitudeDelta: 0.00422,
          longitudeDelta: 0.00221,
        }}
        onPress={this.handlePress}
      >
      {this.state.markers.map((marker, i) => {
          return <Marker key={i}{...marker} />
      })}
      </MapView>
    )
  }

}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
