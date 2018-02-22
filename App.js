/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './Components/Home';
import People from './Components/People';
import StreetMap from './Components/StreetMap';

const RootNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Aiuta',
    }
  },
  StreetMap: {
    screen: StreetMap,
    navigationOptions: {
      headerTitle: 'Map'
    }
  },
  People: {
    screen: People,
    navigationOptions: {
      headerTitle: 'People'
    }
  }
});

export default RootNavigator;
