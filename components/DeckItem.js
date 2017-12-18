// components/DeckItem.js

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { gray } from '../utils/colors'

export default function DeckItem ({ itemval }) {
  return (
    <View>
      <Text style={{fontSize: 20}}>
        {itemval.title}
      </Text>
      <Text style={{fontSize: 16, color: gray}}>
        {itemval.questions.length} card{itemval.questions.length == 0 || itemval.questions.length > 1 ? 's' : ''}
      </Text>
    </View>
  )
}
