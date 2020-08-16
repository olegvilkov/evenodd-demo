// Import pages components
import SelectGamePage from './pages/SelectGamePage';
import GamePage from './pages/GamePage';
// import LoginPage from 'login.jsx';

export default [
    {
      path: '/',
      component: SelectGamePage,
    },
    {
      path: '/game/:gameid',
      component: GamePage,
    },
];