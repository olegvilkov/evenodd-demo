import React from 'react';

import { Page, BlockTitle, List, ListItem } from 'framework7-react';

export default function GamePage () {
    return (
       <Page>
        <BlockTitle>Simple Links List</BlockTitle>
        <List>
            <ListItem title="Link 1" link="#"></ListItem>
            <ListItem title="Link 2" link="#"></ListItem>
            <ListItem title="Link 3" link="#"></ListItem>
        </List>
       </Page>
    )
}