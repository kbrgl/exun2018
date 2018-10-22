// @flow
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from '../AppText'
import rhythm from '../../utils/rhythm'

export type PageDescriptor = {
  heading: string,
  body: string,
}

type PageProps = PageDescriptor
const Page = ({ heading, body }: PageProps) => (
  <View style={styles.fill}>
    <View style={styles.wrapper}>
      <View style={styles.textWrapper}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    alignSelf: 'stretch',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 40,
  },
  textWrapper: {
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: rhythm(2),
    textAlign: 'center',
  },
  body: {
    fontSize: 18,
    textAlign: 'center',
  },
})

export default Page
