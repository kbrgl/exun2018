// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import rhythm from '../../utils/rhythm'

const Fill = styled.View`
  flex: 1;
  align-self: stretch;
`
const Figure = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TextWrapper = styled.View`
  padding: 100px 40px 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Heading = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${rhythm(2)};
  text-align: center;
`
const Body = styled.Text`
  font-size: 17px;
  text-align: center;
`

export type PageDescriptor = {
  figure: Component<{}>,
  heading: string,
  body: string,
}

type PageProps = PageDescriptor
const Page = ({ figure, heading, body }: PageProps) => {
  return (
    <Fill>
      <LinearGradient
        style={{
          paddingTop: 50,
          paddingBottom: 50,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        colors={['#2F4DE1', '#429AFF']}
      >
        {figure}
      </LinearGradient>
      <TextWrapper>
        <Heading>{heading}</Heading>
        <Body>{body}</Body>
      </TextWrapper>
    </Fill>
  )
}

export default Page
