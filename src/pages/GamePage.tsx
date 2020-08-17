import React, { useEffect, useState } from 'react';

import { f7, f7ready } from 'framework7-react';
import { Page, Navbar } from 'framework7-react';
import ScoreList from 'components/ScoreList';
import GameMove from 'components/GameMove';

interface Props {
    winner: string,
    waitTurn: boolean,
}

/**
 * Экран "Игра"
 * 
 * Пока участник ждёт других игроков, экран блокируется
 * Когда игра закончилась, выводим сообщение, что игра закончена и имя победителя
 */
export default function GamePage ({winner, waitTurn}: Props) {

    const redirectPath = '/';

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
        <Navbar title="Game 1"/>
        <GameMove />
        <ScoreList />
       </Page>
    )
}