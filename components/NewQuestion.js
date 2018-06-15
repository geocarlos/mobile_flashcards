import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionForm from './QuestionForm';

class NewQuestion extends Component{

  /* Buttons for the alert dialog */

  render(){
    return (
      <QuestionForm
        navigation={this.props.navigation}
        cardSuccess={(title)=>`Card successfully added to ${title}!`}
        moreCardsPrompt='Would you like to go to Quiz or add more cards?'
        alertBtns={this.alertBtns}
        />
    )
  }
}

export default connect()(NewQuestion);
