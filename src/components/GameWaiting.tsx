import { useEffect } from 'react';
import { IGame } from 'redux/reducers/currentgame/types';
import { connect, ConnectedProps } from 'react-redux';
import { selectIsWaitTurn } from 'redux/reducers/currentgame/selector';
import { IUserState } from 'redux/reducers/user/types';
import { IPlayerListState } from 'redux/reducers/playerlist/types';

import { f7, f7ready } from 'framework7-react';

const mapState = (state: IPlayerListState & IUserState) => ({
    waitTurn: selectIsWaitTurn(state)
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props {
    game: IGame
}

// selectCurrentTurnPlayer

/**
 * Компонент блокируюший игру при определенных условиях:
 * 1. Пока игра загружается, экран блокируется
 * 2. Пока игроки присоединяются, экран блокируется
 * 3. Пока участник ждёт других игроков, экран блокируется
 */
function GameWaiting ({game, waitTurn=true}: Props & PropsFromRedux) {

    const {playersForStart, playersCount} = game;
    const waitPlayerMessage = `Ожидание присоединения всех игроков (${playersCount}/${playersForStart})`;
    const waitTurnMessage = 'Сейчас не ваш ход';
    const waitGameMessage = 'Подключение к игре';

    // Эфект блокировки игры 
    useEffect(() => {
        const waitGame = game.isLoading;
        const waitPlayer = playersCount < playersForStart;
        const waitMessage = waitGame && waitGameMessage || waitPlayer && waitPlayerMessage || waitTurnMessage;
        const waitDialog = waitGame || waitPlayer || waitTurn;

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
    }, [game, waitTurn]);

    return null;
}

export default connector(GameWaiting)
