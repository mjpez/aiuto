import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get("window");
const card_height = height / 4;
const card_width = card_height - 50;


export default class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 40.705056,
        longitude: -74.009339,
        latitudeDelta: 0.00422,
        longitudeDelta: 0.00221
      },
      markers: [
        {
          coordinate: {
            latitude: 40.707160,
            longitude: -74.009339
          },
          title: "Bill",
          description: "Needs glasses",
          image: {
            uri: "https://www.fillmurray.com/200/200"
          }
        },
        {
          coordinate: {
            latitude: 40.703040,
            longitude: -74.010339
          },
          title: "Blake",
          description: "Needs gloves",
          image: {
            uri: "https://www.gannett-cdn.com/-mm-/c407b54e5a1f39ba4a0a5ceb0fa44aaaa410c257/c=132-89-909-866&r=x203&c=200x200/local/-/media/2017/12/22/USATODAY/USATODAY/636495383734216208-USP-NFL-Houston-Texans-at-Jacksonville-Jaguars.jpg"
          }
        },
        {
          coordinate: {
            latitude: 40.708557,
            longitude: -74.009350
          },
          title: "Tin Man",
          description: "Needs a heart",
          image: {
            uri: "https://igx.4sqi.net/img/general/200x200/30059198_BqXn8hbIx7RLgrJJOkyYKEFaHgMxAQDNeCstfffsDks.jpg"
          }
        },
        {
          coordinate: {
            latitude: 40.705056,
            longitude: -74.007400
          },
          title: "Martin",
          description: "Needs a hat",
          image: {
            uri: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/8/000/1e3/3be/0f84aaf.jpg"
          }
        },
      ]
    };
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / card_width + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, i) => {
      const inputRange = [
        (i - 1) * card_width,
        i * card_width,
        ((i + 1) * card_width),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          <MapView.Marker coordinate={{
            latitude: 40.705056,
            longitude: -74.009339,
          }}>
          </MapView.Marker>

          {this.state.markers.map((marker, i) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[i].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[i].opacity,
            };
            return (
              <MapView.Marker key={i} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={card_width}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, i) => (
            <View key={i} style={styles.card}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - card_width,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2 },
    height: card_height,
    width: card_width,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(204,0,0,0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(204,0,0,0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(204,0,0,0.5)",
  },
});

