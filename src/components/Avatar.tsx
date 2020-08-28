import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectUser } from 'redux/reducers/user/selector';
import { IUserState } from 'redux/reducers/user/types';

import { NavRight, Link, Icon } from 'framework7-react';

const mapState = (state: IUserState) => ({
    user: selectUser(state),
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Компонент для отображения информации о теущем пользователе
 */
function Avatar ({
    user,
}: PropsFromRedux) {

    let avatar;
    let tooltip;

    // Информация о текущем пользователе
    if (user.name) {
        const nameWorlds = user.name.split(' ');
        if (nameWorlds.length >= 2) {
            avatar = nameWorlds[0].substring(0, 1) + nameWorlds[1].substring(0, 1);
            avatar = avatar.toLocaleUpperCase();
        } else {
            avatar = user.name.substring(0, 2)
        }
        tooltip = `Вы авторизованы как ${user.name}`;
    }

    return (
        <NavRight>
            <Link iconOnly tooltip={tooltip}>
                <Icon>
                    {avatar}
                </Icon>
            </Link>
        </NavRight>
    )
}

export default connector(Avatar);