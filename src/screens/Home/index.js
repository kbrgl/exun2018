// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'

import Listing from './Listing'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default () => (
  <View style={styles.container}>
    <Listing />
  </View>
)
