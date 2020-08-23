import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createGame } from 'redux/sagas/creategame/actions';

import { Page, List, Navbar, ListInput, ListButton, Link } from 'framework7-react';

const connector = connect(null, { createGame });
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Экран "Создать игру"
 */
function CreateGamePage ({ createGame }: PropsFromRedux) {
    const [playersForStart, setPlayersForStart] = useState(2);
    const [playersForStartIsValid, setPlayersForStartIsValid] = useState(true);
    const [username, setUsername] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [usernameIsTouched, setUsernameIsTouched] = useState(false);

    const validateUsername = (username: string) => {
        setUsernameIsValid (username.replace(/\s*/, '') ? true : false);
    }

    const setAndValidateUsername = (value: string) => {
        setUsername(value);
        validateUsername(value);
        setUsernameIsTouched(true);
    }
    
    const submit = () => {
        setUsernameIsTouched(true);
        if (playersForStartIsValid && usernameIsValid) {
            createGame(username, playersForStart);
        }
    }

    return (
        <Page loginScreen>
            <Navbar title="Создать игру" backLink={true}/>
            <List form>
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
            <List form>
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
                <ListButton onClick={()=>submit()}>Создать</ListButton>
            </List>
        </Page>
    )
}

export default connector(CreateGamePage)