import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createGame } from 'redux/sagas/creategame/actions';
import { selectUserName } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';

import { Page, List, Navbar, ListInput, ListButton } from 'framework7-react';
import Avatar from 'components/Avatar';
import UserNameInput from 'components/UserNameInput';

const mapState = (state: IUserState) => ({
    currentUsername: selectUserName(state),
});

const connector = connect(mapState, { createGame });
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Экран "Создать игру"
 */
function CreateGamePage ({ currentUsername="", createGame }: PropsFromRedux) {
    const [playersForStart, setPlayersForStart] = useState(2);
    const [playersForStartIsValid, setPlayersForStartIsValid] = useState( true );
    const [username, setUsername] = useState(currentUsername);
    const [usernameIsValid, setUsernameIsValid] = useState( false );
    const [usernameIsTouched, setUsernameIsTouched] = useState( false );

    const onSubmit = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        setUsernameIsTouched(true);
        if (playersForStartIsValid && usernameIsValid) {
            createGame(username, playersForStart);
        }
    }

    return (
        <Page loginScreen>
            <Navbar title="Создать игру" backLink={true}>
                <Avatar />
            </Navbar>
            <List form onSubmit={(e)=>onSubmit(e)}>
                <ListInput
                label="Количество игроков"
                type="number"
                min={2}
                placeholder="Количество игроков"
                value={playersForStart}
                onValidate={(isValid: boolean) => setPlayersForStartIsValid(isValid)}
                onInput={(e) => setPlayersForStart(e.target.value*1)}
                errorMessage="Должно быть больше или равно 2"
                required
                validate
                />
            </List>
            <UserNameInput
                value={currentUsername}
                touch={usernameIsTouched}
                onSubmit={onSubmit}
                onValidate={setUsernameIsValid}
                onChange={setUsername}
            />
            <List>
                <ListButton onClick={(e)=>onSubmit(e)}>Создать</ListButton>
            </List>
        </Page>
    )
}

export default connector(CreateGamePage)