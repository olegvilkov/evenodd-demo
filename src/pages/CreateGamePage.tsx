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
    const [username, setUsername] = useState('');
    
    return (
        <Page loginScreen>
            <Navbar title="Создать игру" backLink={true}/>
            <List form>
                <Link href={false} color="red">Simple List</Link>
                <ListInput
                label="Количество игроков"
                type="number"
                min={2}
                placeholder="Количество игроков"
                value={playersForStart}
                onBlur={(e) => setPlayersForStart(Math.max(2, playersForStart))}
                onInput={(e) => setPlayersForStart(e.target.value)}
                errorMessage="test"
                errorMessageForce
                />
            </List>
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
                <ListButton onClick={()=>{createGame(username, playersForStart)}}>Создать</ListButton>
            </List>
        </Page>
    )
}

export default connector(CreateGamePage)