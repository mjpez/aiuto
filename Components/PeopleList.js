import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PeopleList = () => (
  <View style={styles.container}>
    <Text>List of Needy</Text>
    <Text>Person #1</Text>
    <Text>Person #2</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PeopleList;
