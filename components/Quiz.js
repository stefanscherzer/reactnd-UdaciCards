// components/Quiz.js

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux'

import { white, purple, red, green } from '../utils/colors'

import TextButton from './TextButton'

import { updateEntry } from '../utils/api'

import { addCardToDeck } from '../actions'

function CorrectBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {backgroundColor: green}]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Correct</Text>
    </TouchableOpacity>
  )
}

function IncorrectBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {backgroundColor: red}]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Incorrect</Text>
    </TouchableOpacity>
  )
}

function DoneBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {backgroundColor: purple}]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Done</Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: `Quiz for Deck: ${entryId}`
    }
  }

  componentDidMount() {
    const { deck } = this.props

    this.setState(() => ({
      cardsTotal: deck.questions.length,
    }))
  }

  state = {
    cardsTotal: 0,
    cardsDone: 0,
    showQuestion: true,
    correct: 0,
    incorrect: 0,
  }

  toggle = () => {
    const { showQuestion } = this.state

    this.setState(() => ({
      showQuestion: !showQuestion,
    }))
  }

  correct = () => {
    const { cardsDone, correct } = this.state

    this.setState(() => ({
      cardsDone: cardsDone + 1,
      correct: correct + 1,
      showQuestion: true
    }))
  }

  incorrect = () => {
    const { cardsDone, incorrect } = this.state

    this.setState(() => ({
      cardsDone: cardsDone + 1,
      incorrect: incorrect + 1,
      showQuestion: true
    }))
  }

  end = () => {
    const { goBack } = this.props
    goBack()
  }

  render() {
    const { deck } = this.props
    const { cardsTotal, cardsDone, showQuestion, correct, incorrect } = this.state

    if (!deck.questions[cardsDone]) {
        correctPercent = (correct/cardsTotal)*100;
        incorrectPercent = (incorrect/cardsTotal)*100;

        return (
          <View style={styles.container}>
            <View>
              <Text>You answered all of the {cardsTotal} cards!</Text>
            </View>
            <View>
              <Text>Correct: {correct} ({correctPercent.toFixed(2)}%)</Text>
            </View>
            <View>
              <Text>Incorrect: {incorrect} ({incorrectPercent.toFixed(2)}%)</Text>
            </View>
            <View style={{padding: 10}}>
              <DoneBtn onPress={this.end} />
            </View>
          </View>
        )
    }

    return (
      <View style={styles.container}>
        <View>
          <Text>{cardsDone+1}/{cardsTotal}</Text>
        </View>

        <View style={[styles.center, {paddingTop: 20, paddingBottom: 60}]}>
          <Text>
            {showQuestion ?
              deck.questions[cardsDone].question :
              deck.questions[cardsDone].answer}
          </Text>
        </View>

        <View style={[styles.center, {paddingTop: 20, paddingBottom: 60}]}>
          <TextButton style={{margin: 20}} onPress={this.toggle}>
            {showQuestion ?
              'Answer' :
              'Question'}
          </TextButton>
        </View>

        <View style={{padding: 10}}>
          <CorrectBtn onPress={this.correct} />
        </View>

        <View style={{padding: 10}}>
          <IncorrectBtn onPress={this.incorrect} />
        </View>
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
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 10,
  },
  AndroidSubmitBtn: {
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
)(Quiz)
