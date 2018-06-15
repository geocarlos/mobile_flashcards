import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {getDeck} from '../actions';
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons';

class ListItem extends PureComponent {

  _onPress = () => {
    this.props.dispatch(getDeck(this.props.deck))
    this.props.onPressItem(this.props.deck.title, {pageTitle: this.props.deck.title});
  };

  render() {
    const {deck, cards} = this.props;

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.container}>
          <Text style={styles.deckTitle}>
            {deck.title}
          </Text>
          <Text style={styles.cardCount}>
            <MCI name='cards' size={20} color='#00838f' /> {cards} {`${cards == 1 ? 'card' : 'cards'}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00838f',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 15
  },
  deckTitle:{
    fontFamily: 'serif',
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  cardCount:{
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  }
})

function mapStateToProps({deck}){
  return {
    deck
  }
}

export default connect()(ListItem);
