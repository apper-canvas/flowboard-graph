import BoardPage from '@/components/pages/BoardPage';
import TeamPage from '@/components/pages/TeamPage';
import SettingsPage from '@/components/pages/SettingsPage';

export const routes = {
  board: {
    id: 'board',
    label: 'Board',
    path: '/board',
    icon: 'Kanban',
component: BoardPage
  },
  team: {
    id: 'team',
    label: 'Team',
    path: '/team',
    icon: 'Users',
component: TeamPage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
component: SettingsPage
  }
};

export const routeArray = Object.values(routes);