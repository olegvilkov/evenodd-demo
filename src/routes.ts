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