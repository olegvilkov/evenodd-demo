import React from 'react';

import { Page, BlockTitle, Block, Button, Navbar, List, ListItem, Stepper } from 'framework7-react';

export default function ScoreList () {
    return (
        <>
        <BlockTitle>Текущие очки игроков</BlockTitle>
        <List simple-list>
            <ListItem title="Player 1" badge="5"></ListItem>
            <ListItem title="Player 2" badge="0"></ListItem>
            <ListItem title="Player 3" badge="0"></ListItem>
        </List>
        </>
    )
}