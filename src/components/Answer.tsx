import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeAnswer } from 'redux/sagas/currentgame/actions';
import { EvenOdd } from 'database/gameanswer';

import { BlockHeader, Block, Button, List, ListItem, Stepper } from 'framework7-react';

const connector = connect(null, { makeAnswer });
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Компонент для угадывания чёт-нечет и ввод нового числа с кнопкой «Отправить»
 */
function Answer ({makeAnswer}: PropsFromRedux) {
    const [evenodd, setIsEven] = useState(EvenOdd.Even);
    const [number, setNumber] = useState(0);

    return (
        <>
        <BlockHeader>Угадайте четное или нечетное число загадал предыдущий участник:</BlockHeader>
        <List>
            <ListItem radio value={EvenOdd.Even} name="demo-radio" title="Чётное" onChange={(e)=>{setIsEven(EvenOdd.Even)}} defaultChecked />
            <ListItem radio value={EvenOdd.Odd} name="demo-radio" title="Нечётное" onChange={(e)=>{setIsEven(EvenOdd.Odd)}} />
        </List>
        <BlockHeader>Загадайте своё число для следующего игрока:</BlockHeader>
        <Block className="text-align-center">
          <Stepper fill value={number} onStepperChange={(value)=>setNumber(value)}></Stepper>
        </Block>
        <Block>
           <Button fill onClick={()=>makeAnswer(evenodd, number)}>Отправить</Button>
        </Block>
        </>
    )
}

export default connector(Answer)