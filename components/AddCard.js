// components/AddCard.js

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

import { white, purple } from '../utils/colors'

import TextButton from './TextButton'

import { updateEntry } from '../utils/api'

import { addCardToDeck } from '../actions'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: `Add Card for Deck: ${entryId}`
    }
  }

  state = {
    question: 'Please enter your question',
    answer: 'Please enter your answer',
  }

  submit = () => {
    const { add, goBack, entryId } = this.props
    const { question, answer } = this.state

    updateEntry(entryId, { question: question, answer: answer })

    add({ question: question, answer: answer })

    this.setState(() => ({
      question: 'Please enter your question',
      answer: 'Please enter your answer',
    }))

    goBack()
  }

  render() {
    const { deck } = this.props
    const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>
            Here you can add a new card for the deck: {deck.title}
          </Text>
        </View>

        <View>
          <FormLabel>Question</FormLabel>
          <FormInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            value={question}
            placeholder="Please enter your question"
            placeholderTextColor="gray"
            onFocus= {() => this.setState({question : ''})}
            onChangeText={(question) => this.setState({question})}
            />
        </View>
        <View>
          <FormLabel>Answer</FormLabel>
          <FormInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            value={answer}
            placeholder="Please enter your answer"
            placeholderTextColor="gray"
            onFocus= {() => this.setState({answer : ''})}
            onChangeText={(answer) => this.setState({answer})}
            />
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
    add: (element) => dispatch(addCardToDeck(
      entryId,
      element
    )),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCard)
