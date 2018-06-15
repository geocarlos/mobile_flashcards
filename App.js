import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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
import ManageDeck from './components/ManageDeck';
import EditDeck from './components/EditDeck';
import ManageCards from './components/ManageCards';
import Initial from './components/Initial'

const Tabs = createMaterialTopTabNavigator({
  Decks:{
    screen: DeckList,
    navigationOptions:{
      tabBarLabel: <Text style={{color: '#fefefe', fontSize: 25}}><Foundation name='list' size={25} /> Decks</Text>
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel: <Text style={{color: '#fefefe', fontSize: 25}}>New Deck <Entypo name='add-to-list' size={25} /></Text>
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
  Initial:{
    screen: Initial,
    navigationOptions:{
      header: null
    }
  },
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
      headerTintColor: '#fefefe',
      headerRight: (
        <View style={styles.navBtns}>
          <TouchableOpacity onPress={()=>navigation.navigate('ManageDeck', {dName: navigation.state.params.pageTitle})}>
            <Text style={styles.navBtnsTxt}>Manage</Text>
          </TouchableOpacity>
        </View>)
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
  },
  ManageDeck:{
    screen: ManageDeck,
    navigationOptions:({navigation})=>({
      title: `Manage ${navigation.state.params.dName}`,
      headerStyle: {
        backgroundColor: '#00838f'
      },
      headerTitleStyle: {
        color: '#fefefe'
      },
      headerTintColor: '#fefefe'
    })
  },
  EditDeck:{
    screen: EditDeck,
    navigationOptions:{
      title: 'Edit Deck',
      headerStyle: {
        backgroundColor: '#00838f'
      },
      headerTitleStyle: {
        color: '#fefefe'
      },
      headerTintColor: '#fefefe'
    }
  },
  ManageCards:{
    screen: ManageCards,
    navigationOptions: ({navigation})=>({
      title: `Manage ${navigation.state.params.dName} Cards`,
      headerStyle: {
        backgroundColor: '#00838f'
      },
      headerTitleStyle: {
        color: '#fefefe'
      },
      headerTintColor: '#fefefe',
    })
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

const styles = StyleSheet.create({
  navBtns:{
    borderWidth: 1,
    borderColor: '#fefefe',
    borderRadius: 3,
    marginRight: 10,
    padding: 5
  },
  navBtnsTxt: {
    color: '#fefefe',
  }
})
