import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Components/Home';
import StreetMap from './Components/StreetMap';
import PeopleList from './Components/PeopleList';

const RootNavigator = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Aiuto',
    }
  },
  StreetMap: {
    screen: StreetMap,
    navigationOptions: {
      headerTitle: 'Map'
    }
  },
  PeopleList: {
    screen: PeopleList,
    navigationOptions: {
      headerTitle: 'People'
    }
  }
});

export default RootNavigator;
