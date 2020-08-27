import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectUserName } from 'redux/reducers/user/selector';
import { IGameState } from 'redux/reducers/currentgame/types';
import { IUserState } from 'redux/reducers/user/types';

import { f7 } from 'framework7-react';
import { Page, List, ListInput, ListButton } from 'framework7-react';
import GameNavbar from 'components/GameNavbar';

const mapState = (state: IGameState & IUserState) => ({
    currentUsername: selectUserName(state),
});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromNavigation = {gameId: string};

/**
 * Экран "Присоединиться к игре"
 * @todo Добавить логику если игра заполнилась до вступления игрока
 */
function JoinGamePage ({ currentUsername='', gameId=''}: PropsFromRedux & PropsFromNavigation) {

    const [username, setUsername] = useState(currentUsername);

    return (
        <>
        <GameNavbar
            title="Присоединиться к игре"
            backLink={true}
            gameId={gameId}
        />
        <Page loginScreen>
            
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
        </>
    )
}

export default connector(JoinGamePage)