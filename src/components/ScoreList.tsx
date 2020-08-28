import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectPlayers } from 'redux/reducers/playerlist/selector';
import { IPlayerListState } from 'redux/reducers/playerlist/types';
import { selectUser } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';
import { subscribeToGamePlayers, unSubscribeFromGamePlayers } from 'redux/sagas/playerslist/actions';

import { List, BlockHeader, ListItem } from 'framework7-react';

const mapState = (state: IPlayerListState & IUserState) => ({
    user: selectUser(state),
    players: selectPlayers(state),
});

const connector = connect(mapState, { subscribeToGamePlayers, unSubscribeFromGamePlayers });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = { gameId: string } & PropsFromRedux;

/**
 * Компонент "Текущие очки"
 * 
 * Выводит имена игроков и их текущие очки.
 */
function ScoreList ({gameId, user, players, subscribeToGamePlayers, unSubscribeFromGamePlayers}: Props) {

    useEffect(() => {
        subscribeToGamePlayers( gameId );
        return ()=>{ unSubscribeFromGamePlayers() }
    }, []);

    const header = players.length ? 'Текущие очки игроков:' : 'Загрузка списка игроков...';

    return (
        <>
        <BlockHeader>{header}</BlockHeader>
        <List simple-list>
            {players.map(player => {
                const footer = player.id == user.uid ? 'Это ваши очки' : '';
                return <ListItem footer={footer} key={player.id} title={player.name} badge={`${player.points}`} />
            })}
        </List>
        </>
    )
}

export default connector(ScoreList);