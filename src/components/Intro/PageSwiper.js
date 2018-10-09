// @flow
import React, { Component } from 'react'
import type { Node } from 'react'
import { TouchableOpacity, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import styled from 'styled-components'
import Page from './Page'
import type { PageDescriptor } from './Page'

import { introDone } from '../../actions'

type OverlayProps = {
  show: boolean,
  children: Node,
}
const Overlay = ({ show, children }: OverlayProps) => {
  if (show) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 666,
          display: 'flex',
          alignItems: 'stretch',
          backgroundColor: '#fff',
        }}
      >
        {children}
      </View>
    )
  }
  return null
}

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`
const Button = styled.Text`
  color: #2977f5;
  font-weight: 800;
  padding-left: 50px;
  padding-right: 50px;
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
    const TouchableScroll = ({ children, scrollBy }) => (
      <TouchableOpacity
        onPress={() => {
          if (this.swiper) {
            if ((scrollBy < 0 && index > 0) || (scrollBy > 0 && index < pages.length - 1))
              this.swiper.scrollBy(scrollBy)
          }
        }}
      >
        {children}
      </TouchableOpacity>
    )

    const NextButton = (
      <TouchableScroll scrollBy={1}>
        <Button>NEXT</Button>
      </TouchableScroll>
    )
    const PrevButton = (
      <TouchableScroll scrollBy={-1}>
        <Button
          style={{
            opacity: index > 0 ? 1 : 0,
          }}
        >
          BACK
        </Button>
      </TouchableScroll>
    )
    const DoneButton = (
      <TouchableOpacity
        onPress={async () => {
          complete()
          StatusBar.setHidden(false)
        }}
      >
        <Button>DONE</Button>
      </TouchableOpacity>
    )
    return (
      <Wrapper>
        {PrevButton}
        {pages.map(
          (page, i) =>
            index === i ? <ActiveDot key={page.heading} /> : <Dot key={page.heading} />,
        )}
        {index === pages.length - 1 ? DoneButton : NextButton}
      </Wrapper>
    )
  }

  render() {
    const { done, pages } = this.props
    return (
      <Overlay show={!done}>
        <Swiper
          loop={false}
          buttonWrapperStyle={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0,
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
