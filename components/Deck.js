import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons';

class Deck extends PureComponent{

  addCard(){
    this.props.navigation.navigate('NewQuestion')
  }

  startQuiz(){
    if(this.props.deck.questions.length > 0){
      this.props.navigation.navigate('Quiz');
    } else {
      Alert.alert(
        "Deck empty!",
        "Click on Add Card to add cards to this deck."
      )
    }
  }

  render() {
    const {deck} = this.props;
    const cards = deck.questions.length;

    return (
        <View style={styles.container}>
          <Text style={{textAlign: 'center'}}>
            <MCI name='cards' size={100} color='#00838f' />
          </Text>
          <Text style={styles.deckTitle}>
            {deck.title}
          </Text>
          <Text style={styles.cardCount}>{cards} {`${cards == 1 ? 'card' : 'cards'}`}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.addCard.bind(this)}>
              <View style={styles.button}>
                <Text style={[styles.buttonText, {color: '#00838f'}]}>Add Card</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.startQuiz.bind(this)}>
              <View style={styles.button}>
                <Text style={[styles.buttonText, {color: '#fefefe', backgroundColor: '#00838f'}]}>
                  Start Quiz
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
    padding: 15,
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

function mapStateToProps({deck}){
  return {
    deck
  }
}

export default connect(mapStateToProps)(Deck);
