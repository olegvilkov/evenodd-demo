import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectUser } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';

import { f7 } from 'framework7-react';
import { Page, List, ListInput, ListButton } from 'framework7-react';
import GameNavbar from 'components/GameNavbar';
import withGameSubscription from 'hoc/GameSubscription';

const mapState = (state: IUserState) => ({
    user: selectUser(state),
});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Экран "Присоединиться к игре"
 * @todo Добавить логику если игра заполнилась до вступления игрока
 */
function JoinGamePage ({ user }: PropsFromRedux) {

    const [username, setUsername] = useState(user.name);

    if (username != user.name) {
        setUsername(user.name);
    }

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
                <ListButton onClick={()=>{ f7.views.main.router.navigate('/game/1') }}>Присоединиться</ListButton>
            </List>
        </Page>
        </>
    )
}

export default connector(
    withGameSubscription(JoinGamePage)
)