import { CREATE_GAME } from 'redux/actionTypes';
import { ICreateGame } from './types';
// import { TemplateLibrary, Template } from '@accordproject/cicero-core';
import { takeLatest, put, select, takeEvery } from 'redux-saga/effects';

// import * as actions from '../actions/templatesActions';
// import * as selectors from '../selectors/templatesSelectors';

/**
 * worker saga
 * saga which checks if template is in the store
 * and loads the template if it is not
 */
export function* createGame(action: ICreateGame) {
//   const templateObjects = yield select(selectors.templateObjects);

//   if (!templateObjects || !templateObjects[action.uri]) {
//     try {
//       const templateObj = yield Template.fromUrl(action.uri);
//       yield put(actions.loadTemplateObjectSuccess(action.uri, templateObj));
//     } catch (err) {
//       yield put(actions.loadTemplateObjectError(err));
//     }
//   }
}

/**
 * watcher saga
 */
export const createGameSaga = [
  takeLatest(CREATE_GAME, createGame),
];