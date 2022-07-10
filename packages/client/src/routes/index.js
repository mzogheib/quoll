import Home from './Home'
import Settings from './Settings'
import OAuth from './OAuth'

const routes = [
  { path: '/', exact: true, id: 'home', title: 'Home', mainComponent: Home },
  {
    path: '/settings',
    id: 'settings',
    title: 'Settings',
    mainComponent: Settings,
  },
  { path: '/oauth', id: 'oauth', title: 'OAuth', mainComponent: OAuth },
]

export default routes

export const routesHash = routes.reduce((map, route) => {
  map[route.id] = { ...route }
  return map
}, {})
