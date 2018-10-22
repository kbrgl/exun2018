// @flow
import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import Text from '../components/AppText'

const unirely = require('../../assets/images/unirely.png')
const athena = require('../../assets/images/athena.png')
const digitalIndia = require('../../assets/images/digital-india.png')
const logo = require('../../assets/images/logo.png')

class SudocryptHeading extends React.Component {
  constructor(props) {
    super(props)
    this.lastPress = 0
    this.count = 0
  }

  onPress = () => {
    const THRESHOLD = 2000
    const now = new Date().getTime()
    const delta = now - this.lastPress
    if (delta < THRESHOLD) {
      this.count += 1
      if (this.count % 10 === 0) {
        Alert.alert('This is the answer.')
      }
    } else this.count = 1
    this.lastPress = now
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Text
          style={{
            marginLeft: 30,
            marginTop: 30,
            marginBottom: 30,
            fontSize: 25,
            fontWeight: 'bold',
          }}
        >
          Sudocrypt
        </Text>
      </TouchableWithoutFeedback>
    )
  }
}

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
      <SudocryptHeading />
      <Text
        style={{
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        Love the rush of solving puzzles? Relish the thrill of the chase? Adept at figuring out
        enigmatic codes? Join us at Sudocrypt, an online cryptic hunt by Exun. Test your mettle
        against the brightest minds in the country, crack devious tests of lateral thinking, claim
        exciting prizes and the glory of victory!
        {'\n\n'}
      </Text>
      <TouchableOpacity
        onPress={() => {
          const url = 'https://sudocrypt.com'
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url)
            }
          })
        }}
      >
        <Text
          style={{
            marginHorizontal: 30,
            marginBottom: 10,
            color: '#2977f5',
          }}
        >
          Play
        </Text>
      </TouchableOpacity>
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
