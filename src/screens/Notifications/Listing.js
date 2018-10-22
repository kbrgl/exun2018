// @flow
import React from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import type NotificationType from './NotificationType'
import Text from '../../components/AppText'

const Empty = () => (
  <View
    style={{
      paddingTop: 30,
      paddingBottom: 30,
      alignItems: 'center',
      backgroundColor: '#fff',
    }}
  >
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 200,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#eaeaef',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
        }}
      >
        No new notifications.
      </Text>
    </View>
  </View>
)
type HeaderProps = {
  clearNotifications: Function,
}
const Header = ({ clearNotifications }: HeaderProps) => (
  <LinearGradient
    style={{
      padding: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
    colors={['#f5f8fe', '#fff']}
  >
    <Text
      style={{
        fontSize: 25,
        fontWeight: 'bold',
      }}
    >
      Recent
    </Text>
    <TouchableOpacity onPress={clearNotifications}>
      <View
        style={{
          shadowOffset: {
            width: 0,
            height: 3,
          },
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#eaeaef',
          borderRadius: 50,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
        }}
      >
        <Text
          style={{
            color: '#2977f5',
            fontWeight: 'bold',
            letterSpacing: 1,
          }}
        >
          CLEAR
        </Text>
      </View>
    </TouchableOpacity>
  </LinearGradient>
)
const Footer = () => (
  <LinearGradient
    style={{ paddingTop: 50, paddingBottom: 50, alignItems: 'center' }}
    colors={['#fff', '#f5f8fe']}
  />
)
const Separator = () => (
  <View
    style={{
      height: 1,
    }}
  />
)

const postStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0,
  },
  body: {
    fontSize: 15,
    marginTop: 8,
  },
  container: {
    backgroundColor: '#fff',
    padding: 30,
  },
})

// eslint-disable-next-line camelcase
const Notification = ({ title, body }: NotificationType) => (
  <View style={postStyles.container}>
    <Text style={postStyles.title}>{title}</Text>
    <Text style={postStyles.body}>{body}</Text>
  </View>
)

type ListingProps = {
  notifications: NotificationType[],
  clearNotifications: Function,
}

const Listing = ({ notifications, clearNotifications }: ListingProps) => (
  <FlatList
    style={{
      marginLeft: 15,
      marginRight: 15,
    }}
    ListEmptyComponent={Empty}
    ListHeaderComponent={<Header clearNotifications={clearNotifications} />}
    ListFooterComponent={Footer}
    ItemSeparatorComponent={Separator}
    data={notifications}
    renderItem={({ item }) => <Notification {...item} />}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
  />
)

export default Listing
