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
      return {
        ...state,
        deckList: state.deckList.concat(action.deck)
      }
    case ADD_CARD:
      const newState = Object.assign({}, state);
      newState.deckList.map((d, i)=>{
        if(d.title === action.card.deck){
          newState.deckList[i].questions.push({
            question: action.card.question,
            answer: action.card.answer
          });
        }
        return null;
      });
      return {...newState};
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
