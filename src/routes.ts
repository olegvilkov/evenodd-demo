// Import pages components
import SelectGamePage from './pages/SelectGamePage';
import GamePage from './pages/GamePage';
import JoinGamePage from './pages/JoinGamePage';
import CreateGamePage from './pages/CreateGamePage';

export default [
    {
      path: '/',
      component: SelectGamePage,
    },
    {
      path: '/game/:gameid',
      component: GamePage,
    },
    {
      path: '/join/:gameid',
      component: JoinGamePage,
    },
    {
      path: '/create',
      component: CreateGamePage,
    },
];