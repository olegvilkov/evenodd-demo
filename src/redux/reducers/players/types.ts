
export interface IPlayer {
    id?: string
    name: string
    order: number
    points: number
}

export type IPlayerList = Array<IPlayer>

export interface IChangePlayer {
    type: string
    payload: IPlayer
}

export type ActionTypes = IChangePlayer;