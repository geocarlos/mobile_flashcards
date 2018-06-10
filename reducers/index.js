import {
  GET_DECKS,
  GET_DECK,
  ADD_DECK,
  ADD_CARD
} from '../actions/types';
import {combineReducers} from 'redux';

function decks(state = [], action){
  switch(action.type){
    case GET_DECKS:
      return action.deckList;
    case ADD_DECK:
      console.log(state)
      return {
        ...state,
        deckList: state.deckList.concat( action.deck)
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
