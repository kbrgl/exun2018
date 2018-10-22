import React from 'react'
import type { Node } from 'react'
import { Text, StyleSheet } from 'react-native'
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'

type Props = {
  children: Node,
  style: TextStyleProp,
  props: Object,
}
export default ({ children, style, ...props }: Props) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    color: '#223052',
  },
})
