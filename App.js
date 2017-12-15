import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
// import EntryDetail from './components/EntryDetail'
// import Live from './components/Live'

import { purple, white } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'



function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='library-plus' size={30} color={tintColor} />
    },
  },
  // Live: {
  //   screen: Live,
  //   navigationOptions: {
  //     tabBarLabel: 'Live',
  //     tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
  //   }
  // }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  // EntryDetail: {
  //   screen: EntryDetail,
  //   navigationOptions: {
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple,
  //     }
  //   }
  // }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
