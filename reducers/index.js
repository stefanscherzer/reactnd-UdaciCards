import { GET_DECKS, SAVE_DECK_TITLE } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case SAVE_DECK_TITLE :
      return {
        ...state,
        ...action.deck,
      }
    // case ADD_CARD :
    //   return {
    //     ...state,
    //     ...action.card
    //   }
    default :
      return state
  }
}

export default decks
