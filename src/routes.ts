// Import pages components
import SelectGamePage from './pages/SelectGamePage';
import GamePage from './pages/GamePage';
import JoinGamePage from './pages/JoinGamePage';

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
];