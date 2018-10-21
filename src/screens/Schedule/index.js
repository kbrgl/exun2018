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
  buttonText: {
    color: '#223052',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule: days[0],
    }
  }

  list: ?SectionList

  render() {
    const { schedule } = this.state
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
                schedule: days[0],
              })
            }}
          >
            <Text style={styles.buttonText}>DAY 1</Text>
          </TouchableOpacity>
          <View
            style={{
              flexBasis: StyleSheet.hairlineWidth,
              backgroundColor: '#eaeaef',
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                schedule: days[1],
              })
            }}
          >
            <Text style={styles.buttonText}>DAY 2</Text>
          </TouchableOpacity>
        </View>
        <SectionList
          renderItem={({ item }) => (
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
                {item.title}
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
                  {item.location}
                </Text>
                &nbsp;&middot;&nbsp;
                <Text
                  style={{
                    color: '#555',
                  }}
                >
                  {item.duration}
                </Text>
              </Text>
            </View>
          )}
          renderSectionHeader={({ section: { time } }) => (
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
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#eaeaef',
              }}
            />
          )}
          sections={schedule}
          ref={list => {
            this.list = list
            return this.list
          }}
          keyExtractor={(item, index) => item.title + index}
        />
      </View>
    )
  }
}
