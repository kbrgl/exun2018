// @flow
import React from 'react'
import { FlatList, StyleSheet, Text, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import Markdown from 'react-native-simple-markdown'
import { iOSUIKit } from 'react-native-typography'
import LinearGradient from 'react-native-linear-gradient'

import Padding from '../../components/Padding'

import { postsRefresh } from '../../actions'

const formatDate = s => {
  const d = new Date(s)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${d.toLocaleTimeString(
    'en-us',
  )}`
}

type PostType = {
  title: string,
  body: string,
  created_at: string,
}

const Header = () => (
  <LinearGradient
    style={{ paddingTop: 50, paddingBottom: 50, alignItems: 'center' }}
    colors={['#f5f8fe', '#fff']}
  >
    <Text
      style={{
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#223052',
      }}
    >
      Here&apos;s what&apos;s new at
      {'\n'}
      Exun 2018.
    </Text>
  </LinearGradient>
)
const Footer = () => (
  <LinearGradient
    style={{ paddingTop: 50, paddingBottom: 50, alignItems: 'center' }}
    colors={['#fff', '#f5f8fe']}
  >
    <Text
      style={{
        textAlign: 'center',
        color: '#223052',
      }}
    >
      That&apos;s all for now!
    </Text>
  </LinearGradient>
)

const postStyles = StyleSheet.create({
  title: {
    marginBottom: 8,
    letterSpacing: 0,
    color: '#223052',
  },
  dateWrapper: {
    paddingTop: 10,
    marginTop: 10,
  },
  date: {
    color: '#ccc',
  },
  body: {
    marginTop: 8,
    color: '#223052',
  },
  container: {
    backgroundColor: '#fff',
  },
})

// eslint-disable-next-line camelcase
const Post = ({ title, body, created_at }: PostType) => (
  <View style={postStyles.container}>
    <Padding vertical={30} horizontal={30}>
      <Text style={[iOSUIKit.largeTitleEmphasized, postStyles.title]}>{title}</Text>
      <Markdown
        styles={{
          text: postStyles.body,
          inlineCode: {
            backgroundColor: '#fff',
            borderWidth: 0,
            paddingTop: 3,
            paddingBottom: 3,
            paddingRight: 5,
            paddingLeft: 5,
            borderRadius: 4,
            fontFamily: Platform.OS === 'android' ? 'Roboto Mono' : 'Menlo',
          },
          listItem: {
            alignItems: 'flex-start',
            marginBottom: 20,
          },
        }}
      >
        {body}
      </Markdown>
      <View style={postStyles.dateWrapper}>
        <Text style={postStyles.date}>{formatDate(created_at)}</Text>
      </View>
    </Padding>
  </View>
)

type ListingProps = {
  refresh: Function,
  posts: PostType[],
  refreshing: boolean,
}

const Listing = ({ posts, refreshing, refresh }: ListingProps) => (
  <FlatList
    style={{
      marginLeft: 15,
      marginRight: 15,
    }}
    ListHeaderComponent={Header}
    ListFooterComponent={Footer}
    data={posts}
    renderItem={({ item }) => <Post {...item} />}
    keyExtractor={item => item.title}
    refreshing={refreshing}
    onRefresh={refresh}
    showsVerticalScrollIndicator={false}
  />
)

const mapStateToProps = state => ({
  posts: state.posts,
  refreshing: state.listing.refreshing,
})
const mapDispatchToProps = dispatch => ({
  refresh: () => {
    dispatch(postsRefresh())
  },
})

const ConnectedListing = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listing)

export default ConnectedListing
