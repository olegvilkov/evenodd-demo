import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { subscribeToGame, unSubscribeFromGame } from 'redux/sagas/currentgame/actions';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { selectUser } from 'redux/reducers/user/selector';
import { IGameState } from 'redux/reducers/currentgame/types';
import { IUserState } from 'redux/reducers/user/types';

import { Navbar, NavRight, Link, Icon } from 'framework7-react';

const mapState = (state: IGameState & IUserState) => ({
    user: selectUser(state),
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
 * и информации о текущей игре
 * и о теущем пользователе
 */
function GameNavbar ({
    backLink=false,
    title,
    gameId="",
    game,
    user,
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
    let avatar;

    // Информация об игре
    if (gameId) {
        subtitle = game.name ?
            `${game.name} (${game.playersCount}/${game.playersForStart})`
            :
            'Загрузка данных об игре...';
    }

    // Информация о текущем пользователе
    if (user.name) {
        const nameWorlds = user.name.split(' ');
        if (nameWorlds.length >= 2) {
            avatar = nameWorlds[0].substring(0, 1) + nameWorlds[1].substring(0, 1);
            avatar = avatar.toLocaleUpperCase();
        } else {
            avatar = user.name.substring(0, 2)
        }
    }

    return (
        <Navbar title={title} subtitle={subtitle}>
            <NavRight>
                <Link iconOnly tooltip={user.name}>
                    <Icon>
                        {avatar}
                    </Icon>
                </Link>
            </NavRight>
        </Navbar>
    )
}

export default connector(GameNavbar);