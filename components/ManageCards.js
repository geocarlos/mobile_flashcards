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
import { updateDeckCards as saveCardChanges } from '../actions/thunk_helpers';

class ManageCards extends PureComponent{

  state = {
    cards: [],
    editingCard: null,
    changes: 0 // This could be a boolean, but counting will force the FlatList to rerender.
  }            //  For now, this is all it is doing.

  componentDidMount(){
    this.setState({
      cards: this.props.deck.questions
    })

    // Persist changes
    this.props.navigation.addListener(
      'willBlur', ()=>{
        if(this.state.changes > 0){
          this.setState({changes: 0});
          this.saveChanges();
        }
      }
    )
  }

  _keyExtractor = (item, question) => item.question;

  _onPressItem = (id: string, pageTitle) => {
    this.props.navigation.navigate('Deck', pageTitle)
  };

  deleteCard(card){
    Alert.alert(
      'Delete card',
      'This card will be permanently deleted when you leave this page. Are you sure?',
      [
        {
          text: 'Yes', onPress: ()=>{
            this.setState({changes: this.state.changes + 1})
            this.setState((state)=>{
              state.cards.splice(state.cards.indexOf(card), 1);
              return state.cards;
            })
          }
        },
        {
          text: 'No, cancel', onPress: ()=> {}
        }
      ]
    )
  }

  editCard(card){
    this.setState({editingCard: card});
  }

  updateCards(index, card){
    this.setState({changes: this.state.changes + 1})
    this.setState((state)=>{
      state.cards.splice(index, 1, card);
      return state.cards
    })
  }

  /**
    The new state does not become available before the functio has fully run,
    that is why the changes are sent to storage in a separate function.*/

  saveChanges(){
    this.props.dispatch(saveCardChanges({
      title: this.props.deck.title,
      questions: this.state.cards
    }))
  }

  cancelEdit(){
    this.setState({editingCard: null});
  }

  /* Buttons for the alert dialog at the edit form */
  alertBtn = [
    {
      text: 'Ok', onPress: () => {
        // This will make editingCard null so the edit form will not be
        // rendered anymore
        this.props.cancelEdit();
      }
    }
  ]

  _renderItem = ({item}) => (
    <View style={styles.listItem}>
      <Text style={styles.cardText}>
        Question: {item.question}
      </Text>
      <Text style={styles.cardText}>
        Answer: {item.answer}
      </Text>
      <TouchableOpacity onPress={this.editCard.bind(this, item)}>
        <View style={styles.button}>
          <Text style={[styles.buttonText, {color: '#00838f'}]}>Edit This Card</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.deleteCard.bind(this, item)}>
        <View style={[styles.button, {backgroundColor: '#00838f'}]}>
          <Text style={[styles.buttonText, {color: '#fefefe'}]}>
            Delete This Card
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  render(){

    return (
      <View>
      {this.state.editingCard ?
        <View>
          <QuestionForm
            card={this.state.editingCard}
            cards={this.state.cards}
            saveChanges={(index, card)=> this.updateCards(index, card)}
            cardSuccess={()=>`Card successfully edited`}
            cancel={()=>this.cancelEdit()}
          />
        </View> :
        <FlatList
          data={this.state.cards}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00838f',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 15,
  },
  cardText:{
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  button:{
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00838f',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: 15
  },
  buttonText:{
    fontSize: 15,
    padding: 5,
    textAlign: 'center'
  },
  navBtns:{
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#00838f',
    borderRadius: 3,
    marginRight: 10,
    padding: 5
  },
  navBtnsTxt: {
    color: '#fefefe',
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
