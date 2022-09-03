import {
  MdClose as Close,
  MdHelp as Help,
  MdMap as Map,
  MdNavigateNext as Next,
  MdNavigateBefore as Previous,
  MdSettings as Settings,
} from 'react-icons/md'
import styled from 'styled-components'

const icons = {
  Close,
  Help,
  Map,
  Next,
  Previous,
  Settings,
}

const Icon = Object.entries(icons).reduce((prev, [name, C]) => {
  const Component = styled(C)`
    display: block;
  `
  Component.displayName = `Icon.${name}`
  Component.defaultProps = { size: 40 }

  return {
    [name]: Component,
    ...prev,
  }
}, {})

export default Icon
