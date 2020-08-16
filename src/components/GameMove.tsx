import React from 'react';

import { BlockHeader, Block, Button, List, ListItem, Stepper } from 'framework7-react';

/**
 * Компонент для угадывания чёт-нечет и ввод нового числа с кнопкой «Отправить»
 */
export default function GameMove () {
    return (
        <>
        <BlockHeader>Угадайте четное или нечетное число загадал предыдущий участник</BlockHeader>
        <List>
            <ListItem radio value="check_1" name="demo-radio" title="Чётное" defaultChecked />
            <ListItem radio value="check_2" name="demo-radio" title="Нечётное" />
        </List>
        <BlockHeader>Загадайте своё число для следующего игрока</BlockHeader>
        <Block className="text-align-center">
          <Stepper fill onStepperChange={()=>{}}></Stepper>
        </Block>
        <Block>
           <Button fill>Отправить</Button>
        </Block>
        </>
    )
}