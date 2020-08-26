import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { subscribeToAuth } from 'redux/sagas/user/actions';

const connector = connect(null, { subscribeToAuth });
type PropsFromRedux = ConnectedProps<typeof connector>;

function Auth ({subscribeToAuth}: PropsFromRedux) {
    useEffect(() => {
        subscribeToAuth();
    },[])
    
    return null;
}

export default connector(Auth)