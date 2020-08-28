import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IGameState } from 'redux/reducers/currentgame/types';
import withGameSubscription from 'hoc/GameSubscription';

import { f7, f7ready } from 'framework7-react';
import { Page } from 'framework7-react';
import ScoreList from 'components/ScoreList';
import Answer from 'components/Answer';
import GameNavbar from 'components/GameNavbar';

const mapState = (state: IGameState) => ({
    winner: '11',
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
function GamePage ({gameId='', winner, waitTurn=true}: PropsFromRedux & PropsFromNavigation) {

    const redirectPath = '/';

    // Эффект окончания игры
    useEffect(() => {

        if (winner) {
            const winnerDialog = f7.dialog.create({
                title: 'Игра закончена',
                text: `Победитель <b>${winner}</b>`,
                buttons: [
                    {
                        text: 'Ок',
                        close: false,
                        onClick: () => {
                            f7.views.main.router.navigate(redirectPath)
                            winnerDialog.close()
                        }
                    }
                ]
            });

            f7ready(() => {
                f7.dialog.close();
                winnerDialog.open();
            })

            return () => winnerDialog.close();
        }
    }, [winner]);

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
    }, [winner, waitTurn]);

    return (
        <>
        <GameNavbar title='Игра' />
        <Page loginScreen>
            <Answer />
            <ScoreList gameId={gameId}/>
        </Page>
        </>
    )
}

export default connector(
    withGameSubscription(GamePage)
)