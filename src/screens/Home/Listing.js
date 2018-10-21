// @flow
import React from 'react'
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { iOSUIKit } from 'react-native-typography'
import LinearGradient from 'react-native-linear-gradient'
import { format } from 'date-fns'

import { postsRefresh } from '../../actions'

type PostType = {
  title: string,
  body: string,
  created_at: string,
}

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
        borderWidth: 1,
        borderColor: '#eaeaef',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          color: '#223052',
          fontWeight: 'bold',
        }}
      >
        Pull to refresh!
      </Text>
    </View>
  </View>
)
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
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 3,
        color: '#223052',
      }}
    >
      &middot;&middot;&middot;
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
    fontSize: 15,
    marginTop: 8,
    color: '#223052',
  },
  container: {
    backgroundColor: '#fff',
    padding: 30,
  },
})

// eslint-disable-next-line camelcase
const Post = ({ title, body, created_at }: PostType) => (
  <View style={postStyles.container}>
    <Text style={[iOSUIKit.largeTitleEmphasized, postStyles.title]}>{title}</Text>
    <Text style={postStyles.body}>{body}</Text>
    <View style={postStyles.dateWrapper}>
      <Text style={postStyles.date}>{format(created_at, 'd MMM yyyy, hh:mm:ss')}</Text>
    </View>
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
    ListEmptyComponent={Empty}
    ListHeaderComponent={Header}
    ListFooterComponent={Footer}
    data={posts}
    renderItem={({ item }) => <Post {...item} />}
    keyExtractor={item => item.title}
    refreshControl={
      <RefreshControl
        colors={['#fff']}
        refreshing={refreshing}
        onRefresh={refresh}
        progressBackgroundColor="#2977f5"
      />
    }
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
