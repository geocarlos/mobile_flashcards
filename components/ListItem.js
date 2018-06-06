import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class ListItem extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const {cards} = this.props;

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.container}>
          <Text style={styles.deckTitle}>
            {this.props.title}
          </Text>
          <Text style={styles.cardCount}>{cards} {`${cards == 1 ? 'card' : 'cards'}`}</Text>
        </View>
      </TouchableOpacity>
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

export default ListItem;
