// @flow
import React, { Component } from 'react'
import type { Node } from 'react'
import { TouchableOpacity, StatusBar, View, Image } from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
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

const Wrapper = styled.View`
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`
const Button = styled.Text`
  background-color: #fff;
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 10px;
  overflow: hidden;
  color: #2977f5;
  font-weight: 800;
`
const Dot = styled.View`
  background-color: #b2d0ff;
  width: 8;
  height: 8;
  border-radius: 4;
  margin-top: 3;
  margin-bottom: 3;
  margin-left: 3;
  margin-right: 3;
`
const ActiveDot = styled(Dot)`
  background-color: #2977f5;
`

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
          StatusBar.setHidden(false)
        }}
      >
        <Button>START</Button>
      </TouchableOpacity>
    )
    return (
      <Wrapper>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {pages.map(
            (page, i) =>
              index === i ? <ActiveDot key={page.heading} /> : <Dot key={page.heading} />,
          )}
        </View>
        {DoneButton}
      </Wrapper>
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
