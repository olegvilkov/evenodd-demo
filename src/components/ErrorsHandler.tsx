import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { deleteAppErrors } from 'redux/reducers/errors/actions';
import { selectErrors } from 'redux/reducers/errors/selector';
import { IAppErrorsState } from 'redux/reducers/errors/types';

import Toast from './Toast';
import { Toast as IToast } from 'framework7/components/toast/toast';

const mapState = (state: IAppErrorsState) => ({
    errors: selectErrors(state)
});
const connector = connect(mapState, { deleteAppErrors });
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Basic component for App errors handler
 */
function ErrorsHandler ({ errors=[], deleteAppErrors }: PropsFromRedux) {

    const props: IToast.Parameters = {
        text: errors.join('<br/>'),
        position: 'bottom',
        closeButton: true,
        closeButtonText: 'OK',
        closeButtonColor: 'red',
        closeTimeout: 5000,
        on: {
            closed: () => {
                deleteAppErrors( errors )
            }
        }
    };

    if (errors.length) {
        return (
            <Toast {...props} />
        )
    } else {
        return null;
    }
}

export default connector(ErrorsHandler);
