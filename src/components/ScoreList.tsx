import React from 'react';

import { List, BlockHeader, ListItem } from 'framework7-react';

/**
 * Компонент "Текущие очки"
 * 
 * Выводит имена игроков и их текущие очки.
 */
export default function ScoreList () {
    return (
        <>
        <BlockHeader>Текущие очки игроков</BlockHeader>
        <List simple-list>
            <ListItem title="Player 1" badge="5"></ListItem>
            <ListItem title="Player 2" badge="0"></ListItem>
            <ListItem title="Player 3" badge="0"></ListItem>
        </List>
        </>
    )
}