// utils/api.js

import { AsyncStorage } from 'react-native'
import { formatDecksResults, DECKS_STORAGE_KEY } from './_decks'

export function fetchDecksResults () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDecksResults)
}

export function submitEntry (entry) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(
    entry
  ))
}

export function updateEntry (uid, entry) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then( data => {
      // the string value read from AsyncStorage has been assigned to data

      // transform it back to an object
      data = JSON.parse( data );

      // add new element
      data[uid].questions.push(entry);

      //remove all the stored items
      AsyncStorage.removeItem(DECKS_STORAGE_KEY);

      //save the update items to AsyncStorage again
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify( data ) );
    })
}
