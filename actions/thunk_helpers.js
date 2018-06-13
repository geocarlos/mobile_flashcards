/**
  These functions are in the actions folder, because they "thunk actions",
  intended to handle asynchronous tasks.*/

import { AsyncStorage } from 'react-native';
import * as actions from './index';
import getMockDecks from '../utils/mock_cards';


const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';


/**
  getDeckList()
  Data from AsyncStorage are turned into a array, deckList, which is passed
  to the action creator "decks".*/

export function getDeckList(){

  /* In order to save the mock decks, uncomment the return below, run the app,
    then comment it out again*/

  // return (dispatch) =>{
  //   AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(getMockDecks()))
  //   .then(()=> dispatch(actions.getDecks(Object.values(getMockDecks()))))
  //   .catch(()=> console.log('Decks failed to save.'))
  // }

  return (dispatch)=>{
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res)=>JSON.parse(res))
    .then((data)=>{
      if(data !== null){
        deckList = Object.values(data);
        dispatch(actions.getDecks(deckList));
      }
    })
    .catch(()=>console.log("Unable to fetch data."))
  }
}

/**
  saveDeckTitle()
  Add a new deck to the MobileFlashcards:decks object in the AsyncStorage
  and dispatches ADD_DECK to add it to Redux store.*/

export function saveDeckTitle(deck){
  return (dispatch)=>{
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deck.title]: deck
    }))
    .then(()=>dispatch(actions.addDeck(deck)))
    .catch(()=>console.log(`Could not add ${deck.title}`))
  }
}

/**
  Update deck in the MobileFlashcards:decks in the AsyncStorage and
  dispatch ADD_CARD and GET_DECK to update Redux store*/

export function addCardToDeck(deckWithNewCard){
  return (dispatch)=>{
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deckWithNewCard.title]: deckWithNewCard
    }))
    .then(()=>dispatch(actions.getDeck(deckWithNewCard)))
    .then(()=>dispatch(actions.addCard(deckWithNewCard)))
    .catch(()=>console.log(`Could not add card to ${deckWithNewCard.title}`))
  }
}

/**
  clearAll()
  Give the user the ability to delete all the decks.
  After the whole MobileFlashcards:decks object is removed
  from AsyncStorage, GET_DECKS is dispatched to update the store*/

export function clearAll(){
  return (dispatch) =>{
    AsyncStorage.removeItem(DECKS_STORAGE_KEY)
    .then(()=> dispatch(actions.getDecks([])))
    .catch(()=> console.log("Could not clear data."))
  }
}
