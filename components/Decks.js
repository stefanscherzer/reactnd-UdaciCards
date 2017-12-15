import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import { getDecks } from '../actions'

import { fetchDecksResults } from '../utils/api'

import DeckItem from './DeckItem'

import { AppLoading } from 'expo'

class Decks extends Component {
  state = {
    ready: false,
    decks: {}
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDecksResults()
      .then((decks) => { console.log('decks', decks); return decks; })
      .then((decks) => dispatch(getDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    // AsyncStorage.clear()

    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    console.log('render decks', decks);

    return (
      <View>
        {Object.entries(decks).map(([key, val], i) => {
          return (
            <TouchableOpacity
                key={'key-'+ i}
                onPress={() => this.props.navigation.navigate(
                  'EntryDetail',
                  { entryId: key }
                )}
              >
              <DeckItem item={key} val={val} />
            </TouchableOpacity>


          )
        })}
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks)
