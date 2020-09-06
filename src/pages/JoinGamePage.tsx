import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectUserName } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';
import { joinGame } from 'redux/sagas/joingame/actions';

import { Page, List, ListButton } from 'framework7-react';
import GameNavbar from 'components/GameNavbar';
import withGameSubscription from 'hoc/GameSubscription';
import UserNameInput from 'components/UserNameInput';

const mapState = (state: IUserState) => ({
    currentUsername: selectUserName(state),
});

const connector = connect(mapState, { joinGame });
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromNavigation = {gameId: string};

/**
 * Экран "Присоединиться к игре"
 * @todo Добавить логику если игра заполнилась до вступления игрока
 */
function JoinGamePage ({ currentUsername, gameId, joinGame }: PropsFromRedux & PropsFromNavigation) {

    const [username, setUsername] = useState(currentUsername);
    const [usernameIsValid, setUsernameIsValid] = useState( false );
    const [usernameIsTouched, setUsernameIsTouched] = useState( false );

    const onSubmit = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        setUsernameIsTouched(true);
        if (usernameIsValid) {
            joinGame(gameId, username);
        }
    }

    return (
        <>
        <GameNavbar
            title="Присоединиться к игре"
            backLink={true}
        />
        <Page loginScreen>
            
        <UserNameInput
                value={currentUsername}
                touch={usernameIsTouched}
                onSubmit={onSubmit}
                onValidate={setUsernameIsValid}
                onChange={setUsername}
            />

            <List>
                <ListButton onClick={(e)=>onSubmit(e)}>Присоединиться</ListButton>
            </List>
        </Page>
        </>
    )
}

export default connector(
    withGameSubscription(JoinGamePage)
)