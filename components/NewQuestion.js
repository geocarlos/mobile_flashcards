import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionForm from './QuestionForm';

class NewQuestion extends Component{

  render(){
    return (
      <QuestionForm navigation={this.props.navigation} />
    )
  }
}

export default connect()(NewQuestion);
