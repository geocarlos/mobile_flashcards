import React, {PureComponent} from 'react';
import {Text, View, FlatList} from 'react-native';
import ListItem from './ListItem'
import getMockDecks from '../mock_cards';

class DeckList extends PureComponent{

  _keyExtractor = (item, title) => item.title;

  _onPressItem = (id: string) => {

  };

  _renderItem = ({item}) => (
    <ListItem
      id={item.title}
      onPressItem={this._onPressItem}
      title={item.title}
      cards={item.questions.length}
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

export default DeckList;
