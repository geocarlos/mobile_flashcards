import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons';
import { deleteDeck } from '../actions/thunk_helpers';

class ManageDeck extends PureComponent{

  _deleteDeck(){
    Alert.alert(
      'Delete this deck',
      'Are you sure?', [
        {
          text: 'Yes', onPress: ()=>{
            this.props.navigation.navigate('Tabs');
            this.props.dispatch(deleteDeck(
              this.props.deck,
              this.props.decks
            ));
          }
      },
      {
        text: 'No', onPress: ()=>{}
      }
      ]
    )
  }

  render() {
    const {deck} = this.props;
    const cards = deck.questions.length;

    return (
        <View style={styles.container}>
          <View style={styles.buttons}>
            <Text style={{textAlign: 'center'}}>
              <MCI name='cards' size={70} color='#00838f' />
            </Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditDeck')}>
              <View style={styles.button}>
                <Text style={[styles.buttonText, {color: '#00838f'}]}>Edit Deck Title</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('ManageCards', {dName: deck.title})}>
              <View style={styles.button}>
                <Text style={[styles.buttonText, {color: '#00838f'}]}>Manage Deck Cards</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._deleteDeck.bind(this)}>
              <View style={styles.button}>
                <Text style={[styles.buttonText, {color: '#fefefe', backgroundColor: '#00838f'}]}>
                  Delete This Deck
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    padding: 20,
    paddingTop: 50
  },
  deckTitle:{
    fontSize: 35,
    textAlign: 'center',
    padding: 10,
  },
  cardCount:{
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    marginTop: 20
  },
  buttons:{
    marginTop: 30
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

function mapStateToProps({deck, decks}){
  return {
    deck,
    decks
  }
}

export default connect(mapStateToProps)(ManageDeck);
