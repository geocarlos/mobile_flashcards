import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const DeckStack = createStackNavigator({
  Decks:{
    screen: DeckList,
    navigationOptions:{
      title: 'Mobile Flashcards'
    }
  },
  Deck:{
    screen: Deck,
    navigationOptions:({navigation})=>({
      title: `${navigation.state.params.pageTitle} Deck`
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions:{
      title: 'Quiz'
    }
  },
  NewQuestion:{
    screen: NewQuestion,
    navigationOptions:{
      title: 'Add Card'
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions:{
      title: 'New Deck'
    }
  }
})

export default class App extends React.PureComponent {

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <DeckStack />
      </Provider>
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
