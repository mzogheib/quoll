import styled from 'styled-components'
import PropTypes from 'prop-types'

import Flex from '../Flex'

const Header = {
  ...styled(Flex).attrs(({ theme: { colors } }) => ({
    as: 'header',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    bg: colors.matterhorn,
    color: colors.mediumAquamarine,
    fontSize: 20,
    fontWeight: 500,
  }))``,
  displayName: 'Header',
  propTypes: {
    children: PropTypes.string.isRequired,
  },
}

export default Header
