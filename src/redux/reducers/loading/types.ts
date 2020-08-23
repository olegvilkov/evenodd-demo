import { APP_LOADING_ON, APP_LOADING_OFF } from 'redux/actionTypes';

export interface ILoading {
    isLoading: boolean
}

export interface ILoadingAction {
    type: typeof APP_LOADING_OFF | typeof APP_LOADING_ON
    payload: boolean
}

export interface ILoadingState {
    loading: ILoading
}

export type ActionTypes = ILoadingAction;