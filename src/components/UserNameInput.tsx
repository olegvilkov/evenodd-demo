import React, { useState, useEffect } from 'react';
import { joinGame } from 'redux/sagas/joingame/actions';

import { List, ListInput } from 'framework7-react';

interface Props {
    value: string
    touch: boolean
    onSubmit: (e: Event)=>void
    onValidate: (isValid: boolean)=>void
    onChange: (value: string)=>void
}

/**
 * Компонент для ввода имени игрока
 */
export default function UserNameInput ({ value, touch, onSubmit, onValidate, onChange }: Props) {

    const isEmpty = (str: string) => str.trim() ? true : false;
    const [username, setUsername] = useState(value);
    const [usernameIsValid, setUsernameIsValid] = useState( isEmpty(value) );
    const [isTouched, setTouched] = useState(touch);

    useEffect(()=>{
        setUsername(value);
        validateUsername( value );
    }, [value])

    useEffect(()=>{
        setTouched(touch);
    }, [touch])

    const validateUsername = (value: string) => {
        const isValid = isEmpty(value);
        setUsernameIsValid ( isEmpty(value) );
        onValidate(isValid);
    }

    const setAndValidateUsername = (value: string) => {
        setUsername(value);
        validateUsername(value);
        setTouched(true);
        onChange(value);
    }

    return (
        <List form onSubmit={(e)=>onSubmit(e)}>
            <ListInput
            label="Имя"
            type="text"
            placeholder="Имя участника"
            errorMessage="Обязательное поле"
            value={username}
            onInput={(e) => setAndValidateUsername(e.target.value)}
            errorMessageForce={!usernameIsValid && isTouched}
            onBlur={() => setTouched(true)}
            />
        </List>
    )
}