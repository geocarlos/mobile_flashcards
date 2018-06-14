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
import {getDeck} from '../actions';
import { saveDeckTitle, updateDeckTitle } from '../actions/thunk_helpers';

class DeckForm extends Component{

  state = {
    deckName: '',
    viewHeight: '100%'
  }

  /**
    All of the keyboard-related code is necessary because KeyboardAvoidingView
    is currently not working with Android. If this app was to be developed
    for iOS, all of this might be replaced with the KeyboardAvoidingView component.*/

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    if(this.props.deck){
      this.setState({deckName: this.props.deck.title});
    }
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
    const dName = this.state.deckName;
    if(dName === ""){
      Alert.alert("Title field empty!","You cannot save a deck without a name!");
      return;
    }
    checkList = [];
    if(this.props.decks.deckList){
      checkList = this.props.decks.deckList.filter(function(d){
        return d.title === dName;
      });
    }

    if(checkList.length === 0){
      if(this.props.deck){
        this.props.dispatch(updateDeckTitle({
          title: this.state.deckName,
          questions: this.props.deck.questions
        }, this.props.deck.title, this.props.decks))
      } else {
        this.props.dispatch(saveDeckTitle({
          title: this.state.deckName,
          questions: []
        }))
      }
      this.setState({deckName: ""})
      Alert.alert(
        this.props.successMsg(dName),
        this.props.successPrompt,
        [
          {text: 'Yes', onPress: () => {
            if(!this.props.deck){
              this.props.dispatch(getDeck(
                this.props.decks[dName]
              ))
            }
            this.props.navigation.navigate('Deck', {pageTitle: dName})
          }},
          {text: 'Not now', onPress: () => {}},
        ],
        { cancelable: false }
      )
    } else {
    Alert.alert(this.props.deckExistTitle,
      this.props.deckExistMsg(dName));
    }
  }

  render(){

    const {headerMsg, buttonText} = this.props;


    const justify = this.state.viewHeight === '100%' ? 'space-evenly':'flex-start';
    return (
      <View style={[styles.container, {justifyContent: justify, height: this.state.viewHeight}]}>
        <Text style={styles.heading}>
          {headerMsg}
        </Text>
        <TextInput
          ref={el => {this.deckName = el;}}
          onChangeText={deckName => this.setState({deckName})}
          onSubmitEditing={this.onSubmit.bind(this)}
          value={this.state.deckName}
          style={styles.input}
          placeholder='Enter Deck name...'
        />
        <TouchableOpacity onPress={this.onSubmit.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps({decks}){
  return {
    decks
  }
}

const styles = StyleSheet.create({
  container:{
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
  },
  heading:{
    fontSize: 35,
    textAlign: 'center',
    padding: 10,
  },
  input:{
    height: 70,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#00838f',
    marginLeft: '5%',
    marginRight: '5%',
    paddingLeft: 5,
    paddingRight: 5
  },
  button:{
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00838f',
    backgroundColor: '#00838f',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 10
  },
  buttonText:{
    fontSize: 20,
    padding: 10,
    color: '#fefefe',
    textAlign: 'center'
  }
})

export default connect(mapStateToProps)(DeckForm);
