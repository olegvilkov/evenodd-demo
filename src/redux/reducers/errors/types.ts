import { APP_ERROR, APP_DELETE_ERRORS } from '../../actionTypes';

export type IAppErrors = Array<Error>;

export interface IAppErrorsState {
    errors: IAppErrors
}

export interface IAddError {
    type: typeof APP_ERROR
    error: Error
}

export interface IDeleteErrors {
    type: typeof APP_DELETE_ERRORS
    errors: IAppErrors
}

export type ActionTypes = IAddError | IDeleteErrors;