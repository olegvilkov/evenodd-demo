
import { USER_AUTH, USER_UPDATE_PROFILE } from 'redux/actionTypes';
import { IUpdateUserProfile } from './types';
import { addAppError } from 'redux/reducers/errors/actions';
import { updateUserProfileSuccess } from 'redux/reducers/user/actions';
import { take, put, takeLatest, call } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import auth from 'utils/auth';

let firebaseUser: firebase.User;
let channel: EventChannel<unknown> | null;

/**
 * saga wich subscribe on aauthorization changes
 */
function* subscribeToAuth () {
  try {
    channel = eventChannel(emit => {
      // returns unsubscribe
      return auth.onAuthStateChanged( userAuth => {
        if (!userAuth) {
            auth.signInAnonymously()
        } else {
            firebaseUser = userAuth;
            emit( userAuth );
        }
       })
    });

    while (true) {
      const userAuth = yield take(channel);
      
      if (userAuth) {
        yield put( updateUserProfileSuccess(userAuth) );
      }
    }

  } catch (e) {
    yield put( addAppError(e.message) );
  }
}

/**
 * saga wich update user profile
 */
function* updateUserProfile({profile}: IUpdateUserProfile) {
    try {
        yield firebaseUser.updateProfile(profile);
    } catch (e) {
        yield put( addAppError(e.message) );
    }    
    yield put( updateUserProfileSuccess(firebaseUser) );
}

export const userSagas = [
    takeLatest(USER_AUTH, subscribeToAuth),
    takeLatest(USER_UPDATE_PROFILE, updateUserProfile),
];