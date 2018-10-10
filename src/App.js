import React from 'react'
import { View, AppState } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import OneSignal from 'react-native-onesignal'

import Home from './screens/Home'
import Info from './screens/Info'

import Intro from './components/Intro'

import rootSaga from './sagas'

import rootReducer from './reducers'
import { postsRefresh } from './actions'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)

const stackConfig = {
  headerMode: 'float',
  cardStyle: {
    backgroundColor: '#f5f8fe',
  },
}

const stackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#2977f5',
  },
  headerTitleStyle: {
    color: '#fff',
  },
}

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Exun 2018',
        ...stackNavigationOptions,
      }),
    },
  },
  stackConfig,
)

const InfoStack = createStackNavigator(
  {
    Info: {
      screen: Info,
      navigationOptions: () => ({
        title: 'Info',
        ...stackNavigationOptions,
      }),
    },
  },
  stackConfig,
)

const Tabs = createBottomTabNavigator(
  {
    Home: HomeStack,
    Info: InfoStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        switch (routeName) {
          case 'Home':
            iconName = 'home'
            break
          case 'Info':
            iconName = 'info'
            break
          default:
        }
        return <FeatherIcon name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1e3055',
      inactiveTintColor: '#8fa7bb',
      style: {
        backgroundColor: '#f5f8fe',
      },
      showLabel: false,
    },
  },
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
    }
  }

  componentWillMount() {
    OneSignal.init('73966f65-91f6-4d9d-93be-4fd9d4621237')
    OneSignal.inFocusDisplaying(2)
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = nextAppState => {
    const { appState } = this.state
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      store.dispatch(postsRefresh())
    }
    this.setState({ appState: nextAppState })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: '#f5f8fe' }}>
            <Intro />
            <Tabs />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
