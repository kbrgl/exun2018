// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'

import Header from '../../components/Header'

import Listing from './Listing'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default () => (
  <View style={styles.container}>
    <Header title="Exun 2018" />
    <Listing />
  </View>
)
