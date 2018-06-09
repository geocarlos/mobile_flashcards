import {GET_DECKS, GET_DECK} from './types'

export function getDecks(deckList=[]){
  return {
    type: GET_DECKS,
    deckList
  }
}

export function getDeck(deck){
  return {
    type: GET_DECK,
    deck
  }
}
