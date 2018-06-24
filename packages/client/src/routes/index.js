import Home from './home';
import Settings from './settings';

export default [
  { path: '/', exact: true, id: 'home', title: 'Home', mainComponent: Home },
  { path: '/settings', id: 'settings', title: 'Settings', mainComponent: Settings },
];