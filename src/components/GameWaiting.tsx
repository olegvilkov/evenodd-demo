import { useEffect } from 'react';
import { IGame } from 'redux/reducers/currentgame/types';

import { f7, f7ready } from 'framework7-react';

interface Props {
    game: IGame
}

/**
 * Компонент блокируюший игру при определенных условиях:
 * 1. Пока игра загружается, экран блокируется
 * 2. Пока игроки присоединяются, экран блокируется
 * 3. Пока участник ждёт других игроков, экран блокируется
 */
export default function GameWaiting ({game}: Props) {

    const {playersForStart, playersCount} = game;
    const waitPlayerMessage = `Ожидание присоединения всех игроков (${playersCount}/${playersForStart})`;
    const waitTurnMessage = 'Сейчас не ваш ход';
    const waitGameMessage = 'Подключение к игре';

    // Эфект блокировки игры 
    useEffect(() => {
        const waitGame = game.isLoading;
        const waitPlayer = playersCount < playersForStart;
        const waitMessage = waitGame && waitGameMessage || waitPlayer && waitPlayerMessage || waitTurnMessage;
        const waitDialog = waitGame || waitPlayer || game.waitTurn;

        if (!game.winner) {
            f7ready(() => {
                if (waitDialog) {
                    f7.dialog.progress(waitMessage);
                } else {
                    f7.dialog.close();
                }
            })
        }
        return () => {f7.dialog.close()}
    }, [game]);

    return null;
}