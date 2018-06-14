import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons';
import { updateDeckCards } from '../actions/thunk_helpers';
import QuestionForm from './QuestionForm';

class ManageCards extends PureComponent{

  state = {
    cards: [],
    editingCard: null
  }

  componentDidMount(){
    this.setState({
      cards: this.props.deck.questions
    })
  }

  _keyExtractor = (item, question) => item.question;

  _onPressItem = (id: string, pageTitle) => {
    this.props.navigation.navigate('Deck', pageTitle)
  };

  deleteCard(){
    alert('Delete card');
  }

  editCard(card){
    this.setState({editingCard: card});
  }

  _renderItem = ({item}) => (
    <View style={styles.container}>
    {this.state.editingCard ?
      <QuestionForm
        card={this.state.editingCard}
      /> :
    <View>
      <Text style={styles.cardCount}>
        Question: {item.question}
      </Text>
      <Text style={styles.cardCount}>
        Answer: {item.answer}
      </Text>
      <TouchableOpacity onPress={this.editCard.bind(this, item)}>
        <View style={styles.button}>
          <Text style={[styles.buttonText, {color: '#00838f'}]}>Edit This Cards</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.deleteCard.bind(this)}>
        <View style={styles.button}>
          <Text style={[styles.buttonText, {color: '#fefefe', backgroundColor: '#00838f'}]}>
            Delete This Card
          </Text>
        </View>
      </TouchableOpacity>
      </View>}
    </View>
  );

  render(){

    return (
      <View>
        <FlatList
          data={Object.values(this.state.cards)}
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
  },
  listItem: {
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
    padding: 15,
    justifyContent: 'space-evenly'
  },
  cardCount:{
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  button:{
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00838f',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  },
  buttonText:{
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  }
})

function mapStateToProps({deck}){
  return {
    deck
  }
}

export default connect(
  mapStateToProps
)(ManageCards);
