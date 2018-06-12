import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { setLocalNotification } from './utils/helpers';

const Tabs = createMaterialTopTabNavigator({
  Decks:{
    screen: DeckList,
    navigationOptions:{
      tabBarLabel: 'Decks'
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel: 'New Deck',
    }
  },
},{
  tabBarOptions: {
    labelStyle: {
      color: '#d83',
      fontSize: 20,
      paddingTop: 15
    },
    tabStyle: {
      height: 100,
    },
    style: {
      backgroundColor: '#eee',
    },
  }
}
)

const DeckStack = createStackNavigator({
  Tabs:{
    screen: Tabs,
    navigationOptions:{
      header: null
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
  }
})

export default class App extends React.PureComponent {

  componentDidMount(){
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <DeckStack />
      </Provider>
    );
  }
}
