import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

interface Props {
  text: string
}

const MapPlaceholder = ({ text }: Props) => <Wrapper>{text}</Wrapper>

export default MapPlaceholder
