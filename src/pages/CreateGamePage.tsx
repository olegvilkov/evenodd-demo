import React, { useState } from 'react';

import { Page, List, Navbar, ListInput, ListButton } from 'framework7-react';

/**
 * Экран "Создать игру"
 */
export default function CreateGamePage () {
    const [playersCount, setPlayersCount] = useState(2);
    const [username, setUsername] = useState('');

    return (
        <Page loginScreen>
            <Navbar title="Создать игру" backLink={true}/>
            <List form>
                <ListInput
                label="Количество игроков"
                type="number"
                min={2}
                placeholder="Количество игроков"
                value={playersCount}
                onBlur={(e) => setPlayersCount(Math.max(2, playersCount))}
                onInput={(e) => setPlayersCount(e.target.value)}
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
                <ListButton onClick={()=>{}}>Создать</ListButton>
            </List>
        </Page>
    )
}