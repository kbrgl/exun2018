import React from 'react'
import { View, AppState, StatusBar } from 'react-native'
import { Provider, connect } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { PersistGate } from 'redux-persist/integration/react'
import OneSignal from 'react-native-onesignal'
import codePush from 'react-native-code-push'

import Home from './screens/Home'
import Info from './screens/Info'
import Notifications from './screens/Notifications'
import Schedule from './screens/Schedule'

import Intro from './components/Intro'

import configureStore from './store'
import { postsRefresh, receivedNotification } from './store/actions'

const { store, persistor } = configureStore()

/**
 * Setup notifications
 */

OneSignal.init('73966f65-91f6-4d9d-93be-4fd9d4621237')

// If a notification is received while the app is in the foreground,
// send it to notification shade.
// This overrides the default behaviour, which is an annoying alert.
OneSignal.inFocusDisplaying(2)

OneSignal.addEventListener('received', notification => {
  store.dispatch(receivedNotification(notification))
})

/**
 * Setup stacks for individual screens
 */

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

const ScheduleStack = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: () => ({
        title: 'Schedule',
        ...stackNavigationOptions,
      }),
    },
  },
  stackConfig,
)

const NotificationsStack = createStackNavigator(
  {
    Notifications: {
      screen: Notifications,
      navigationOptions: () => ({
        title: 'Notifications',
        ...stackNavigationOptions,
      }),
    },
  },
  stackConfig,
)

type NotificationsIconProps = {
  unread: number,
  color: string,
}
const NotificationsIcon = ({ unread, color }: NotificationsIconProps) => (
  <View>
    <FeatherIcon name="bell" size={25} color={color} />
    {unread > 0 ? (
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          backgroundColor: '#c32148',
          borderRadius: 6,
          width: 12,
          height: 12,
        }}
      />
    ) : null}
  </View>
)

const ConnectedNotificationsIcon = connect(state => ({
  unread: state.notifications.filter(notification => !notification.read).length,
}))(NotificationsIcon)

/**
 * Create tabs
 */

const Tabs = createBottomTabNavigator(
  {
    Home: HomeStack,
    Notifications: NotificationsStack,
    Schedule: ScheduleStack,
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
          case 'Schedule':
            iconName = 'calendar'
            break
          case 'Notifications':
            return <ConnectedNotificationsIcon color={tintColor} />
          default:
        }
        return <FeatherIcon name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#ffffffaa',
      style: {
        backgroundColor: '#2977f5',
      },
      showLabel: false,
    },
    initialRouteName: 'Home',
  },
)

/**
 * Main app component
 */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
    }
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
      OneSignal.clearOneSignalNotifications()
    }
    this.setState({ appState: nextAppState })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: '#f5f8fe' }}>
            <StatusBar backgroundColor="#2977f5" barStyle="light-content" />
            <Intro />
            <Tabs />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

/**
 * CodePush-ify app
 */

export default codePush({})(App)
