// @flow
import React, { Component } from 'react'
import type { Node } from 'react'
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'
import Text from '../AppText'
import Page from './Page'
import type { PageDescriptor } from './Page'

import { introDone } from '../../actions'

const logo = require('../../../assets/images/logo.png')

type OverlayProps = {
  show: boolean,
  children: Node,
}
const Overlay = ({ show, children }: OverlayProps) => {
  if (show) {
    return (
      <LinearGradient
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 666,
          display: 'flex',
          alignItems: 'stretch',
        }}
        colors={['#fff', '#f5f8fe']}
      >
        {children}
      </LinearGradient>
    )
  }
  return null
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  buttonText: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#2977f5',
    fontWeight: '800',
  },
  dot: {
    backgroundColor: '#b2d0ff',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#2977f5',
  },
})

type PageSwiperProps = {
  pages: PageDescriptor[],
  done: boolean,
  complete: Function,
}
type PageSwiperState = {
  index: number,
}
class PageSwiper extends Component<PageSwiperProps, PageSwiperState> {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
    }
  }

  swiper: ?Swiper

  renderPagination = () => {
    const { index } = this.state
    const { pages, complete } = this.props
    const DoneButton = (
      <TouchableOpacity
        onPress={async () => {
          complete()
        }}
      >
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    )
    return (
      <View style={styles.wrapper}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {pages.map((page, i) => (
            <View key={page.heading} style={[styles.dot, index === i ? styles.activeDot : null]} />
          ))}
        </View>
        {DoneButton}
      </View>
    )
  }

  render() {
    const { done, pages } = this.props
    return (
      <Overlay show={!done}>
        <View
          style={{
            flex: 5 / 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              width: 162,
              height: 66,
            }}
            source={logo}
            defaultSource={logo}
            resizeMode="cover"
          />
        </View>
        <Swiper
          loop={false}
          showsButtons
          buttonWrapperStyle={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            flex: 1,
            paddingHorizontal: 50,
            paddingVertical: 40,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
          renderPagination={this.renderPagination}
          onIndexChanged={index => this.setState({ index })}
          ref={swiper => {
            this.swiper = swiper
            return this.swiper
          }}
          loadMinimal
          loadMinimalSize={1}
          bounces
        >
          {pages.map(page => (
            <Page key={page.heading} {...page} />
          ))}
        </Swiper>
      </Overlay>
    )
  }
}

const mapStateToProps = state => ({
  done: state.introDone,
})
const mapDispatchToProps = dispatch => ({
  complete: () => {
    dispatch(introDone())
  },
})

const ConnectedPageSwiper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSwiper)

export default (pages: PageDescriptor[]) => <ConnectedPageSwiper pages={pages} />
