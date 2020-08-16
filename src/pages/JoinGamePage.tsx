import React, { useState } from 'react';

import { Page, List, Navbar, ListInput, ListButton } from 'framework7-react';

interface Props {
    game: string
}

/**
 * Экран "Присоединиться к игре"
 */
export default function JoinGamePage ({ game='' }: Props) {

    const [username, setUsername] = useState('');

    return (
        <Page loginScreen>
            <Navbar title="Присоединиться к игре" subtitle={game} backLink={true}/>
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
                <ListButton onClick={()=>{}}>Присоединиться</ListButton>
            </List>
        </Page>
    )
}