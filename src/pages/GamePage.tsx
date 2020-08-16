import React from 'react';

import { Page, BlockTitle, Block, Button, Navbar, List, ListItem, Stepper } from 'framework7-react';
import ScoreList from 'components/ScoreList';

export default function GamePage () {
    return (
       <Page>
        <Navbar title="Game 1" />
        <BlockTitle>Угадайте четное или нечетное число загадал предыдущий участник</BlockTitle>
        <List>
            {/* Additional "radio" prop to enable radio list item */}
            <ListItem radio value="check_1" name="demo-radio" title="Чётное"></ListItem>
            <ListItem radio value="check_2" name="demo-radio" title="Нечётное"></ListItem>
        </List>
        <BlockTitle>Загадайте своё число для следующего игрока</BlockTitle>
        <Block className="text-align-center">
          <Stepper fill></Stepper>
        </Block>
        <Block>
           <Button fill>Отправить</Button>
        </Block>

        <ScoreList/>
       </Page>
    )
}