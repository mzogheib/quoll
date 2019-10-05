import {
  MdClose as Close,
  MdHelp as Help,
  MdMap as Map,
  MdNavigateNext as Next,
  MdNavigateBefore as Previous,
  MdSettings as Settings,
} from 'react-icons/md'

const icons = {
  Close,
  Help,
  Map,
  Next,
  Previous,
  Settings,
}

const Icon = Object.entries(icons).reduce((prev, [name, C]) => {
  // These mutate the imported component, which may not be the best idea
  C.displayName = `Icon.${name}`
  C.defaultProps = {
    size: 40,
  }
  return {
    [name]: C,
    ...prev,
  }
}, {})

export default Icon
