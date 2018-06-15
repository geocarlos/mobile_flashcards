import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { MaterialCommunityIcons as MCI } from '@expo/vector-icons';

export default class Initial extends React.Component {

  componentDidMount(){
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus', ()=>{
        setTimeout(()=>{
          this.props.navigation.navigate('Tabs');
        }, 1000);
      }
    )
  }

  componentWillUnmount(){
    this.didFocusSubscription.remove();
  }

  render(){
    return (
          <View style={styles.container}>
            <Text style={{textAlign: 'center'}}>
              <MCI name='cards' size={200} color='#00838f' />
            </Text>
            <Text style={styles.text}>
              Mobile Flashcards
            </Text>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '70%'
  },
  text:{
    fontFamily: 'serif',
    fontSize: 50,
    textAlign: 'center',
    padding: 10,
  }
})
