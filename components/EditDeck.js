import React, { Component } from 'react';
import DeckForm from './DeckForm';
import { connect } from 'react-redux';

class EditDeck extends Component {
  render(){
    return (
      <DeckForm
        deck={this.props.deck}
        navigation={this.props.navigation}
        header='Enter the new title for the deck: '
        deckExistTitle='Another deck has that title'
        deckExistMsg={(title)=> `In order to rename this deck as ${title}, please delete or change the other deck title first`}
        successMsg={(title)=>`Deck ${title} successfully updated!`}
        successPrompt='Go back to the management page?'
        buttonText='Save Change'/>
    )
  }
}

function mapStateToProps({deck}){
  return {
    deck
  }
}

export default connect(mapStateToProps)(EditDeck);
