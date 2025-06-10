import Board from '../pages/Board';
import Team from '../pages/Team';
import Settings from '../pages/Settings';

export const routes = {
  board: {
    id: 'board',
    label: 'Board',
    path: '/board',
    icon: 'Kanban',
    component: Board
  },
  team: {
    id: 'team',
    label: 'Team',
    path: '/team',
    icon: 'Users',
    component: Team
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  }
};

export const routeArray = Object.values(routes);