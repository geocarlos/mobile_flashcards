import {
  GET_DECKS,
  GET_DECK,
  ADD_DECK,
  ADD_CARD
} from '../actions/types';
import {combineReducers} from 'redux';

const INIT_STATE = {
  deckList: []
}

function decks(state = INIT_STATE, action){
  switch(action.type){
    case GET_DECKS:
      return {
        ...state,
        deckList: state.deckList.concat(action.deckList)
      }
    case ADD_DECK:
      return {
        ...state,
        deckList: state.deckList.concat(action.deck)
      }
    case ADD_CARD:
      const newState = Object.assign({}, state);
      newState.deckList.map((d, i)=>{
        if(d.title === action.deckWithNewCard.title){
          newState.deckList[i] = action.deckWithNewCard
        }
        return null;
      });
      return newState;
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
