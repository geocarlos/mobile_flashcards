import React, { Component } from 'react';
import DeckForm from './DeckForm'
import { connect } from 'react-redux';

class NewDeck extends Component{

  render(){
    return (
      <DeckForm
        navigation={this.props.navigation}
        headerMsg='What is the name of your new deck?'
        deckExistTitle='Deck already exists'
        deckExistMsg={(title)=> `A deck named ${title} already exists! You may add questions to it then...`}
        successMsg={(title)=>`Deck ${title} successfully added!`}
        successPrompt='Would like to go to its page?'
        buttonText='Submit'/>
    )
  }
}

export default connect()(NewDeck);
