import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StreetMap = () => (
  <View style={styles.container}>
    <Text>This is my Map Component!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#AAA',
    justifyContent: 'center'
  }
})

export default StreetMap;
