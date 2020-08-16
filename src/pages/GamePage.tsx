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
export default function GamePage ({winner='2', waitTurn}: Props) {

    useEffect(() => {        
        f7ready(() => {
            if (waitTurn) {
                f7.dialog.progress('Сейчас не ваш ход');
            } else {
                f7.dialog.close();
            }

            if (winner) {
                f7.dialog.close();
                f7.dialog.alert(`Победитель <b>${winner}</b>`, 'Игра закончена', function () {
                    f7.views.main.router.navigate('/')
                });
            }
        })
    }, [winner])

    return (
       <Page loginScreen>
        <Navbar title="Game 1"/>
        <GameMove />
        <ScoreList />
       </Page>
    )
}