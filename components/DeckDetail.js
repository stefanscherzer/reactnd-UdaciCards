// components/DeckDetail.js

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'

import { white, purple } from '../utils/colors'

import DeckItem from './DeckItem'
import TextButton from './TextButton'


function AddBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  )
}

function QuizBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Start Quiz</Text>
    </TouchableOpacity>
  )
}

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: `Deck: ${entryId}`
    }
  }

  add = () => {
    const { entryId } = this.props

    this.props.navigation.navigate(
      'AddCard',
      { entryId: entryId }
    );
  }

  quiz = () => {
    const { entryId } = this.props

    this.props.navigation.navigate(
      'Quiz',
      { entryId: entryId }
    );
  }

  render() {
    const { entryId, deck } = this.props

    return (
      <View style={styles.container}>
        <View style={[styles.center, {paddingTop: 20, paddingBottom: 60}]}>
          <DeckItem itemval={deck} />
        </View>

        <View style={{padding: 10}}>
          <AddBtn onPress={this.add} />
        </View>

        {(deck.questions.length && deck.questions.length)
          ?
          <View style={{padding: 10}}>
            <QuizBtn onPress={this.quiz} />
          </View>
          :
          <View style={styles.center}>
            <Text style={{textAlign: 'center', paddingTop: 20}}>
              You have to add a card before you can start a quiz!
            </Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
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

function mapStateToProps (state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    deck: state[entryId],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail)
