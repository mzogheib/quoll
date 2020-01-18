import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Box, Flex } from '@quoll/ui-components'

const Wrapper = styled(Flex).attrs({ alignItems: 'center' })(
  ({ theme: { colors } }) => css`
    padding: 4px 10px;

    &:hover {
      cursor: pointer;
      background-color: ${colors.gainsboro};
    }
  `
)

const Logo = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'center',
})`
  width: 25px;
  flex-shrink: 0;

  img {
    width: 100%;
  }
`

const Time = styled.div`
  flex-basis: 75px;
  text-align: right;
  flex-shrink: 0;
`

const Image = styled(Box).attrs({ ml: 10 })`
  font-size: 22px;
`

const Label = styled(Box).attrs({ ml: 10 })`
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Value = styled(Box).attrs({ ml: 5 })`
  flex-shrink: 0;
`

const TimelineEntry = ({ entry, onClick }) => (
  <Wrapper onClick={onClick}>
    <Logo>
      <img src={entry.logo} alt="feed logo" />
    </Logo>
    <Time>{moment.unix(entry.timeStart).format('h:mm a')}</Time>
    <Image>{entry.image}</Image>
    <Label>{entry.title}</Label>
    <Value>{entry.valueLabel}</Value>
  </Wrapper>
)

TimelineEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    valueLabel: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    timeStart: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TimelineEntry
