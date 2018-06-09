import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native';

/**
  The code to flip the card has been adapted from the one found
  in this repo: https://github.com/browniefed/examples/tree/animated_basic/flip
*/

class Quiz extends PureComponent{

  state = {
    card: 0,
    score: 0,
    flipValue: 0
  }

  goToNextCard(point){
    const {deck} = this.props.deck;

    if(this.state.card < deck.questions.length){
      this.setState({
        ...this.state,
        card: this.state.card + 1,
        score: this.state.score + point
      })
      if(this.state.flipValue >= 90){
        this.flipCard();
      }
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
        friction: 2
      }
    ).start()
  }

  _goBack(){
    this.props.navigation.goBack();
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

    const {deck} = this.props.deck;
    const {card, score} = this.state;

    if(card >= deck.questions.length){
      console.log("Springing?")
      this.spring()
    }

    return (
      <View style={styles.container}>
        {card >= deck.questions.length ?
          <Animated.View style={{transform: [{scale: this.springValue}] }}>
            <View style={styles.ending}>
              <Text style={{fontSize: 45}}>Quiz Completed</Text>
              <Text style={{fontSize: 30}}>Your score is {score} points</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={this._goBack.bind(this)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View> :
          <View>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
              <Text style={styles.flipText}>
                {deck.questions[card].question}
              </Text>
              <TouchableOpacity onPress={() => this.flipCard()}>
                <Text style={styles.qa}>View Answer</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
              <Text style={styles.flipText}>
                {deck.questions[card].answer}
              </Text>
              <TouchableOpacity onPress={() => this.flipCard()}>
                <Text style={styles.qa}>View Question</Text>
              </TouchableOpacity>
            </Animated.View>
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
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "#ededed",
    position: "absolute",
    top: 0,
  },
  flipText: {
    width: 300,
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  qa: {
    marginTop: 50,
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
