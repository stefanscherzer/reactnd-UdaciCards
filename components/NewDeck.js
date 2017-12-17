import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { Ionicons } from '@expo/vector-icons'

import TextButton from './TextButton'

import { submitEntry } from '../utils/api'
import { purple, white } from '../utils/colors'

import { saveDeckTitle } from '../actions'


function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}
class NewDeck extends Component {
  state = {
    deck: 'Deck Title',
    error: false,
  }

  submit = () => {
    const { deck } = this.state

    this.props.dispatch(saveDeckTitle({
      [deck]: {
        title: deck,
        questions: []
      }
    }))

    submitEntry({
      [deck]: {
        title: deck,
        questions: []
      }
    })

    this.setState(() => ({ deck: '' }))

    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
  }

  render() {
    const { error, deck } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>
            What is the title of your new deck?
          </Text>
        </View>

        <View>
          <FormLabel>Name</FormLabel>
          <FormInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            value={deck}
            placeholder="Deck Title"
            placeholderTextColor="gray"
            onChangeText={(deck) => this.setState({deck})}
            />

          {error === true &&
            <FormValidationMessage>{'This field is required'}</FormValidationMessage>
          }
        </View>

        <View style={{padding: 10}}>
          <SubmitBtn onPress={this.submit} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 10,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

export default connect()(NewDeck)
