import React from 'react'

import { Page, Toolbar, Link, List, ListItem, Navbar } from 'framework7-react';

import { connect } from 'react-redux'
import { selectGamesList, IGamesState } from 'redux/reducers/gameslist/selector'

/**
 * Экран "Список игр"
 * 
 * Содержит список текущих игр
 * @todo Завершенные игры
 */
function GamesListPage ({ games=[] }: IGamesState) {
    return (
       <Page>
         <Navbar title="Список игр" />
         <Toolbar bottom>
            <Link></Link>
            <Link href="/create">Создать игру</Link>
         </Toolbar>
        <List>
            {games.map(
                game => <ListItem title={game.name} link={`/join/${game.id}`} after={`${game.playersCount}/${game.playersForStart}`} />
            )}
        </List>
       </Page>
    )
}

const mapState = (state: IGamesState) => ({
    games: selectGamesList(state)
})

export default connect(mapState)(GamesListPage)