import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { IGameState } from 'redux/reducers/currentgame/types';

import { Navbar } from 'framework7-react';
import Avatar from 'components/Avatar';

const mapState = (state: IGameState) => ({
    game: selectCurrentGame(state),
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = {
        title: string,
        backLink?: boolean,
    } & PropsFromRedux;

/**
 * Компонент для отображения заголовка экрана
 * и информации о текущей игре.
 * А так же информацию о теущем пользователе.
 */
function GameNavbar ({
    backLink=false,
    title,
    game,
}: Props) {

    let subtitle;

    const num2str = (number: number, words: Array<string>) => {
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
    }

    const turns = () => {
        if (game.playersCount != game.playersForStart) {
            return '';
        }

        const turns = Math.max(game.turns, 0);
        
        return `До окончания игры ${turns} ${num2str(turns, ['ход', 'хода', 'ходов'])}.`;
    }

    const players = () => {
        return `(${game.playersCount}/${game.playersForStart})`
    }

    // Информация об игре
    if (game.id) {
        subtitle = game.name ? `${game.name} ${players()} ${turns()}` : 'Загрузка данных об игре...';
    }

    return (
        <Navbar title={title} subtitle={subtitle} backLink={backLink}>
            <Avatar />
        </Navbar>
    )
}

export default connector(GameNavbar);