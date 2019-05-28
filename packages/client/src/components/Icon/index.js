import Close from 'react-icons/lib/md/close'
import Help from 'react-icons/lib/md/help-outline'
import Map from 'react-icons/lib/md/map'
import Next from 'react-icons/lib/md/navigate-next'
import Previous from 'react-icons/lib/md/navigate-before'
import Settings from 'react-icons/lib/md/settings'

const icons = {
  Close,
  Help,
  Map,
  Next,
  Previous,
  Settings,
}

const Icon = Object.entries(icons).reduce((prev, [name, C]) => {
  // This updates the displayName on the imported component, which may not
  // be the best idea
  C.displayName = `Icon.${name}`
  return {
    [name]: C,
    ...prev,
  }
}, {})

export default Icon
