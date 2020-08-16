import React from 'react';

import { f7, f7ready } from 'framework7-react';
import { Page, Navbar } from 'framework7-react';
import ScoreList from 'components/ScoreList';
import GameMove from 'components/GameMove';

interface Props {
    winner: string,
    waitTurn: boolean,
}

export default function GamePage ({waitTurn}: Props) {

    f7ready(() => {
        // Пока участник ждёт других игроков, экран блокируется
        if (waitTurn) {
            f7.dialog.progress('Сейчас не ваш ход');
        } else {
            f7.dialog.close();
        }

    });

    return (
       <Page>
        <Navbar title="Game 1" />
        <GameMove />
        <ScoreList />
       </Page>
    )
}