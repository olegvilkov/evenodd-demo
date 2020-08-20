export type IAppErrors = Array<string>;

export type ActionTypes = {
    type: string
    error?: string
}

export interface IAppErrorsState {
    errors: IAppErrors
}