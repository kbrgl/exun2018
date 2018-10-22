// @flow
import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import Text from '../components/AppText'

const unirely = require('../../assets/images/unirely.png')
const athena = require('../../assets/images/athena.png')
const digitalIndia = require('../../assets/images/digital-india.png')
const logo = require('../../assets/images/logo.png')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default () => (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        style={{
          width: 200,
          height: 80,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginVertical: 30,
        }}
        source={logo}
        defaultSource={logo}
        resizeMode="cover"
      />
      <Text
        style={{
          marginLeft: 30,
          marginTop: 30,
          marginBottom: 30,
          fontSize: 25,
          fontWeight: 'bold',
        }}
      >
        Sponsors
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Image
          style={{
            width: 200,
            height: 80,
            marginLeft: 10,
            marginRight: 20,
          }}
          source={unirely}
          defaultSource={unirely}
          resizeMode="cover"
        />
        <Image
          style={{
            width: 130,
            height: 84,
            marginLeft: 10,
            marginRight: 40,
          }}
          source={athena}
          defaultSource={athena}
          resizeMode="cover"
        />
        <Image
          style={{
            width: 135,
            height: 85.7,
            marginLeft: 10,
            marginRight: 30,
          }}
          source={digitalIndia}
          defaultSource={digitalIndia}
          resizeMode="cover"
        />
      </ScrollView>
      <Text
        style={{
          marginLeft: 30,
          marginTop: 30,
          marginBottom: 30,
          fontSize: 25,
          fontWeight: 'bold',
        }}
      >
        Credits
      </Text>
      <Text
        style={{
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 30,
        }}
      >
        Built by Kabir Goel with support from the app team at Exun Clan.
      </Text>
    </ScrollView>
  </View>
)
