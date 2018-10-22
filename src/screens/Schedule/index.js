// @flow
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, SectionList } from 'react-native'

import days from './schedule'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonTextWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eaeaef',
  },
  buttonText: {
    color: '#223052',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})

type EventProps = {
  title: string,
  location: string,
  duration: string,
}
const Event = ({ title, location, duration }: EventProps) => (
  <View
    style={{
      padding: 20,
      backgroundColor: '#fff',
    }}
  >
    <Text
      style={{
        fontSize: 18,
        color: '#223052',
        marginBottom: 8,
      }}
    >
      {title}
    </Text>
    <Text
      style={{
        fontSize: 15,
      }}
    >
      <Text
        style={{
          color: '#34ab50',
        }}
      >
        {location}
      </Text>
      &nbsp;&middot;&nbsp;
      <Text
        style={{
          color: '#555',
        }}
      >
        {duration}
      </Text>
    </Text>
  </View>
)

type SectionProps = {
  time: string,
}
const Section = ({ time }: SectionProps) => (
  <View
    style={{
      padding: 10,
      backgroundColor: '#f5f8fe',
    }}
  >
    <Text
      style={{
        color: '#223052',
        fontWeight: 'bold',
      }}
    >
      {time}
    </Text>
  </View>
)

const Separator = () => (
  <View
    style={{
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#eaeaef',
    }}
  />
)

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: 1,
    }
  }

  list: ?SectionList

  render() {
    const { day } = this.state
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 50,
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#eaeaef',
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                day: 1,
              })
            }}
          >
            <View style={day === 1 ? styles.buttonTextWrapper : null}>
              <Text style={styles.buttonText}>DAY 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                day: 2,
              })
            }}
          >
            <View style={day === 2 ? styles.buttonTextWrapper : null}>
              <Text style={styles.buttonText}>DAY 2</Text>
            </View>
          </TouchableOpacity>
        </View>
        <SectionList
          renderItem={({ item }) => <Event {...item} />}
          renderSectionHeader={({ section }) => <Section {...section} />}
          ItemSeparatorComponent={Separator}
          sections={days[day - 1]}
          keyExtractor={(item, index) => item.title + index}
        />
      </View>
    )
  }
}
