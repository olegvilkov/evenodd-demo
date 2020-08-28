import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { subscribeToGame, unSubscribeFromGame } from 'redux/sagas/currentgame/actions';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { IGameState } from 'redux/reducers/currentgame/types';

import { Navbar } from 'framework7-react';
import Avatar from 'components/Avatar';

const mapState = (state: IGameState) => ({
    game: selectCurrentGame(state),
});

const connector = connect(mapState, { subscribeToGame, unSubscribeFromGame });

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = {
        gameId?: string,
        title: string,
        backLink?: boolean,
    } & PropsFromRedux;

/**
 * Компонент для отображения заголовка экрана
 * и информации о текущей игре.
 * А так же информацию о теущем пользователе.
 */
function GameNavbar ({
    backLink=false,
    title,
    gameId="",
    game,
    subscribeToGame,
    unSubscribeFromGame
}: Props) {

    // Эффект прослушивания изменений в текущей игре
    useEffect(() => {
        if (!gameId) {
            return;
        }
        subscribeToGame( gameId );
        return ()=>{ unSubscribeFromGame() }
    }, []);

    let subtitle;

    // Информация об игре
    if (gameId) {
        subtitle = game.name ?
            `${game.name} (${game.playersCount}/${game.playersForStart})`
            :
            'Загрузка данных об игре...';
    }

    return (
        <Navbar title={title} subtitle={subtitle} backLink={backLink}>
            <Avatar />
        </Navbar>
    )
}

export default connector(GameNavbar);