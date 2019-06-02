import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const style = ({ theme: { colors } }) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  background-color: ${colors.matterhorn};
  color: ${colors.mediumAquamarine};
  font-size: 20px;
  font-weight: 500;
`

const Header = {
  ...styled.header([style]),
  displayName: 'Header',
  propTypes: {
    children: PropTypes.string.isRequired,
  },
}

export default Header
