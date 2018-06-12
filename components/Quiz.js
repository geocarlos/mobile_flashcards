import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';

/**
  The code to flip the card has been adapted from the one found
  in this repo: https://github.com/browniefed/examples/tree/animated_basic/flip.
  Two views are overlapped, then they are spinned 180 degrees, and their
  opacity is changed from 1 to 0 and from 0 to 1. In this case, the view for
  the answer goes on top of the view for the question. Because of that, in order
  to click on the "View Answer" button, I need to remove the Answer view,
  instead of just setting its opacity to 0. So, the Answer view will be rendered
  or not, depending on the value of the "showA" property in this component's state.*/

class Quiz extends Component{

  state = {
    card: 0,
    score: 0,
    flipValue: 0,
    showA: false
  }

  goToNextCard(point){

    if(this.state.flipValue >= 90){
      this.flipCard();
    }

    const {deck} = this.props;

    if(this.state.card < deck.questions.length){
      this.setState({
        ...this.state,
        card: this.state.card + 1,
        score: this.state.score + point,
        showA: false
      })

    }
  }

  componentWillMount() {
    this.springValue = new Animated.Value(0);
    this.animatedValue = new Animated.Value(0);
    this.animatedValue.addListener(({ value }) => {
      this.setState({flipValue: value});
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flipCard() {
    this.setState({showA: !this.state.showA})
    if (this.state.flipValue >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }

  spring(){
    this.springValue.setValue(0.3);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 3
      }
    ).start();
    // Notification is cleared and set up again whenever the user finishes
    // a quiz. 
    clearLocalNotification()
    .then(setLocalNotification);
  }

  _goBack(){
    this.props.navigation.goBack();
  }

  restartQuiz(){
    if(this.state.flipValue >= 90){
      this.flipCard();
    }
    this.setState({
      card: 0,
      score: 0,
      showA: false
    });
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    const {deck} = this.props;
    const {card, score, showA} = this.state;

    if(card >= deck.questions.length){
      this.spring()
    }

    return (
      <View style={styles.container}>
        {card >= deck.questions.length ?
          <Animated.View style={{transform: [{scale: this.springValue}] }}>
            <View style={styles.ending}>
              <Text style={{fontSize: 45}}>Quiz Completed</Text>
              <Text style={{fontSize: 30, textAlign: 'center'}}>
                You&#39;ve got {score} correct answers
              </Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={this.restartQuiz.bind(this)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Restart Quiz</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._goBack.bind(this)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Back to Deck</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View> :
          <View>
            <Text style={{marginLeft: 10, fontSize: 20}}>
              {card+1}/{deck.questions.length}
            </Text>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
              <Text style={styles.flipText}>
                {deck.questions[card].question}
              </Text>
              <TouchableOpacity onPress={this.flipCard.bind(this)}>
                <View style={[styles.button, {padding: 10, marginTop: 15}]}>
                  <Text style={styles.qa}>View Answer</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            {showA && <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
              <Text style={styles.flipText}>
                {deck.questions[card].answer}
              </Text>
              <TouchableOpacity onPress={this.flipCard.bind(this)}>
                <View style={[styles.button, {padding: 10, marginTop: 15}]}>
                  <Text style={styles.qa}>View Question</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>}
            <View style={styles.buttons}>
              <TouchableOpacity onPress={this.goToNextCard.bind(this, 1)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Correct</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.goToNextCard.bind(this, 0)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Incorrect</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  flipCard: {
    minWidth: '100%',
    height: 330,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "#ededed",
    position: "absolute",
    top: 25,
  },
  flipText: {
    width: 300,
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  qa: {
    // marginTop: 50,
    fontSize: 25,
    color: '#f00'
  },
  buttons:{
    paddingRight: 20,
    paddingLeft: 20
  },
  button:{
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#447',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15
  },
  buttonText:{
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  ending: {
    minWidth: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function mapStateToProps({deck}){
  return {
    deck
  }
}

export default connect(mapStateToProps)(Quiz)
