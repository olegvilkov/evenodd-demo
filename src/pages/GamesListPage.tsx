import React from 'react'

import { Page, Toolbar, Link, List, ListItem, Navbar } from 'framework7-react';

/**
 * Экран "Список игр"
 * Содержит список текущих игр
 * @todo завершенные игры
 */
export default function GamesListPage () {
    return (
       <Page>
         <Navbar title="Список игр" />
         <Toolbar bottom>
            <Link></Link>
            <Link href="/create">Создать игру</Link>
         </Toolbar>
        <List>
            <ListItem title="Игра от Player1" link="/join/1" after="5/10" />
            <ListItem title="Игра от Player2" link="/join/2" after="5/10" />
            <ListItem title="Игра от Player3" link="/join/3" after="5/10" />
            <ListItem title="Игра от Player4" link="/join/3" after="5/10" />
            <ListItem title="Игра от Player5" link="/join/3" after="5/10" />
        </List>
       </Page>
    )
}