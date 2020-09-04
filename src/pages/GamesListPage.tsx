import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { selectGamesListLoading, selectGamesList } from 'redux/reducers/gameslist/selector';
import { IGamesListState } from 'redux/reducers/gameslist/types';
import { subscribeToGamesList, unSubscribeToGamesList } from 'redux/sagas/gameslist/actions';

import { Page, Toolbar, Link, Navbar, BlockFooter } from 'framework7-react';
import Avatar from 'components/Avatar';
import GamesList from 'components/GamesList';

const mapState = (state: IGamesListState) => ({
    isLoading: selectGamesListLoading(state),
    games: selectGamesList(state),
});

const connector = connect(mapState, { subscribeToGamesList, unSubscribeToGamesList });
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Экран "Список игр"
 * 
 * Содержит список текущих и завершенных игр
 */
function GamesListPage ({ games=[], isLoading=true, subscribeToGamesList, unSubscribeToGamesList }: PropsFromRedux) {

    useEffect(() => {
        subscribeToGamesList();
        return ()=>{ unSubscribeToGamesList() }
    }, []);

    return (
       <Page>
         <Navbar title="Список игр">
             <Avatar />
         </Navbar>
         <Toolbar bottom>
            <Link></Link>
            <Link href="/create">Создать игру</Link>
         </Toolbar>

        {isLoading ? 
          <BlockFooter>
            Загрузка игр...
          </BlockFooter>
         :
         <GamesList games={games} />
        }

       </Page>
    )
}

export default connector(GamesListPage)