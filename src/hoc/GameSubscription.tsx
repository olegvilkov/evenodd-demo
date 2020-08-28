import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { subscribeToGame, unSubscribeFromGame } from 'redux/sagas/currentgame/actions';

const connector = connect(null, { subscribeToGame, unSubscribeFromGame });

type PropsFromRedux = ConnectedProps<typeof connector>;

interface WithGameProps {
    gameId: string;
}

/**
 * Эффект прослушивания изменений в текущей игре
 */
export default function withGameSubscription <P extends object> ( Component: React.ComponentType<P> ) {
    function GameSubscription ({subscribeToGame, unSubscribeFromGame, ...props}: WithGameProps & PropsFromRedux) {
        const { gameId } = props;

        useEffect(() => {
            if (!gameId) {
                return;
            }
            subscribeToGame( gameId );
            return ()=>{ unSubscribeFromGame() }
        }, []);

        return (
            <Component {...props as P & WithGameProps} />
        )
    } 

    return connector(GameSubscription);
}