import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IGameState } from 'redux/reducers/currentgame/types';

import { f7, f7ready } from 'framework7-react';
import { Page } from 'framework7-react';
import ScoreList from 'components/ScoreList';
import Answer from 'components/Answer';
import GameNavbar from 'components/GameNavbar';

const mapState = (state: IGameState) => ({
    winner: '',
    waitTurn: false,
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromNavigation = {gameId: string};

/**
 * Экран "Игра"
 * 
 * Пока участник ждёт других игроков, экран блокируется
 * Когда игра закончилась, выводим сообщение, что игра закончена и имя победителя
 */
function GamePage ({gameId='', winner, waitTurn}: PropsFromRedux & PropsFromNavigation) {

    const redirectPath = '/';

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
        <>
        <GameNavbar title='Игра' gameId={gameId} />
        <Page loginScreen>
            <Answer />
            <ScoreList gameId={gameId}/>
        </Page>
        </>
    )
}

export default connector(GamePage)