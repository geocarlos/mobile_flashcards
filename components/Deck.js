import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Deck extends Component{
  render() {
    const {item} = this.props.navigation.state.params;
    const cards = item.questions.length;

    return (
        <View style={styles.container}>
          <Text style={styles.deckTitle}>
            {item.title}
          </Text>
          <Text style={styles.cardCount}>{cards} {`${cards == 1 ? 'card' : 'cards'}`}</Text>
        </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
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
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
  },
  cardCount:{
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
  }
}
