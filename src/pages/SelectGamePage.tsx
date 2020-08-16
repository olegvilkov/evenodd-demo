import React from 'react'

import { Page, Block, Toolbar, Link, List, ListItem, Navbar } from 'framework7-react';

/**
 * Экран "Список игр"
 * Содержит список текущих игр
 * @todo завершенные игры
 */
export default function SelectGamePage () {
    return (
       <Page>
         <Navbar title="Список игр" />
         <Toolbar bottom>
            <Link></Link>
            <Link href="/create">Создать игру</Link>
         </Toolbar>
        <List>
            <ListItem title="Game 1" link="/join/1" after="5/10"></ListItem>
            <ListItem title="Game 2" link="/join/2" after="5/10"></ListItem>
            <ListItem title="Game 3" link="/join/3" after="5/10"></ListItem>
            <ListItem title="Game 3" link="/join/3" after="5/10"></ListItem>
            <ListItem title="Game 3" link="/join/3" after="5/10"></ListItem>
        </List>
       </Page>
    )
}