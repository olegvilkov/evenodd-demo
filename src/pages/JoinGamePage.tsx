import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { subscribeToGame, unSubscribeFromGame } from 'redux/sagas/currentgame/actions';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { selectUserName } from 'redux/reducers/user/selector';
import { IGameState } from 'redux/reducers/currentgame/types';
import { IUserState } from 'redux/reducers/user/types';

import { f7 } from 'framework7-react';
import { Page, List, Navbar, ListInput, ListButton } from 'framework7-react';

const mapState = (state: IGameState & IUserState) => ({
    currentUsername: selectUserName(state),
    game: selectCurrentGame(state),
});

const connector = connect(mapState, { subscribeToGame, unSubscribeFromGame });
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromNavigation = {gameId: string};

/**
 * Экран "Присоединиться к игре"
 * @todo Добавить логику если игра заполнилась до вступления игрока
 */
function JoinGamePage ({ currentUsername='', game, gameId='', subscribeToGame, unSubscribeFromGame }: PropsFromRedux & PropsFromNavigation) {

    useEffect(() => {
        subscribeToGame( gameId );
        return ()=>{ unSubscribeFromGame() }
    }, []);

    const [username, setUsername] = useState(currentUsername);

    const subtitle = game ? `${game.name} (${game.playersCount}/${game.playersForStart})` : '';

    return (
        <Page loginScreen>
            <Navbar
                title="Присоединиться к игре"
                subtitle={subtitle}
                backLink={true}
            />
            <List form>
                <ListInput
                label="Имя"
                type="text"
                placeholder="Имя участника"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
                />
            </List>
            <List>
                <ListButton onClick={()=>{ f7.views.main.router.navigate('/game/1') }}>Присоединиться</ListButton>
            </List>
        </Page>
    )
}

export default connector(JoinGamePage)