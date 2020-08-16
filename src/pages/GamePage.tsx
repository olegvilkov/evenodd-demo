import React from 'react';

import { Page, Navbar } from 'framework7-react';
import ScoreList from 'components/ScoreList';
import GameMove from 'components/GameMove';

export default function GamePage () {
    return (
       <Page>
        <Navbar title="Game 1" />
        <GameMove />
        <ScoreList />
       </Page>
    )
}