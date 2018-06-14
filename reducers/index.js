import {
  GET_DECKS,
  GET_DECK,
  UPDATE_DECKS
} from '../actions/types';
import {combineReducers} from 'redux';

function decks(state = {}, action){

  switch(action.type){
    case GET_DECKS:
      return action.decks
    case UPDATE_DECKS:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
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
