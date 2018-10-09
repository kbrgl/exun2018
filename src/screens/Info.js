// @flow
import React from 'react'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'

import Header from '../components/Header'

const unirely = require('../../assets/images/unirely.png')
const athena = require('../../assets/images/athena.png')
const digitalIndia = require('../../assets/images/digital-india.png')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default () => (
  <View style={styles.container}>
    <Header title="Info" />
    <ScrollView>
      <Text
        style={{
          marginLeft: 30,
          marginTop: 30,
          fontSize: 25,
          fontWeight: 'bold',
          color: '#223052',
        }}
      >
        Sponsors
      </Text>
      <Image
        style={{
          width: 200,
          height: 80,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 30,
        }}
        source={unirely}
        defaultSource={unirely}
        resizeMode="cover"
      />
      <Image
        style={{
          width: 189,
          height: 120,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 20,
        }}
        source={athena}
        defaultSource={athena}
        resizeMode="cover"
      />
      <Image
        style={{
          width: 189,
          height: 120,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 20,
        }}
        source={digitalIndia}
        defaultSource={digitalIndia}
        resizeMode="cover"
      />
      <Text
        style={{
          marginLeft: 30,
          marginTop: 30,
          fontSize: 25,
          fontWeight: 'bold',
          color: '#223052',
        }}
      >
        Credits
      </Text>
      <Text
        style={{
          marginLeft: 30,
          marginRight: 30,
          marginTop: 30,
          marginBottom: 30,
          color: '#223052',
        }}
      >
        Built by Kabir Goel with support from the app team at Exun Clan.
      </Text>
    </ScrollView>
  </View>
)
