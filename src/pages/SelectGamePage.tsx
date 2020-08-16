import React from 'react'

import { Page, BlockTitle, List, ListItem } from 'framework7-react';

export default function SelectGamePage () {
    return (
       <Page>
         <BlockTitle>Select Game</BlockTitle>
         <List>
            <ListItem title="Game 1" link="#"></ListItem>
            <ListItem title="Game 2" link="#"></ListItem>
            <ListItem title="Game 3" link="#"></ListItem>
         </List>
       </Page>
    )
}