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
import { FontAwesome, Foundation, Entypo } from '@expo/vector-icons';

const Tabs = createMaterialTopTabNavigator({
  Decks:{
    screen: DeckList,
    navigationOptions:{
      tabBarLabel: ()=> <Text style={{color: '#fefefe', fontSize: 25}}><Foundation name='list' size={25} /> Decks</Text>
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel: ()=> <Text style={{color: '#fefefe', fontSize: 25}}>New Deck <Entypo name='add-to-list' size={25} /></Text>
    }
  },
},{
  tabBarOptions: {
    labelStyle: {
      paddingTop: 5
    },
    tabStyle: {
      height: 60,
      paddingBottom: 1
    },
    style: {
      backgroundColor: '#00838f',
    },
    indicatorStyle:{
      backgroundColor: '#56c8d8'
    }
  }
}
)

const DeckStack = createStackNavigator({
  Tabs:{
    screen: Tabs,
    navigationOptions:{
      headerStyle: {
        backgroundColor: '#005662',
        height: 5
      }
    }
  },
  Deck:{
    screen: Deck,
    navigationOptions:({navigation})=>({
      title: `${navigation.state.params.pageTitle} Deck`,
      headerStyle: {
        backgroundColor: '#00838f',
      },
      headerTitleStyle: {
        color: '#fefefe'
      },
      headerTintColor: '#fefefe'
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions:{
      title: 'Quiz',
      headerStyle: {
        backgroundColor: '#00838f'
      },
      headerTitleStyle: {
        color: '#fefefe'
      },
      headerTintColor: '#fefefe'
    }
  },
  NewQuestion:{
    screen: NewQuestion,
    navigationOptions:{
      title: 'Add Card',
      headerStyle: {
        backgroundColor: '#00838f'
      },
      headerTitleStyle: {
        color: '#fefefe'
      },
      headerTintColor: '#fefefe'
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
