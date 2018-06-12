import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import {addCard, getDeck} from '../actions';
import { addCardToDeck } from '../actions/thunk_helpers';

class NewQuestion extends Component{

  state = {
    question: '',
    answer: '',
    viewHeight: '100%'
  }

  /**
    All of the keyboard-related code is necessary because KeyboardAvoidingView
    is currently not working with Android. If this app was to be developed
    for iOS, all of this might be replaced with the KeyboardAvoidingView component.*/

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e){
    this.setState({
      viewHeight: Dimensions.get('window').height - e.endCoordinates.height
    })
  }

  _keyboardDidHide(e){
    this.setState({
      viewHeight: '100%'
    })
  }

  onSubmit(){
    const question = this.state.question;
    const answer = this.state.answer;
    if(question === "" || answer == ""){
      Alert.alert("","You must provide a question and an answer!");
      return;
    }
    const {deck} = this.props;

    this.props.dispatch(addCardToDeck({
      ...deck,
      questions: deck.questions.concat({
        question: question,
        answer: answer
      })
    }))
    this.setState({question: ""})
    this.setState({answer: ""})
    Alert.alert(
      `Card successfully added to ${deck.title}!`,
      'Would you like to go to Quiz or add more cards?',
      [
        {text: 'Quiz', onPress: () => {
          this.props.navigation.navigate('Deck', {pageTitle: deck.title});
        }},
        {text: 'Add more cards', onPress: () => {}},
      ],
      { cancelable: false }
    )
  }

  render(){
    const justify = this.state.viewHeight === '100%' ? 'space-evenly':'flex-start';
    return (
      <View style={[styles.container, {justifyContent: justify, height: this.state.viewHeight}]}>
        <TextInput
          ref={el => {this.question = el;}}
          onChangeText={question => this.setState({question})}
          onSubmitEditing={this.onSubmit.bind(this)}
          value={this.state.question}
          style={styles.input}
          placeholder='Enter question...'
        />
        <TextInput
          ref={el => {this.answer = el;}}
          onChangeText={answer => this.setState({answer})}
          onSubmitEditing={this.onSubmit.bind(this)}
          value={this.state.answer}
          style={styles.input}
          placeholder='Enter answer...'
        />
        <TouchableOpacity onPress={this.onSubmit.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps({deck, decks}){
  return {
    deck,
    decks
  }
}

const styles = StyleSheet.create({
  container:{
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
    marginTop: 10
  },
  input:{
    height: 70,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  button:{
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#447',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 10
  },
  buttonText:{
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  }
})

export default connect(mapStateToProps)(NewQuestion);
