// @flow
import React from 'react'
import { StyleSheet, View, SafeAreaView, Text, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexBasis: 110,
    backgroundColor: '#2977f5',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    margin: 20,
    marginLeft: 25,
    color: '#f5f8fe',
    fontWeight: 'bold',
  },
})

type HeaderProps = {
  title: string,
}

const Header = ({ title }: HeaderProps) => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#2977f5" barStyle="light-content" />
    <SafeAreaView style={styles.safeArea}>
      <Text style={[styles.title]}>{title}</Text>
    </SafeAreaView>
  </View>
)

export default Header
