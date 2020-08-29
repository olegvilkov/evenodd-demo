import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IGameState } from 'redux/reducers/currentgame/types';
import withGameSubscription from 'hoc/GameSubscription';

import { Page } from 'framework7-react';
import ScoreList from 'components/ScoreList';
import Answer from 'components/Answer';
import GameNavbar from 'components/GameNavbar';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import GameWaiting from 'components/GameWaiting';
import GameWinner from 'components/GameWinner';

const mapState = (state: IGameState) => ({
    game: selectCurrentGame(state)
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
function GamePage ({gameId='', game}: PropsFromRedux & PropsFromNavigation) {
    return (
        <>
        <GameWaiting game={game} />
        <GameWinner game={game} />
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