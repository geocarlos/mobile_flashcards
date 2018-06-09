import {GET_DECKS, GET_DECK} from '../actions/types';
import {combineReducers} from 'redux';

function decks(state = [], action){
  switch(action.type){
    case GET_DECKS:
      return action.deckList;
    default:
      return state;
  }
}

function deck(state = {}, action){
  switch(action.type){
    case GET_DECK:
      return action.deck;
    default:
      return state;
  }
}

export default combineReducers({decks, deck});
