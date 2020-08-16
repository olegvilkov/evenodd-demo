import React from 'react';

import { BlockTitle, BlockHeader, Block, Button, List, ListItem, Stepper } from 'framework7-react';

export default function GameMove () {
    return (
        <>
        <BlockTitle>Угадайте четное или нечетное число загадал предыдущий участник</BlockTitle>
        <BlockHeader>Icon in the beginning of the list item</BlockHeader>
        <List>
            <ListItem radio value="check_1" name="demo-radio" title="Чётное" defaultChecked />
            <ListItem radio value="check_2" name="demo-radio" title="Нечётное" />
        </List>
        <BlockTitle>Загадайте своё число для следующего игрока</BlockTitle>
        <Block className="text-align-center">
          <Stepper fill onStepperChange={()=>{}}></Stepper>
        </Block>
        <Block>
           <Button fill>Отправить</Button>
        </Block>
        </>
    )
}