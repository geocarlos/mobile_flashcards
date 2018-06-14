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
        // deckList = Object.values(data);
        dispatch(actions.getDecks(data));
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
    .then(()=>dispatch(actions.updateDecks(deck)))
    .catch(()=>console.log(`Could not add ${deck.title}`))
  }
}

/**
  updateDeckCards()
  Update deck in the MobileFlashcards:decks in the AsyncStorage and
  dispatch UPDATE_DECK_CARD and GET_DECK to update Redux store.
  This is used when adding a new card and when editing a card*/

export function updateDeckCards(deckToUpdate){
  return (dispatch)=>{
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deckToUpdate.title]: deckToUpdate
    }))
    .then(()=>dispatch(actions.updateDecks(deckToUpdate)))
    .then(()=>dispatch(actions.getDeck(deckToUpdate)))
    .catch((e)=>console.log(`Could not add card to ${deckToUpdate.title}`, e))
  }
}

/**
  updateDeckTitle()
  Allow user to change the title of a deck. The deck is actually delete
  and a new one is stored with all of its cards.*/

export function updateDeckTitle(deckToUpdate, oldTitle, decks){
  delete decks[oldTitle];
  decks[deckToUpdate.title] = deckToUpdate;
  return (dispatch)=>{
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    .then(()=>dispatch(actions.updateDecks(deckToUpdate)))
    .then(()=>dispatch(actions.getDeck(deckToUpdate)))
    .catch((e)=>console.log('Could not update the title card', e))
  }
}

/**
  deleteDeck()
  Allow user to delete a deck with all of its cards.*/

export function deleteDeck(deckToDelete, decks){
  delete decks[deckToDelete.title];
  return (dispatch)=>{
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    .then(()=>dispatch(getDeckList()))
    .catch((e)=>console.log('Could not delete the deck', e))
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
