// @flow
import React from 'react'
import { connect } from 'react-redux'

import { StyleSheet, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'

import Listing from './Listing'
import { clearNotifications, readNotifications } from '../../store/actions'
import type NotificationType from './NotificationType'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type NotificationsProps = {
  notifications: NotificationType[],
  clearNotifications: Function,
  readNotifications: Function,
}
const Notifications = ({
  notifications,
  clearNotifications,
  readNotifications,
}: NotificationsProps) => (
  <View style={styles.container}>
    <NavigationEvents onDidBlur={() => readNotifications()} />
    <Listing notifications={notifications} clearNotifications={clearNotifications} />
  </View>
)

const mapStateToProps = state => ({
  notifications: state.notifications,
})
const mapDispatchToProps = dispatch => ({
  clearNotifications: () => {
    dispatch(clearNotifications())
  },
  readNotifications: () => {
    dispatch(readNotifications())
  },
})

const ConnectedNotifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications)

export default ConnectedNotifications
