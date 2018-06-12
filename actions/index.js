import {
  GET_DECKS,
  GET_DECK,
  ADD_DECK,
  ADD_CARD
} from './types'

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

export function addDeck(deck){
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard(deckWithNewCard){
  return {
    type: ADD_CARD,
    deckWithNewCard
  }
}
