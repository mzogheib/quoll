import Home from './home'
import Settings from './settings'
import OAuth from './oauth'

export default [
  { path: '/', exact: true, id: 'home', title: 'Home', mainComponent: Home },
  {
    path: '/settings',
    id: 'settings',
    title: 'Settings',
    mainComponent: Settings,
  },
  { path: '/oauth', id: 'oauth', title: 'OAuth', mainComponent: OAuth },
]
