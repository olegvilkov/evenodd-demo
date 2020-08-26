import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { subscribeToGame, unSubscribeFromGame } from 'redux/sagas/currentgame/actions';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { IGameState } from 'redux/reducers/currentgame/types';

import { f7, f7ready } from 'framework7-react';
import { Page, Navbar } from 'framework7-react';
import ScoreList from 'components/ScoreList';
import Answer from 'components/Answer';

const mapState = (state: IGameState) => ({
    game: selectCurrentGame(state),
});

const connector = connect(mapState, { subscribeToGame, unSubscribeFromGame });

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromNavigation = {gameId: string};
type Props = {winner: string, waitTurn: boolean} & PropsFromRedux & PropsFromNavigation;

/**
 * Экран "Игра"
 * 
 * Пока участник ждёт других игроков, экран блокируется
 * Когда игра закончилась, выводим сообщение, что игра закончена и имя победителя
 */
function GamePage ({game, gameId='', winner, waitTurn, subscribeToGame, unSubscribeFromGame}: Props) {

    const redirectPath = '/';
    const subtitle = game ? `${game.name} (${game.playersCount}/${game.playersForStart})` : '';

    // Эффект прослушивания изменений в текущей игре
    useEffect(() => {
        subscribeToGame( gameId );
        return ()=>{ unSubscribeFromGame() }
    }, []);

    // Эффект окончания игры
    useEffect(() => {
        if (f7.views.main.router.currentRoute.path == redirectPath) {
            return;
        }

        if (winner) {
            const winnerDialog = f7.dialog.create({
                title: 'Игра закончена',
                text: `Победитель <b>${winner}</b>`,
                buttons: [
                    {
                        text: 'Ок',
                        close: false,
                        onClick: () => {f7.views.main.router.navigate(redirectPath)}
                    }
                ]
            });

            f7ready(() => {
                f7.dialog.close();
                winnerDialog.open();
            })

            return () => winnerDialog.close();
        }
    });

    // Эфект блокировки игры
    useEffect(() => {
        if (!winner) {
            f7ready(() => {
                if (waitTurn) {
                    f7.dialog.progress('Сейчас не ваш ход');
                } else {
                    f7.dialog.close();
                }
            })
        }
        return () => {f7.dialog.close()}
    });

    return (
       <Page loginScreen>
        <Navbar title="Game 1" subtitle={subtitle}/>
        <Answer />
        <ScoreList />
       </Page>
    )
}

export default connector(GamePage)