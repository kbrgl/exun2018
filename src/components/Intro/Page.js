// @flow
import React from 'react'
import styled from 'styled-components'
import rhythm from '../../utils/rhythm'

const Fill = styled.View`
  flex: 1;
  align-self: stretch;
`
const Wrapper = styled.View`
  flex: 1;
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
`
const TextWrapper = styled.View`
  display: flex;
  justify-content: center;
`
const Heading = styled.Text`
  color: #223052;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: ${rhythm(2)};
  text-align: center;
`
const Body = styled.Text`
  color: #223052;
  font-size: 18px;
  text-align: center;
`

export type PageDescriptor = {
  heading: string,
  body: string,
}

type PageProps = PageDescriptor
const Page = ({ heading, body }: PageProps) => (
  <Fill>
    <Wrapper>
      <TextWrapper>
        <Heading>{heading}</Heading>
        <Body>{body}</Body>
      </TextWrapper>
    </Wrapper>
  </Fill>
)

export default Page
