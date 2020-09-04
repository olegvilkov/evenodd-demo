import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { selectGamesList } from 'redux/reducers/gameslist/selector';
import { IGamesListState } from 'redux/reducers/gameslist/types';
import { subscribeToGamesList, unSubscribeToGamesList } from 'redux/sagas/gameslist/actions';
import { selectUser } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';

import { Page, Toolbar, Link, List, ListItem, Navbar, BlockTitle, BlockFooter } from 'framework7-react';
import Avatar from 'components/Avatar';

const mapState = (state: IGamesListState & IUserState) => ({
    games: selectGamesList(state),
    user: selectUser(state)
});

const connector = connect(mapState, { subscribeToGamesList, unSubscribeToGamesList });
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Экран "Список игр"
 * 
 * Содержит список текущих игр
  */
function GamesListPage ({ games=[], user, subscribeToGamesList, unSubscribeToGamesList }: PropsFromRedux) {

    const {uid} = user;

    useEffect(() => {
        subscribeToGamesList();
        return ()=>{ unSubscribeToGamesList() }
    }, []);

    const yourTurnGames = games.filter(game =>
            !game.winner
            && game.order.indexOf(uid)===0
        );
    const yourGames = games.filter(game =>
            !game.winner
            && game.order.indexOf(uid)>0
        );
    const joinGames = games.filter(game => 
            !game.winner
            && game.order.indexOf(uid) < 0
            && game.playersCount < game.playersForStart
        );
    const startedGames = games.filter(game =>
            !game.winner
            && game.order.indexOf(uid) < 0
            && game.playersCount == game.playersForStart
        );
    const finishedGames = games.filter(game => game.winner);

    return (
       <Page>
         <Navbar title="Список игр">
             <Avatar />
         </Navbar>
         <Toolbar bottom>
            <Link></Link>
            <Link href="/create">Создать игру</Link>
         </Toolbar>

        <BlockTitle>Текущие игры</BlockTitle>
        <List>
            {yourTurnGames.map(
                game =>
                    <ListItem
                        key={game.id}
                        title={game.name}
                        link={`/game/${game.id}`}
                        after="Ваш ход"
                        footer="Вы в игре"
                    />
            )}
            {yourGames.map(
                game =>
                    <ListItem
                        key={game.id}
                        title={game.name}
                        link={`/game/${game.id}`}
                        after="Ожидание хода"
                        footer="Вы в игре"
                    />
            )}
            {joinGames.map(
                game =>
                    <ListItem
                        key={game.id}
                        title={game.name}
                        link={`/join/${game.id}`}
                        after={`${game.playersCount}/${game.playersForStart}`}
                    />
            )}
            {startedGames.map(
                game =>
                    <ListItem
                        key={game.id}
                        title={game.name}
                        after="Уже началась"
                    />
            )}  
        </List>
        {(!yourTurnGames.length && !yourGames.length) ?
            <BlockFooter>
                <p>Подождите пока кто-то создаст игру или <a href="/create">создайте свою</a>.</p>
            </BlockFooter>
            :
            ! finishedGames.length ? 
                <BlockFooter>
                    Завершенных игр нет.
                </BlockFooter>
                :
                ""
        }

        {finishedGames.length ? 
            <>
            <BlockTitle>Завершенные игры</BlockTitle>
            <List>
                {finishedGames.map(
                    game =>
                        <ListItem
                            key={game.id}
                            title={game.name}
                            after={`Победитель: ${game.winner}`}
                        />
                )}
            </List>
            </>
            :
            ""
        }

       </Page>
    )
}

export default connector(GamesListPage)