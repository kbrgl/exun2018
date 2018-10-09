// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  children: React.Node,
  padding?: number,
  top?: number,
  bottom?: number,
  left?: number,
  right?: number,
  vertical?: number,
  horizontal?: number,
}

const Padding = ({ children, padding, vertical, horizontal, top, bottom, left, right }: Props) => (
  <View
    style={{
      paddingTop: top || vertical || padding,
      paddingBottom: bottom || vertical || padding,
      paddingLeft: left || horizontal || padding,
      paddingRight: right || horizontal || padding,
    }}
  >
    {children}
  </View>
)
Padding.defaultProps = {
  padding: 20,
  vertical: null,
  horizontal: null,
  top: null,
  bottom: null,
  left: null,
  right: null,
}

export default Padding
