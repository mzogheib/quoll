import styled, { css } from 'styled-components'

import routes from '../../../routes'

export const routesHash = routes.reduce((map, route) => {
  map[route.id] = { ...route }
  return map
}, {})

export const IconWrapper = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.mediumAquamarine};
  `
)
