import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckList from './components/DeckList';
// import Deck from './components/Deck';
// import { createStackNavigator } from 'react-navigation';

// const Stack = StackNavigator = ({
//   DeckList:{
//     screen: DeckList
//   },
//   Deck: {
//     screen: Deck
//   }
// })

export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
        <DeckList />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 20
  },
});
