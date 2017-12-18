// components/Decks.js

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  // AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'

import { getDecks } from '../actions'

import { fetchDecksResults } from '../utils/api'

import DeckItem from './DeckItem'

import { white } from '../utils/colors'

import { AppLoading } from 'expo'

class Decks extends Component {
  state = {
    ready: false,
    decks: {}
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDecksResults()
      .then((decks) => { console.log('async storage decks', decks); return decks; })
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
      <ScrollView>
        {Object.entries(decks).map(([key, val], i) => {
          return (
            <TouchableOpacity
                style={styles.item}
                key={'key-'+ i}
                onPress={() => this.props.navigation.navigate(
                  'DeckDetail',
                  { entryId: key }
                )}
              >
              <DeckItem itemval={val} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks)
