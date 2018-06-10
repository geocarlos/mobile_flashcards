import React, {PureComponent} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem'
import { getDecks, getDeck } from '../actions';
import { connect } from 'react-redux';
import getMockDecks from '../mock_cards';

class DeckList extends PureComponent{

  componentDidMount(){
    this.props.dispatch(getDecks({
      deckList: getMockDecks()
    }));
  }

  _keyExtractor = (item, title) => item.title;

  _onPressItem = (id: string, pageTitle) => {
    this.props.navigation.navigate('Deck', pageTitle)
  };

  _renderItem = ({item}) => (
    <ListItem
      onPressItem={this._onPressItem}
      deck={item}
    />
  );

  render(){
    return (
      <View>
        <FlatList
          data={this.props.decks.deckList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    color: '#d83',
    fontSize: 35,
    marginLeft: 10
  }
})

function mapStateToProps({decks}){
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(DeckList);
