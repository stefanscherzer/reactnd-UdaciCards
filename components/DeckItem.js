import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import { white, gray } from '../utils/colors'

export default function DeckItem ({ item, val }) {
  return (
    <View style={styles.item}>
      <Text style={{fontSize: 20}}>
        Key: {item}, Value: {val.title}
      </Text>
      <Text style={{fontSize: 16, color: gray}}>
        {val.questions.length} card{val.questions.length == 0 || val.questions.length > 1 ? 's' : ''}
      </Text>
    </View>
  )
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
