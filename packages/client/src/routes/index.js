import Home from './Home'
import Settings from './Settings'
import OAuth from './OAuth'

const routes = [
  { path: '/', exact: true, id: 'home', title: 'Home', component: Home },
  { path: '/settings', id: 'settings', title: 'Settings', component: Settings },
  { path: '/oauth', id: 'oauth', title: 'OAuth', component: OAuth },
]

export default routes

export const routesHash = routes.reduce((map, route) => {
  map[route.id] = { ...route }
  return map
}, {})
