import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectPlayers } from 'redux/reducers/playerlist/selector';
import { IPlayerListState } from 'redux/reducers/playerlist/types';
import { subscribeToGamePlayers, unSubscribeFromGamePlayers } from 'redux/sagas/playerslist/actions';

import { List, BlockHeader, ListItem } from 'framework7-react';

const mapState = (state: IPlayerListState) => ({
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
function ScoreList ({gameId, players=[], subscribeToGamePlayers, unSubscribeFromGamePlayers}: Props) {

    useEffect(() => {
        subscribeToGamePlayers( gameId );
        return ()=>{ unSubscribeFromGamePlayers() }
    }, []);

    const header = players.length ? 'Текущие очки игроков:' : 'Загрузка списка игроков...';

    return (
        <>
        <BlockHeader>{header}</BlockHeader>
        <List simple-list>
            {players.map(player => (
                <ListItem key={player.id} title={player.name} badge={`${player.points}`}></ListItem>
            ))}
        </List>
        </>
    )
}

export default connector(ScoreList);