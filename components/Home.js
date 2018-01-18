import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Mark People in Need</Text>
    <Button
      onPress={() => navigation.navigate('StreetMap')}
      title="Open Map"
    />
    <Text>{"\n"}</Text>
    <Text>Reach Out</Text>
    <Button
      onPress={() => navigation.navigate('PeopleList')}
      title="People"
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
