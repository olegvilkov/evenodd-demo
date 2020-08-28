import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectUser } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';
import { joinGame } from 'redux/sagas/joingame/actions';

import { Page, List, ListInput, ListButton } from 'framework7-react';
import GameNavbar from 'components/GameNavbar';
import withGameSubscription from 'hoc/GameSubscription';

const mapState = (state: IUserState) => ({
    user: selectUser(state),
});

const connector = connect(mapState, { joinGame });
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromNavigation = {gameId: string};

/**
 * Экран "Присоединиться к игре"
 * @todo Добавить логику если игра заполнилась до вступления игрока
 */
function JoinGamePage ({ gameId, user, joinGame }: PropsFromRedux & PropsFromNavigation) {

    const [username, setUsername] = useState(user.name);

    useEffect(()=> {
        setUsername(user.name);
    }, [user.name]);

    return (
        <>
        <GameNavbar
            title="Присоединиться к игре"
            backLink={true}
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
                <ListButton onClick={()=>{ joinGame(gameId, username) }}>Присоединиться</ListButton>
            </List>
        </Page>
        </>
    )
}

export default connector(
    withGameSubscription(JoinGamePage)
)