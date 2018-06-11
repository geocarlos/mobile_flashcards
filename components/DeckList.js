import React, {PureComponent} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem'
import { getDecks, getDeck } from '../actions';
import { connect } from 'react-redux';
import getMockDecks from '../mock_cards';

class DeckList extends PureComponent{

  state = {
    isFocused: false
  }

  componentDidMount(){
    this.props.dispatch(getDecks({
      deckList: getMockDecks()
    }));

    /**
      FlatList rerenders if a new deck is added to the DeckList, but it just
      doesn't care about new questions. After a lot of research and thinking,
      I realized that if I have a state property passed to the ListItem and
      pass the state of this component to extraData, it will rerender whenever
      that property is changed, even if I am doing nothing with this property.
      Ok, this is not a solution I could be proud of, but hey, this is my
      first React Native app!
    */
    this.props.navigation.addListener(
      'willFocus', ()=>{
        this.setState({isFocused: true});
      }
    )

    this.props.navigation.addListener(
      'didBlur', ()=>{
        this.setState({isFocused: false});
      }
    )
  }

  _keyExtractor = (item, title) => item.title;

  _onPressItem = (id: string, pageTitle) => {
    this.props.navigation.navigate('Deck', pageTitle)
  };

  _renderItem = ({item}) => (
    <ListItem
      onPressItem={this._onPressItem}
      deck={item}
      cards={item.questions.length}
      isFocused={this.state.isFocused}
    />
  );

  render(){

    return (
      <View>
        <FlatList
          data={this.props.decks.deckList}
          extraData={this.state}
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
