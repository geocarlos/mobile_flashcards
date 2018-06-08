import React, {PureComponent} from 'react';
import {Text, View, FlatList} from 'react-native';
import ListItem from './ListItem'
import getMockDecks from '../mock_cards';
import Deck from './Deck';
import { createStackNavigator } from 'react-navigation';

class DeckList extends PureComponent{

  _keyExtractor = (item, title) => item.title;

  _onPressItem = (id: string, item) => {
    this.props.navigation.navigate('Deck', {item})
  };

  _renderItem = ({item}) => (
    <ListItem
      onPressItem={this._onPressItem}
      item={item}
    />
  );

  render(){
    return (
      <View>
        <Text style={styles.header}>DECKS</Text>
        <FlatList
          data={getMockDecks()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

styles = {
  header: {
    color: '#d83',
    fontSize: 35,
    marginLeft: 10
  }
}

export default createStackNavigator({
  Decks:{
    screen: DeckList,
    navigationOptions:{
      title: 'Mobile Cards'
    }
  },
  Deck:{
    screen: Deck
  }
});
