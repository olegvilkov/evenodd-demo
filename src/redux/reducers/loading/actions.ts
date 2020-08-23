import { APP_LOADING_ON, APP_LOADING_OFF } from 'redux/actionTypes';
import { ILoadingAction } from './types';

export const loadingOn = (): ILoadingAction => ({
  type: APP_LOADING_ON,
  payload: true,
})

export const loadingOff = (): ILoadingAction => ({
  type: APP_LOADING_OFF,
  payload: false,
})