import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { selectUser } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';

import { List, ListItem, BlockTitle, BlockFooter } from 'framework7-react';
import { IGame } from 'redux/reducers/currentgame/types';

const mapState = (state: IUserState) => ({
    user: selectUser(state)
});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = {games: Array<IGame>}

/**
 * Компонент "Список игр"
 * 
 * Выводит игры по порядку:
 * - Игры в которых очередь хода игрока
 * - Игры в которых игрок ожидает свой ход
 * - Игры в которых игрок ожидает присоединение других игроков
 * - Игры к которым игрок может присоединиться
 * - Игры которые уже начались без игрока
 * - Завершенные игры
 */
function GamesListPage ({ games=[], user }: PropsFromRedux & Props) {

    const {uid} = user;

    const yourTurnGames: Array<IGame> = [];;
    const yourGamesWaitTurn: Array<IGame> = [];;
    const yourGamesWaitPlayers: Array<IGame> = [];
    const canJoinGames: Array<IGame> = [];
    const startedGames: Array<IGame> = [];
    const finishedGames: Array<IGame> = [];

    games.map(game => {
        if (game.winner) {
            return finishedGames.push(game)
        }

        const item: ListItem.Props = {
            title: game.name
        }

        const isGameStarted = game.playersCount == game.playersForStart;
        const orderIndex = game.order.indexOf(uid);
        const isUserInGame = orderIndex >= 0;
        const isUserTurn = orderIndex == 0;

        if (isGameStarted) {
            if (isUserTurn) {               
               yourTurnGames.push(game);
            } else if (isUserInGame) {
               yourGamesWaitTurn.push(game);
            } else {
               startedGames.push(game);
            }
        } else {
            if (isUserInGame) {
                yourGamesWaitPlayers.push(game);
            } else {
                canJoinGames.push(game);
            }
        }
    });

    return (
        <>
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
            {yourGamesWaitTurn.map(
                game =>
                    <ListItem
                        key={game.id}
                        title={game.name}
                        link={`/game/${game.id}`}
                        after="Ожидание хода"
                        footer="Вы в игре"
                    />
            )}
            {yourGamesWaitPlayers.map(
                game =>
                    <ListItem
                        key={game.id}
                        title={game.name}
                        link={`/game/${game.id}`}
                        after={`${game.playersCount}/${game.playersForStart}`}
                        footer="Вы в игре"
                    />
            )}
            {canJoinGames.map(
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
        {(!yourTurnGames.length && !yourGamesWaitPlayers.length && !yourGamesWaitTurn.length && !canJoinGames.length) ?
            <BlockFooter>
                <p>Нет игр к которым можно присоединиться. Подождите пока кто-то создаст игру или <a href="/create">создайте свою</a>.</p>
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
        </>
    )
}

export default connector(GamesListPage)