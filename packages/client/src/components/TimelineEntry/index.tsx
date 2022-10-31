import styled, { css } from 'styled-components'
import moment from 'moment'

import { getEntryImage } from '../../services/timeline'
import { Entry } from '../../services/timeline/types'
import FeedLogo from '../FeedLogo'

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    padding: 4px 10px;

    &:hover {
      cursor: pointer;
      background-color: ${colors.gainsboro};
    }
  `
)

const Logo = styled.div`
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Image = styled.div`
  font-size: 22px;
  margin: 0 0 0 10px;
`

const Label = styled.div`
  flex-grow: 1;
  margin: 0 0 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Value = styled.div`
  margin: 0 0 0 5px;
  flex-shrink: 0;
`

interface Props {
  entry: Entry
  onClick: () => void
}

const TimelineEntry = ({ entry, onClick }: Props) => {
  const image = getEntryImage(entry)

  return (
    <Wrapper onClick={onClick}>
      <Logo>
        <FeedLogo name={entry.feed} />
      </Logo>
      <Time>{moment.unix(entry.timeStart).format('h:mm a')}</Time>
      <Image>{image}</Image>
      <Label>{entry.title}</Label>
      <Value>{entry.valueLabel}</Value>
    </Wrapper>
  )
}

export default TimelineEntry
