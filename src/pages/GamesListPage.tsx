import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { selectGamesList } from 'redux/reducers/gameslist/selector';
import { IGamesListState } from 'redux/reducers/gameslist/types';
import { subscribeToGamesList, unSubscribeToGamesList } from 'redux/sagas/gameslist/actions';

import { Page, Toolbar, Link, List, ListItem } from 'framework7-react';
import GameNavbar from 'components/GameNavbar';

const mapState = (state: IGamesListState) => ({
    games: selectGamesList(state)
});

const connector = connect(mapState, { subscribeToGamesList, unSubscribeToGamesList });
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Экран "Список игр"
 * 
 * Содержит список текущих игр
 * @todo Завершенные игры
 */
function GamesListPage ({ games=[], subscribeToGamesList, unSubscribeToGamesList }: PropsFromRedux) {

    useEffect(() => {
        subscribeToGamesList();
        return ()=>{ unSubscribeToGamesList() }
    }, []);

    return (
       <Page>
         <GameNavbar title="Список игр" />
         <Toolbar bottom>
            <Link></Link>
            <Link href="/create">Создать игру</Link>
         </Toolbar>
        <List>
            {games.map(
                game => <ListItem key={game.id} title={game.name} link={`/join/${game.id}`} after={`${game.playersCount}/${game.playersForStart}`} />
            )}
        </List>
       </Page>
    )
}

export default connector(GamesListPage)