import React from 'react'
import { Image } from 'react-native'
import PageSwiper from './PageSwiper'

const logo = require('../../../assets/images/logo.png')
const directions = require('./images/directions.png')

const ExunLogo = (
  <Image
    style={{
      width: 270,
      height: 110,
    }}
    source={logo}
    defaultSource={logo}
    resizeMode="cover"
  />
)

const Directions = (
  <Image
    style={{
      width: 249,
      height: 249,
    }}
    source={directions}
    defaultSource={directions}
    resizeMode="cover"
  />
)

export default () =>
  PageSwiper([
    {
      figure: ExunLogo,
      heading: 'Welcome.',
      body: 'Use the Exun 2018 app to get the latest updates about Exun 2018.',
    },
    {
      figure: Directions,
      heading: 'Notifications',
      body: "You'll receive notifications when there's a new update, so you don't miss anything.",
    },
  ])
