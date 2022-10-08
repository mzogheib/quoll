import Home from './Home'
import Settings from './Settings'
import OAuth from './OAuth'

export const routesHash = {
  home: {
    path: '/',
    exact: true,
    title: 'Home',
    component: Home,
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  oauth: {
    path: '/oauth',
    title: 'OAuth',
    component: OAuth,
  },
}

const routes = Object.entries(routesHash).map(([id, value]) => ({
  id,
  ...value,
}))

export default routes
