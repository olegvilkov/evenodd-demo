// Import pages components
import GamesListPage from './pages/GamesListPage';
import GamePage from './pages/GamePage';
import JoinGamePage from './pages/JoinGamePage';
import CreateGamePage from './pages/CreateGamePage';

export default [
    {
      path: '/',
      component: GamesListPage,
    },
    {
      path: '/game/:gameId',
      component: GamePage,
    },
    {
      path: '/join/:gameId',
      component: JoinGamePage,
    },
    {
      path: '/create',
      component: CreateGamePage,
    },
];