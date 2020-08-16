import React from 'react';

import { BlockTitle, Block, Button, List, ListItem, Stepper } from 'framework7-react';

export default function GameMove () {
    return (
        <>
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
        </>
    )
}