import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Mark People in Need</Text>
    <Button
      onPress={() => navigation.navigate('StreetMap')}
      title="Place Pin"
    />
    <Text>{"\n"}</Text>
    <Text>Reach Out</Text>
    <Button
      onPress={() => navigation.navigate('People')}
      title="Locate People"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;
