import { useEffect } from 'react';
import { f7, f7ready } from 'framework7-react';
import { connect } from 'react-redux';
import { selectIsLoading } from 'redux/reducers/loading/selector';
import { ILoadingState } from 'redux/reducers/loading/types';

interface Props {
    isLoading: boolean
}

/**
 * Component for indicate when App make loading
 */
function LoadingIndicator ({isLoading=false}: Props) {

    useEffect(() => {
        f7ready(() => {
            if (isLoading) {
                f7.preloader.show();
            } else {
                f7.preloader.hide();
            }
        })
        return () => {f7.preloader.hide();}
    })

    return null;
}

const mapState = (state: ILoadingState) => ({
    isLoading: selectIsLoading(state)
})

export default connect(mapState)(LoadingIndicator)