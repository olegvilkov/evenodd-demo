import { useEffect } from 'react';
import { IGame } from 'redux/reducers/currentgame/types';

import { f7, f7ready } from 'framework7-react';

interface Props {
    game: IGame
}

/**
 * Компонент демонстрирующий победителя игры после окончания игры
 */
export default function GameWinner ({game}: Props) {

    const {winner} = game;
    const redirectPath = '/';

    // Эффект окончания игры
    useEffect(() => {
        if (winner) {
            const winnerDialog = f7.dialog.create({
                title: 'Игра закончена',
                text: `Победитель <b>${winner}</b>`,
                buttons: [
                    {
                        text: 'Ок',
                        close: false,
                        onClick: () => {
                            f7.views.main.router.back(redirectPath);
                            winnerDialog.close()
                        }
                    }
                ]
            });

            f7ready(() => {
                f7.dialog.close();
                winnerDialog.open();
            })

            return () => winnerDialog.close();
        }
    }, [winner]);

    console.log('-------- winner', winner)

    return null;
}