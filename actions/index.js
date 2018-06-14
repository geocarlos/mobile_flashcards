import {
  GET_DECKS,
  GET_DECK,
  UPDATE_DECKS
} from './types'

export function getDecks(decks={}){
  return {
    type: GET_DECKS,
    decks
  }
}

export function updateDecks(deck){
  return {
    type: UPDATE_DECKS,
    deck
  }
}

export function getDeck(deck){
  return {
    type: GET_DECK,
    deck
  }
}
