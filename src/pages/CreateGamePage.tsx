import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createGame } from 'redux/sagas/creategame/actions';
import { selectUserName } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';

import { Page, List, Navbar, ListInput, ListButton } from 'framework7-react';
import Avatar from 'components/Avatar';

const mapState = (state: IUserState) => ({
    currentUsername: selectUserName(state),
});

const connector = connect(mapState, { createGame });
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Экран "Создать игру"
 */
function CreateGamePage ({ currentUsername="", createGame }: PropsFromRedux) {
    const isEmpty = (str: string) => str.trim() ? true : false;
    const [playersForStart, setPlayersForStart] = useState(2);
    const [playersForStartIsValid, setPlayersForStartIsValid] = useState(true);
    const [username, setUsername] = useState(currentUsername);
    const [usernameIsValid, setUsernameIsValid] = useState( isEmpty(currentUsername) );
    const [usernameIsTouched, setUsernameIsTouched] = useState(false);

    useEffect(()=>{
        setUsername(currentUsername);
        validateUsername( currentUsername );
    }, [currentUsername])

    const validateUsername = (username: string) => {
        setUsernameIsValid ( isEmpty(username) );
    }

    const setAndValidateUsername = (value: string) => {
        setUsername(value);
        validateUsername(value);
        setUsernameIsTouched(true);
    }
    
    const submit = (e: Event) => {
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
            <List form onSubmit={(e)=>submit(e)}>
                <ListInput
                label="Количество игроков"
                type="number"
                min={2}
                placeholder="Количество игроков"
                value={playersForStart}
                onValidate={(isValid: boolean) => setPlayersForStartIsValid(isValid)}
                onInput={(e) => setPlayersForStart(e.target.value)}
                errorMessage="Должно быть больше или равно 2"
                required
                validate
                />
            </List>
            <List form onSubmit={(e)=>submit(e)}>
                <ListInput
                label="Имя"
                type="text"
                placeholder="Имя участника"
                errorMessage="Обязательное поле"
                value={username}
                onInput={(e) => setAndValidateUsername(e.target.value)}
                errorMessageForce={!usernameIsValid && usernameIsTouched}
                onBlur={() => setUsernameIsTouched(true)}
                />
            </List>
            <List>
                <ListButton onClick={(e)=>submit(e)}>Создать</ListButton>
            </List>
        </Page>
    )
}

export default connector(CreateGamePage)