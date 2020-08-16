import React from 'react'

import { Page, BlockTitle, List, ListItem, Navbar } from 'framework7-react';

export default function SelectGamePage () {
    return (
       <Page>
         <Navbar title="Список игр" />
         <List>
            <ListItem title="Game 1" link="/game/1" after="5/10"></ListItem>
            <ListItem title="Game 2" link="/game/2" after="5/10"></ListItem>
            <ListItem title="Game 3" link="/game/3" after="5/10"></ListItem>
         </List>
       </Page>
    )
}